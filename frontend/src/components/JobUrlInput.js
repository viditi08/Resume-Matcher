import React from 'react';

function JobUrlInput({ value, onChange }) {
  const handleInputChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <div className="form-group">
      <label htmlFor="jobUrl">Job Description URL</label>
      <input
        type="url"
        id="jobUrl"
        value={value}
        onChange={handleInputChange}
        placeholder="https://example.com/job-posting"
      />
    </div>
  );
}

export default JobUrlInput;