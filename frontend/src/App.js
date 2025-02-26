import React, { useState } from 'react';
import './App.css';
import FileUpload from './components/FileUpload';
import JobUrlInput from './components/JobUrlInput';
import LoadingSpinner from './components/LoadingSpinner';
import ResultsDisplay from './components/ResultsDisplay';
// Import simplified version that doesn't depend on external libraries
import { processResumeAndJob } from './services/SimplifiedApi';

function App() {
  const [resumeFile, setResumeFile] = useState(null);
  const [jobUrl, setJobUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');
  
  const handleResumeChange = (file) => {
    setResumeFile(file);
    setError('');
  };
  
  const handleJobUrlChange = (url) => {
    setJobUrl(url);
    setError('');
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!resumeFile) {
      setError('Please upload a resume.');
      return;
    }
    
    if (!jobUrl) {
      setError('Please enter a job description URL.');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      // Use a timeout to simulate API call
      setTimeout(async () => {
        const data = await processResumeAndJob(resumeFile, jobUrl);
        setResults(data);
        setIsLoading(false);
      }, 2000);
    } catch (err) {
      setError(err.message || 'Failed to process your request. Please try again.');
      console.error(err);
      setIsLoading(false);
    }
  };

  return (
    <div className="app-container">
      <header>
        <h1>Job Resume Matcher</h1>
        <p>Upload your resume and enter a job posting URL to see how well you match</p>
      </header>
      
      <main>
        <section className="input-section">
          <form onSubmit={handleSubmit}>
            <FileUpload onFileChange={handleResumeChange} selectedFile={resumeFile} />
            <JobUrlInput value={jobUrl} onChange={handleJobUrlChange} />
            
            <button 
              type="submit" 
              className="submit-button" 
              disabled={isLoading}
            >
              {isLoading ? 'Processing...' : 'Analyze Match'}
            </button>
          </form>
          
          {error && <div className="error-message">{error}</div>}
        </section>
        
        {isLoading && <LoadingSpinner message="Analyzing your resume against the job description..." />}
        
        {results && !isLoading && (
          <ResultsDisplay results={results} />
        )}
      </main>
      
      <footer>
        <p>© {new Date().getFullYear()} Resume Matcher - Helping job seekers match their skills to job requirements</p>
      </footer>
    </div>
  );
}

export default App;