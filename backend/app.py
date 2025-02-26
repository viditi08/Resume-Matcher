from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from utils.text_extractor import extract_text_from_pdf, fetch_job_description
from utils.llm_service import clean_text, match_skills
from dotenv import load_dotenv

# Load environment variables first
load_dotenv()

# Check for API key
if not os.getenv("GEMINI_API_KEY"):
    print("WARNING: GEMINI_API_KEY not set in environment variables.")
    print("The application will use mock responses instead of the actual Gemini API.")

# Check for USER_AGENT
if not os.getenv("USER_AGENT"):
    print("WARNING: USER_AGENT environment variable not set, consider setting it to identify your requests.")
    os.environ["USER_AGENT"] = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Health check route
@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({"status": "ok", "message": "Server is running"})

# API Routes
@app.route('/api/extract-resume', methods=['POST'])
def api_extract_resume():
    if 'resume' not in request.files:
        return jsonify({"error": "No resume file provided"}), 400
    
    resume_file = request.files['resume']
    if resume_file.filename == '':
        return jsonify({"error": "No file selected"}), 400
    
    if not resume_file.filename.endswith('.pdf'):
        return jsonify({"error": "Only PDF files are supported"}), 400
    
    try:
        resume_text = extract_text_from_pdf(resume_file)
        if resume_text.startswith("ERROR:"):
            return jsonify({"error": resume_text[6:]}), 500
            
        cleaned_resume_text = clean_text(resume_text, "resume")
        return jsonify({"resumeText": cleaned_resume_text})
    except Exception as e:
        print(f"Error in extract-resume endpoint: {e}")
        return jsonify({"error": str(e)}), 500

@app.route('/api/fetch-job', methods=['POST'])
def api_fetch_job():
    data = request.get_json()
    if not data or 'url' not in data:
        return jsonify({"error": "No job URL provided"}), 400
    
    try:
        job_text = fetch_job_description(data['url'])
        if job_text.startswith("ERROR:"):
            return jsonify({"error": job_text[6:]}), 500
            
        cleaned_job_text = clean_text(job_text, "job_desc")
        return jsonify({"jobDescription": cleaned_job_text})
    except Exception as e:
        print(f"Error in fetch-job endpoint: {e}")
        return jsonify({"error": str(e)}), 500

@app.route('/api/analyze-match', methods=['POST'])
def api_analyze_match():
    data = request.get_json()
    if not data or 'resumeText' not in data or 'jobDescription' not in data:
        return jsonify({"error": "Resume text and job description are required"}), 400
    
    try:
        analysis = match_skills(data['resumeText'], data['jobDescription'])
        return jsonify(analysis)
    except Exception as e:
        print(f"Error in analyze-match endpoint: {e}")
        return jsonify({"error": str(e)}), 500

@app.route('/api/demo', methods=['GET'])
def api_demo():
    """Provide demo data for testing without API key"""
    return jsonify({
        "resumeText": "Experienced software developer with 5 years of Python and web development experience...",
        "jobDescription": "Looking for a Full Stack Developer with Python, React, and cloud experience...",
        "report": "## Match Summary\nOverall match score: 75%\n\n### Key Matching Skills:\n- Web Development (Strong match)\n- Python Programming (Strong match)\n- API Integration (Partial match)",
        "matchedSkills": 75,
        "missingSkills": 25,
        "requiredSkills": {
            "Technical Skills": 80,
            "Communication": 90,
            "Problem Solving": 70,
            "Leadership": 65,
            "Project Management": 85
        },
        "availableSkills": {
            "Technical Skills": 60,
            "Communication": 85,
            "Problem Solving": 75,
            "Leadership": 50,
            "Project Management": 70
        }
    })

if __name__ == "__main__":
    app.run(debug=True, port=5000)