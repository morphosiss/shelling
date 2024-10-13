```jsx
import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';

const MarkdownEditor = () => {
  const [markdownText, setMarkdownText] = useState('');

  const handleChange = (event) => {
    setMarkdownText(event.target.value);
  };

  return (
    <div>
      <textarea
        rows="10"
        cols="50"
        value={markdownText}
        onChange={handleChange}
        placeholder="Digite seu texto em Markdown aqui"
      />
      <h2>Resultado:</h2>
      <ReactMarkdown>{markdownText}</ReactMarkdown>
    </div>
  );
};

export default MarkdownEditor;
```
