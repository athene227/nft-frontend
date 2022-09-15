import { BsPencil, BsTrash } from 'react-icons/bs';
import { getImage } from 'src/services/ipfs';

interface IProps {
  imageUrl: string;
  userImage: string | undefined;
}

export default function PreviewNftImage(props: IProps) {
  const { imageUrl, userImage } = props;

  const handleRemove = () => {
    console.log('Remove Triggered');
  };

  const removeImageUrl = () => {''};

  return (
    <div className="upload-image-preview">
      <span>
        <img src={getImage(imageUrl)} id="get_file_2" className="lazy" alt="" />
      </span>
      <ul>
        <li>
          <a onClick={handleRemove}>
            <BsPencil />
          </a>
        </li>
        <li>
          <a onClick={removeImageUrl}>
            <BsTrash />
          </a>
        </li>
      </ul>
    </div>
  );
}
