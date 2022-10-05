const defaultImage = '';

const ImageUpload = (props) => {
  const { image, setImage } = props;
  const [imagePreviewUrl, setImagePreviewUrl] = useState(defaultImage);
  const fileInput = React.createRef();
  const handleImageChange = (e) => {
    e.preventDefault();
    const reader = new FileReader();
    const imageFile = e.target.files[0];
    reader.onloadend = () => {
      const image = reader.result;
      setImage(image);
      setImagePreviewUrl(image);
    };
    reader.readAsDataURL(imageFile);
  };
  const handleClick = () => {
    fileInput.current.click();
  };
  const handleRemove = () => {
    setImage('');
    setImagePreviewUrl('');
    fileInput.current.value = null;
  };
  return (
    <div>
      <input type="file" onChange={handleImageChange} ref={fileInput} />
      <div>{imagePreviewUrl && <img src={imagePreviewUrl} />}</div>
      <div>
        {image === null ? (
          <button onClick={() => handleClick()}> {'Select image'} </button>
        ) : (
          <span>
            <button onClick={() => handleClick()}> Change </button>
            <button onClick={() => handleRemove()}> Remove </button>
          </span>
        )}
      </div>
    </div>
  );
};

const Main = () => {
  const [file, setFile] = useState('');

  const setImage = (image) => {
    setFile(image);
  };

  return (
    <div>
      <ImageUpload setImage={setImage} image={file} />
    </div>
  );
};

ReactDOM.render(<Main />, mountNode);
