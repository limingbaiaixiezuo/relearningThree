import React, { useEffect, useRef, useState } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

const RichTextEditor_Quill: React.FC = () => {
  const editorRef = useRef<HTMLDivElement>(null);
  const quillRef = useRef<Quill | null>(null);
  const [content, setContent] = useState('');

  useEffect(() => {
    if (editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: 'snow',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ color: [] }, { background: [] }],
            ['link', 'image', 'video'],
            ['clean'],
          ],
        },
        placeholder: '请输入内容...',
      });

      const quill = quillRef.current;
      quill.on('text-change', () => {
        const html = quill.root.innerHTML;
        setContent(html);
      });
    }

    return () => {
      if (quillRef.current) {
        quillRef.current.disable();
        quillRef.current = null;
      }
    };
  }, []);

  const handleSave = () => {
    console.log('保存的内容:', content);
    // 在这里可以将内容发送到服务器或执行其他保存操作
  };

  return (
    <div>
      <div ref={editorRef}></div>
      <button onClick={handleSave}>保存</button>
    </div>
  );
};

export default RichTextEditor_Quill;