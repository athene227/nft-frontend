import { useRef } from 'react';
import { BsPencil, BsTrash } from 'react-icons/bs';

interface IProps {
  onChangeProfileImage: (e: any) => void;
  image: string;
  profileImage: boolean;
  setProfileImage: (e: any) => void;
}

export default function UploadNFTImage(props: IProps) {
  const { onChangeProfileImage, profileImage, setProfileImage, image } = props;

  const removeImageUrl = () => {
    setProfileImage(!profileImage);
  };
  const nftProfileImage = (e: any) => {
    onChangeProfileImage(e);
  };

  const getImageUrl = () => {
    return image || './img/collections/coll-item-3.png';
  };

  const inputFile = useRef<HTMLInputElement>(null);
  const onButtonClick = () => {
    // `current` points to the mounted file input element
    inputFile.current?.click();
  };

  return (
    <div>
      <div className="nft__form_field">
        <h5 className="form-label">
          Upload File <span className="span-red">*</span>
        </h5>
        {profileImage === true && (
          <div className="upload-image-preview">
            <span>
              <img
                src={getImageUrl()}
                id="get_file_2"
                className="lazy"
                alt=""
              />
            </span>
            <ul>
              <li>
                <a type="button" id="get_file" onClick={onButtonClick}>
                  <BsPencil />
                  <input
                    id="upload_file"
                    type="file"
                    ref={inputFile}
                    multiple
                    onChange={nftProfileImage}
                  />
                </a>
              </li>
              <li>
                <a onClick={removeImageUrl}>
                  <BsTrash />
                </a>
              </li>
            </ul>
          </div>
        )}

        {profileImage === false && (
          <div className={`d-create-file upload__file`}>
            <div
              className="col-lg-6 col-sm-8 col-xs-12"
              style={{
                margin: 'auto',
                marginBottom: '5%'
              }}
            ></div>
            <div className="browse">
              <input
                type="button"
                id="get_file"
                className={`btn-main btn_gradient`}
                value={'Choose File / Drag File'}
              />
              <input
                id="upload_file"
                type="file"
                multiple
                onChange={nftProfileImage}
              />
              <p>PNG, GIF, WEBP, MP4 or MP3. Max 100mb.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
