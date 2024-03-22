import { useState } from 'react';
/* ImageUpload2.jsx 사용 중  */
/* 이 코드는 현재 사용 X */
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
