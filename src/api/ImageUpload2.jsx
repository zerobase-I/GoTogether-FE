import axios from 'axios';
import { useState } from 'react';

export const ImageUpload2 = ({ onFileChange }) => {
  const [files, setFiles] = useState(null);
  const [progress, setProgress] = useState({ started: false, pc: 0 });
  const [msg, setMsg] = useState(null);

  const handleInputChange = (e) => {
    console.log(e.target.files);
    setFiles(e.target.files);

    onFileChange(e.target.files);
  };

  const handleUpload = () => {
    if (!files) {
      console.log('No file selected');
      return;
    }

    const fd = new FormData();
    for (let i = 0; i < files.length; i++) {
      fd.append(`file${i + 1}`, files[i]);
    }

    setMsg('Uploading...');
    setProgress((prevState) => {
      return { ...prevState, started: true };
    });

    axios
      .post('/api/post', fd, {
        onUploadProgress: (ProgressEvent) => {
          setProgress((prevState) => {
            return { ...prevState, pc: ProgressEvent.progress * 100 };
          });
        },
        headers: {
          'Custom-Header': 'value',
        },
      })
      .then((res) => {
        setMsg('Upload successful');
        console.log(res.data);
        console.log(files);
      })
      .catch((err) => {
        setMsg('Upload failed');
        console.log(files);

        console.error(err);
      });
  };
  return (
    <>
      <input
        type="file"
        accept="image/*"
        onChange={handleInputChange}
        multiple
      />
      <button onClick={handleUpload}>Upload</button>
      {progress.started && <progress max="100" value={progress.pc}></progress>}
      {msg && <span>{msg}</span>}
    </>
  );
};
