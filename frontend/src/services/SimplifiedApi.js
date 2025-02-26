// Simple API service using browser's fetch instead of axios

// Base URL for API calls
const BASE_URL = '/api';

// Function to upload resume and get extracted text
export const uploadResume = async (file) => {
  const formData = new FormData();
  formData.append('resume', file);
  
  try {
    const response = await fetch(`${BASE_URL}/extract-resume`, {
      method: 'POST',
      body: formData,
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error uploading resume:', error);
    throw error;
  }
};

// Function to fetch and process job description
export const fetchJobDescription = async (url) => {
  try {
    const response = await fetch(`${BASE_URL}/fetch-job`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url }),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching job description:', error);
    throw error;
  }
};

// Function to get skills match analysis
export const analyzeMatch = async (resumeText, jobDescription) => {
  try {
    const response = await fetch(`${BASE_URL}/analyze-match`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        resumeText,
        jobDescription,
      }),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error analyzing match:', error);
    throw error;
  }
};

// Single function to handle the entire process
export const processResumeAndJob = async (resumeFile, jobUrl) => {
  try {
    // For demo purposes, return mock data to avoid API dependency
    return getMockData();
    
    // Uncomment the below code when your backend is ready
    /*
    // Upload and extract resume
    const resumeData = await uploadResume(resumeFile);
    
    // Fetch and extract job description
    const jobData = await fetchJobDescription(jobUrl);
    
    // Analyze the match
    const analysisData = await analyzeMatch(
      resumeData.resumeText,
      jobData.jobDescription
    );
    
    return {
      resumeText: resumeData.resumeText,
      jobDescription: jobData.jobDescription,
      matchReport: analysisData.report,
      matchedSkills: analysisData.matchedSkills,
      missingSkills: analysisData.missingSkills,
      requiredSkills: analysisData.requiredSkills,
      availableSkills: analysisData.availableSkills,
    };
    */
  } catch (error) {
    console.error('Error in process:', error);
    throw error;
  }
};

// Mock data for testing
function getMockData() {
  return {
    resumeText: "John Doe\nSoftware Developer\n\nSKILLS\n- JavaScript, React, Node.js\n- Python, Data Analysis\n- API Development\n- MongoDB, SQL\n\nEXPERIENCE\nSenior Developer, ABC Tech (2020-Present)\n- Developed web applications using React\n- Created RESTful APIs with Node.js\n\nJunior Developer, XYZ Solutions (2018-2020)\n- Maintained legacy code\n- Implemented new features",
    
    jobDescription: "Software Developer\n\nWe are looking for an experienced Software Developer to join our team.\n\nRequirements:\n- 3+ years experience with JavaScript and React\n- Strong knowledge of Node.js\n- Experience with AWS\n- Docker and Kubernetes knowledge\n- Experience with CI/CD pipelines\n- Strong problem-solving skills\n\nResponsibilities:\n- Develop new features for our web application\n- Maintain and improve existing code\n- Collaborate with team members",
    
    matchReport: "## Match Summary\nOverall match score: 75%\n\n### Key Matching Skills:\n- JavaScript (Strong match)\n- React (Strong match)\n- Node.js (Strong match)\n- Problem-solving (Partial match)\n\n### Missing Skills:\n- AWS experience (Not found)\n- Docker & Kubernetes (Not found)\n- CI/CD pipeline experience (Not found)\n\n### Recommendations:\n1. Highlight your JavaScript and React experience more prominently\n2. Add any cloud platform knowledge you might have\n3. Consider gaining Docker experience\n4. Mention any CI/CD tools you've worked with",
    
    matchedSkills: 75,
    missingSkills: 25,
    
    requiredSkills: {
      "JavaScript": 90,
      "React": 85,
      "Node.js": 80,
      "AWS": 70,
      "Docker": 65,
      "CI/CD": 60
    },
    
    availableSkills: {
      "JavaScript": 85,
      "React": 80,
      "Node.js": 75,
      "AWS": 20,
      "Docker": 15,
      "CI/CD": 10
    }
  };
}