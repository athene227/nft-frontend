// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

import "./@rarible/royalties/contracts/impl/RoyaltiesV2Impl.sol";
import "./@rarible/royalties/contracts/LibRoyaltiesV2.sol";
import "./@rarible/royalties/contracts/LibPart.sol";

contract Teekey is ERC721Enumerable, Ownable, RoyaltiesV2Impl {

    using SafeMath for uint256;

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdTraker;

    // bytes4 private constant _INTERFACE_ID_ERC2981 = 0x2a55205a;

    string public _baseTokenURI;
    // uint256 public _price = 0.001 ether; // price will be updated before deployment
    // uint256 public _maxSupply = 9999; // max supply could be updated before deployment
    // bool public _saleIsActive = false; // to activate after deployment by owner

    // mapping(address => bool) approvedProjects; // list of approved projects. Project can be set after deployment through the relative methods
    // mapping(string => uint256) teekeysMinted; // store a unique string for each minted teekey generated based on the parent NFT address and token ID

    // team addresses
    // address a1 = 0xcDd4Dd3b9F52aac3144D22cb214c4f9A7FA3dD4a;
    // address a2 = 0x1eb8b60947B90B6aEf96C7B829F91Be05b8495f9;

    event CreateTeekey(uint256 indexed id, address parentAddress, uint256  parentTokenID, address owner); // event useful to sync moralis database for every new mint
    constructor(string memory baseTokenURI) ERC721("Teekey", "TEE") {

        _baseTokenURI = baseTokenURI;

    }

    // public mint function
    // it accept the parent NFT contract address and token ID
    function mint(address parentNFTAddress, uint256 tokenId) public payable {

        uint256 newTokenID = _tokenIdTraker.current();
        
        require(newTokenID <= _maxSupply, "All available Teekeys have been minted"); // check it is over the max supply
        require(approvedProjects[parentNFTAddress] == true, "The parent NFT collection is not included in the approved list of projects"); // check if the parent nft project is included in the approved projects
 
        string memory teekeyCode = string(abi.encodePacked(parentNFTAddress, "_", tokenId)); // generate a unique string based on the parent NFT
        require(teekeysMinted[teekeyCode] == 0, "The selected NFT was already used to mint a Teekey"); // check if teekey was already minted
        
        // check ownership of parent NFT
        // we need to recognise if the parent contract is 721 or 1155
        bool isParentContract721 = ERC165(parentNFTAddress).supportsInterface(
            0x80ac58cd
        );
        bool isParentContract1155 = ERC165(parentNFTAddress).supportsInterface(
            0xd9b67a26
        );

        bool isParentNFTOwner = false;

        if (isParentContract721) {
            isParentNFTOwner =
                ERC721(parentNFTAddress).ownerOf(tokenId) == msg.sender;
        } else if (isParentContract1155) {
            isParentNFTOwner =
                ERC1155(parentNFTAddress).balanceOf(msg.sender, tokenId) > 0;
        }

        require(isParentNFTOwner, "The user doesn't own the parent NFT");

        require(msg.value >= _price, "insufficient_payment_value"); // run just if the amount is sufficient to purchase
        
        // if all previous tests pass, mint a new token
        _safeMint(msg.sender, newTokenID);

        // store new minted Teekey code
        teekeysMinted[teekeyCode] = newTokenID;

        // emit the mint event
        emit CreateTeekey(newTokenID, parentNFTAddress, tokenId, msg.sender);

        // increment token id tracker
        _tokenIdTraker.increment();
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return _baseTokenURI;
    }

    // allow to change the base URI. Useful in case of server / hosting issues
    function setBaseURI(string memory baseURI) public onlyOwner {
        _baseTokenURI = baseURI;
    }

    // // owner can set the price of the teekey
    // function setPrice(uint256 price) public onlyOwner {
    //     _price = price;
    // }

    // // owner can start and stop sale at any time
    // function saleStart() public onlyOwner {
    //     _saleIsActive = true;
    // }

    // function saleStop() public onlyOwner {
    //     _saleIsActive = false;
    // }

    // standard function that returns the token ids from any holder address
    function tokensOfOwner(address owner)
        public
        view
        returns (uint256[] memory)
    {
        uint256 tokenCount = balanceOf(owner);
        uint256[] memory tokenIds = new uint256[](tokenCount);
        for (uint256 i = 0; i < tokenCount; i++) {
            tokenIds[i] = tokenOfOwnerByIndex(owner, i);
        }
        return tokenIds;
    }

    // returns the token id based on the parent NFT address and token ID
    // function tokenIdByParentNFT(address parentNFTAddress, uint256 parentTokenId) public view returns (uint256){
    //     string memory teekeyCode = string(abi.encodePacked(parentNFTAddress, "_", parentTokenId));
    //     return teekeysMinted[teekeyCode];
    // }

     // owner can add or remove approved projects
    // function approveProject(address projectAddress) public onlyOwner {
    //     approvedProjects[projectAddress] = true;
    // }

    // function disapproveProject(address projectAddress) public onlyOwner {
    //     delete approvedProjects[projectAddress];
    // }

     // owner can update the team wallets anytime. (in case they get hacked)
    // function setTeamWallets(address b1, address b2 ) public onlyOwner{
    //     a1 = b1;
    //     a2 = b2;
    // }

    // // withdraw all funds to the team wallets
    // function withdrawAll() public payable onlyOwner {
    //     uint256 _each = address(this).balance / 2;
    //     require(payable(a1).send(_each));
    //     require(payable(a2).send(_each));
    // }

    // // withdraw a specific amount (useful to fund other collections)
    // function withdraw(uint256 amount) public payable onlyOwner {

    //     require(amount <= address(this).balance, "The amount specified is over the contract remaining balance");
    //     uint256 _each = amount / 2;
    //     require(payable(a1).send(_each));
    //     require(payable(a2).send(_each));

    // }

    // opensea and mintable royalty functions
    function setRoyalties(uint _tokenId, address payable _royaltiesRecipientAddress, uint96 _percentageBasisPoint) public onlyOwner{
        LibPart.Part[] memory _royalties = new LibPart.Part[](1);
        _royalties[0].value = _percentageBasisPoint;
        _royalties[0].account = _royaltiesRecipientAddress;
        _saveRoyalties(_tokenId, _royalties);
    }

     function royaltyInfo(uint256 _tokenId, uint256 _salePrice) external view returns (address receiver,uint256 royaltyAmount){
         
         LibPart.Part[] memory _royalties = royalties[_tokenId];
        
         if(_royalties.length > 0){
             return (_royalties[0].account, (_salePrice*_royalties[0].value)/10000 );
         }

         return (address(0), 0);
     }

    // function supportsInterface(bytes4 interfaceId) public view virtual override(ERC721Enumerable) returns (bool){
    //     if(interfaceId == LibRoyaltiesV2._INTERFACE_ID_ROYALTIES){
    //         return true;
    //     }

    //     if(interfaceId ==  _INTERFACE_ID_ERC2981){
    //         return true;
    //     }
    //     return super.supportsInterface(interfaceId);
    // }

}
