import React from 'react';

// A simplified version of SkillsChart that doesn't use chart.js
function SimplifiedSkillsChart({ matchedSkills, missingSkills, requiredSkills, availableSkills }) {
  
  // Helper function to render a progress bar
  const renderProgressBar = (value, color) => {
    return (
      <div style={{ width: '100%', backgroundColor: '#e0e0e0', borderRadius: '4px', height: '20px' }}>
        <div 
          style={{ 
            width: `${value}%`, 
            backgroundColor: color, 
            height: '100%', 
            borderRadius: '4px',
            transition: 'width 1s ease-in-out',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '12px',
            fontWeight: 'bold'
          }}
        >
          {value}%
        </div>
      </div>
    );
  };

  // Helper function to render a skill comparison
  const renderSkillComparison = (skillName, requiredValue, availableValue) => {
    return (
      <div key={skillName} style={{ marginBottom: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ fontWeight: 'bold' }}>{skillName}</span>
          <span>{availableValue}% / {requiredValue}%</span>
        </div>
        <div style={{ display: 'flex', height: '20px', marginTop: '4px' }}>
          <div style={{ flex: 1, position: 'relative' }}>
            {/* Required skill bar */}
            <div style={{ 
              position: 'absolute', 
              width: `${requiredValue}%`, 
              backgroundColor: 'rgba(255, 99, 132, 0.3)', 
              borderRight: '2px solid rgba(255, 99, 132, 1)', 
              height: '100%' 
            }}></div>
            {/* Available skill bar */}
            {renderProgressBar(availableValue, 'rgba(54, 162, 235, 0.7)')}
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="chart-container" style={{ padding: '20px', backgroundColor: '#f8f9fa', marginBottom: '20px', borderRadius: '8px' }}>
        <h4>Match Score Breakdown</h4>
        <div style={{ display: 'flex', marginTop: '16px' }}>
          <div style={{ width: '50%', padding: '0 10px' }}>
            <div style={{ marginBottom: '8px', textAlign: 'center' }}>Matched Skills</div>
            {renderProgressBar(matchedSkills, 'rgba(75, 192, 192, 0.7)')}
          </div>
          <div style={{ width: '50%', padding: '0 10px' }}>
            <div style={{ marginBottom: '8px', textAlign: 'center' }}>Missing Skills</div>
            {renderProgressBar(missingSkills, 'rgba(255, 99, 132, 0.7)')}
          </div>
        </div>
      </div>
      
      <div className="chart-container" style={{ padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
        <h4>Required vs. Available Skills</h4>
        <div style={{ marginTop: '16px' }}>
          <div style={{ display: 'flex', marginBottom: '10px' }}>
            <div style={{ 
              width: '14px', 
              height: '14px', 
              backgroundColor: 'rgba(255, 99, 132, 0.3)', 
              marginRight: '8px',
              border: '1px solid rgba(255, 99, 132, 1)'
            }}></div>
            <span>Required Skills</span>
            <div style={{ 
              width: '14px', 
              height: '14px', 
              backgroundColor: 'rgba(54, 162, 235, 0.7)', 
              marginLeft: '16px',
              marginRight: '8px'
            }}></div>
            <span>Your Skills</span>
          </div>
          
          {Object.keys(requiredSkills).map(skill => renderSkillComparison(
            skill, 
            requiredSkills[skill], 
            availableSkills[skill] || 0
          ))}
        </div>
      </div>
    </>
  );
}

export default SimplifiedSkillsChart;