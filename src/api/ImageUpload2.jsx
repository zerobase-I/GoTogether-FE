import axios from 'axios';
import { useEffect, useState } from 'react';

export const ImageUpload2 = ({ onFileChange, value }) => {
  const [files, setFiles] = useState();

  useEffect(() => {
    setFiles(value);
  }, []);

  const handleInputChange = (e) => {
    console.log(e.target.files);
    setFiles(e.target.files);

    onFileChange(e.target.files);
  };

  return (
    <>
      {/* input file의 기본값 설정은 불가능하다 */}
      <input
        className="file-input file-input-bordered file-input-info w-full  "
        type="file"
        accept="image/*"
        onChange={handleInputChange}
      />
    </>
  );
};
