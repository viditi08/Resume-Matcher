# Resume Job Matcher


Resume Job Matcher is an AI-powered tool that analyzes your resume against job descriptions to provide comprehensive matching reports, visualizations, and improvement recommendations.

## ✨ Features

- **PDF Resume Parsing**: Upload your resume in PDF format for automatic text extraction
- **Job Description Analysis**: Fetch and analyze job descriptions directly from URLs
- **AI-Powered Matching**: Uses Google's Gemini AI to intelligently match your skills and experience to job requirements
- **Visual Reports**: See skill match percentages and comparisons through interactive charts
- **Improvement Recommendations**: Get specific suggestions to increase your match rate

## 🚀 Technologies Used

### Frontend
- React.js
- Interactive visualizations for skill matching
- CSS3 with responsive design
- Fetch API for communication with backend

### Backend
- Python with Flask
- PyPDF2 for PDF parsing
- LangChain with Google Gemini for AI analysis
- Web scraping capabilities for job descriptions

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (14.x or higher)
- npm (6.x or higher)
- Python (3.9 or higher)
- pip

## 🛠️ Installation and Setup

### Clone the Repository

```bash
git clone https://github.com/yourusername/resume-job-matcher.git
cd resume-job-matcher
```

### Backend Setup

1. Create a virtual environment and activate it:
   ```bash
   python -m venv venv
   
   # Windows
   venv\Scripts\activate
   
   # macOS/Linux
   source venv/bin/activate
   ```

2. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Set up environment variables:
   ```bash
   # Create a .env file in the project root
   # Add the following:
   GEMINI_API_KEY=your_gemini_api_key_here
   USER_AGENT=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36
   ```
   
   You can get a Gemini API key at [Google AI Studio](https://makersuite.google.com/).

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install Node.js dependencies:
   ```bash
   npm install
   ```

## 🚗 Running the Application

1. Start the backend server (from the project root):
   ```bash
   # Make sure your virtual environment is activated
   cd backend
   python app.py
   ```
   The backend will start at http://localhost:5000.

2. In a new terminal, start the frontend development server:
   ```bash
   cd frontend
   npm start
   ```
   The frontend will launch at http://localhost:3000.

## 📝 How to Use

1. Upload your resume (PDF format only)
2. Enter the URL of a job posting you're interested in
3. Click "Analyze Match"
4. Review your results:
   - Match percentage
   - Skills comparison
   - Missing skills
   - Suggestions for improvement
  
## Output
![Screenshot 2025-02-26 154129](https://github.com/user-attachments/assets/2d4509cf-6be8-4507-b466-455f993f84c8)
![Screenshot 2025-02-26 154143](https://github.com/user-attachments/assets/f5a38f71-cb51-4dbe-8066-7362e51e8e16)
![Screenshot 2025-02-26 154423](https://github.com/user-attachments/assets/3b7ba450-2b27-4168-ac8e-eb9a2f5b219d)
![Screenshot 2025-02-26 154445](https://github.com/user-attachments/assets/e8f8dd61-8754-45b1-aa03-4eac99732a77)
![Screenshot 2025-02-26 154504](https://github.com/user-attachments/assets/6c7e1451-d540-43c5-93e0-bf01d6bbe0d6)






## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/extract-resume` | POST | Extract text from a PDF resume |
| `/api/fetch-job` | POST | Fetch and extract a job description from a URL |
| `/api/analyze-match` | POST | Match resume text against job description |
| `/api/health` | GET | Health check endpoint |

## 📚 Future Enhancements

- Support for more document formats (DOCX, TXT)
- Custom job description input option
- User accounts to save analysis history
- Keyword optimization suggestions
- Cover letter generation based on match results

## Troubleshooting

### No Gemini API Key

If you don't have a Google Gemini API key, the application will use mock data for demonstration purposes.

### PDF Parsing Issues

If you encounter issues with PDF parsing, make sure you have PyPDF2 installed:
```bash
pip install PyPDF2
```

### Frontend Dependency Issues

If you face issues with frontend dependencies, try:
```bash
cd frontend
npm install --force
```

## 📃 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

*Made with ❤️ by Viditi Vartak*
