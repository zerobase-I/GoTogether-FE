import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const EditorQuill = ({ onTextChange }) => {
  const [quillValue, setQuillValue] = useState('');

  const handleQuillChange = (content, delta, source, editor) => {
    setQuillValue(editor.getContents());
    onTextChange(editor.getContents().ops[0].insert);
  };

  return (
    <>
      <ReactQuill
        style={{ height: '300px' }}
        theme="snow"
        modules={modules}
        formats={formats}
        value={quillValue || ''}
        onChange={handleQuillChange}
      />
    </>
  );
};

export default EditorQuill;

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],
    ['link', 'image'],
    [{ align: [] }, { color: [] }, { background: [] }], // dropdown with defaults from theme
    ['clean'],
  ],
};

const formats = [
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'align',
  'color',
  'background',
];
