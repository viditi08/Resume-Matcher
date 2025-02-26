import React from 'react';

function MarkdownRenderer({ content }) {
  if (!content) return null;
  
  // Simple markdown parsing for common elements
  const renderMarkdown = () => {
    return content.split('\n').map((line, index) => {
      if (line.startsWith('## ')) {
        return <h2 key={index}>{line.substring(3)}</h2>;
      } else if (line.startsWith('### ')) {
        return <h3 key={index}>{line.substring(4)}</h3>;
      } else if (line.startsWith('- ')) {
        return <li key={index}>{line.substring(2)}</li>;
      } else if (line.match(/^\d+\. /)) {
        return <li key={index}>{line.substring(line.indexOf(' ') + 1)}</li>;
      } else if (line === '') {
        return <br key={index} />;
      } else {
        return <p key={index}>{line}</p>;
      }
    });
  };

  return (
    <div className="markdown-content">
      {renderMarkdown()}
    </div>
  );
}

export default MarkdownRenderer;