import React from 'react';
import SimplifiedSkillsChart from './SimplifiedSkillsChart';
import MarkdownRenderer from './MarkdownRenderer';

function ResultsDisplay({ results }) {
  const {
    resumeText,
    jobDescription,
    matchReport,
    matchedSkills,
    missingSkills,
    requiredSkills,
    availableSkills
  } = results;

  return (
    <section className="results-section">
      <h2>Analysis Results</h2>
      
      <div className="success-message">
        Resume and job description analyzed successfully!
      </div>
      
      <div className="text-content">
        <div className="extracted-text">
          <h3>Extracted Resume Text</h3>
          <div className="text-box">{resumeText}</div>
        </div>
        
        <div className="extracted-text">
          <h3>Job Description</h3>
          <div className="text-box">{jobDescription}</div>
        </div>
      </div>
      
      <div className="report-section">
        <h3>Comprehensive Report</h3>
        <MarkdownRenderer content={matchReport} />
      </div>
      
      <div className="charts-section">
        <h3>Skills Visualization</h3>
        <SimplifiedSkillsChart
          matchedSkills={matchedSkills}
          missingSkills={missingSkills}
          requiredSkills={requiredSkills}
          availableSkills={availableSkills}
        />
      </div>
    </section>
  );
}

export default ResultsDisplay;