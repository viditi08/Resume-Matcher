import axios from 'axios';

// Create Axios instance with defaults
const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Function to upload resume and get extracted text
export const uploadResume = async (file) => {
  const formData = new FormData();
  formData.append('resume', file);
  
  try {
    const response = await api.post('/extract-resume', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error uploading resume:', error);
    throw error;
  }
};

// Function to fetch and process job description
export const fetchJobDescription = async (url) => {
  try {
    const response = await api.post('/fetch-job', { url });
    return response.data;
  } catch (error) {
    console.error('Error fetching job description:', error);
    throw error;
  }
};

// Function to get skills match analysis
export const analyzeMatch = async (resumeText, jobDescription) => {
  try {
    const response = await api.post('/analyze-match', {
      resumeText,
      jobDescription,
    });
    return response.data;
  } catch (error) {
    console.error('Error analyzing match:', error);
    throw error;
  }
};

// Single function to handle the entire process
export const processResumeAndJob = async (resumeFile, jobUrl) => {
  try {
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
  } catch (error) {
    console.error('Error in process:', error);
    throw error;
  }
};
export default api;
// Function to handle file upload and job URL submission