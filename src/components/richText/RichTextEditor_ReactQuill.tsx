import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface RichTextEditorProps {}

const RichTextEditor: React.FC<RichTextEditorProps> = () => {
  const [value, setValue] = React.useState('');

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'image'],
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
    'link',
    'image',
  ];

  // const handleChange = (content: string, delta: any, source: string, editor: ReactQuill.UnprivilegedEditor) => {
    const handleChange = (content: string) => {
    setValue(content);

    console.log('Content:', content);
    console.log('value:', value);
    
  };

  const handleSave = () => {
    console.log('Saving content:', value);
    // 在这里可以将内容发送到服务器或执行其他操作
  };

  return (
    <div>
      <ReactQuill
        value={value}
        onChange={handleChange}
        modules={modules}
        formats={formats}
        placeholder="Write something..."
      />
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default RichTextEditor;