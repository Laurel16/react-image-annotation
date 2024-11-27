import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { prism } from 'react-syntax-highlighter/dist/esm/styles/prism';

const CodeHighlighter = ({ children }) => {
  if (!children || typeof children !== 'string') {
    console.error('Invalid content passed to SyntaxHighlighter');
    return null;
  }

  return (
    <SyntaxHighlighter language="jsx" style={prism}>
      {children}
    </SyntaxHighlighter>
  );
};

export default CodeHighlighter;

