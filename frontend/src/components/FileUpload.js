import React from 'react';

function FileUpload({ onFileChange, selectedFile }) {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      onFileChange(file);
    } else if (file) {
      alert('Only PDF files are supported.');
    }
  };

  return (
    <div className="form-group">
      <label htmlFor="resume">Upload Your Resume</label>
      <input
        type="file"
        id="resume"
        accept=".pdf"
        onChange={handleFileChange}
      />
      {selectedFile && <p className="file-name">{selectedFile.name}</p>}
    </div>
  );
}

export default FileUpload;