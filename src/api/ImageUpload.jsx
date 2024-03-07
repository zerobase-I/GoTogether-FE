import { useState } from 'react';

export const ImageUpload = () => {
  const [uploadImgUrl, setUploadImgUrl] = useState('');

  const onchangeImageUpload = (e) => {
    const { files } = e.target;
    const uploadFile = files[0];
    const reader = new FileReader();
    reader.readAsDataURL(uploadFile);
    reader.onloadend = () => {
      setUploadImgUrl(reader.result);
    };
  };
  return (
    <>
      <img src={uploadImgUrl} img="img" width={300} />
      <input type="file" accept="image/*" onChange={onchangeImageUpload} />
    </>
  );
};
