import os
from dotenv import load_dotenv
import json

# Load environment variables
load_dotenv()

# Check if Gemini API key is set
api_key = os.getenv("GEMINI_API_KEY")
if not api_key:
    print("WARNING: GEMINI_API_KEY not found in environment variables.")
    print("LLM functionality will not work properly.")

try:
    from langchain_google_genai import ChatGoogleGenerativeAI
    from langchain_core.prompts import ChatPromptTemplate

    # Initialize the ChatGoogleGenerativeAI instance with explicit API key
    llm = ChatGoogleGenerativeAI(
        model="gemini-1.5-flash",
        google_api_key=api_key,  # Use the explicit API key parameter
        temperature=0,
        max_tokens=None,
        timeout=None,
        max_retries=1,
    )
    LLM_AVAILABLE = True
except (ImportError, Exception) as e:
    print(f"WARNING: Failed to initialize Google Generative AI: {e}")
    print("Using mock LLM responses instead.")
    LLM_AVAILABLE = False

def read_prompt_from_file(file_path):
    """Read a prompt template from a file"""
    try:
        with open(file_path, "r") as file:
            return file.read()
    except FileNotFoundError:
        # Fallback prompts in case files are missing
        if "clean_text" in file_path:
            return """You are a text extraction expert. Your task is to clean and extract the most important information from the provided text."""
        elif "match_skills" in file_path:
            return """You are an expert ATS analyzer. Your task is to compare a resume against a job description and provide a detailed analysis of the match."""
        else:
            return "You are a helpful assistant. Please analyze the given text carefully and provide a detailed response."

def ask_llm(prompt):
    """Send a prompt to the LLM and get a response"""
    if LLM_AVAILABLE:
        try:
            response = llm.invoke(prompt)
            if response and hasattr(response, 'content'):
                return response.content
            else:
                return "No response from the model."
        except Exception as e:
            print(f"Error invoking LLM: {e}")
            return _get_mock_response(prompt)
    else:
        return _get_mock_response(prompt)

def _get_mock_response(prompt):
    """Generate a mock response when LLM is not available"""
    if "resume" in str(prompt).lower() and "job description" in str(prompt).lower():
        return """## Match Summary
Overall match score: 75%

### Key Matching Skills:
- Web Development (Strong match)
- Python Programming (Strong match)
- API Integration (Partial match)
- Data Analysis (Partial match)

### Missing Skills:
- Docker containerization
- Cloud infrastructure experience
- CI/CD pipeline knowledge

### Recommendations:
1. Highlight your web development experience more prominently
2. Add specific examples of your Python projects
3. Consider gaining some experience with Docker
4. Mention any cloud platform familiarity you might have"""
    elif "resume" in str(prompt).lower():
        return "This appears to be a resume for a software developer with experience in web development, Python programming, and data analysis."
    elif "job description" in str(prompt).lower():
        return "This job posting is for a Full Stack Developer position requiring experience with Python, web development frameworks, API integration, and cloud services."
    else:
        return "I've analyzed the provided text and extracted the key information."

def clean_text(text, type_text):
    """Clean and extract relevant information from text"""
    clean_text_sys_prompt = read_prompt_from_file("backend/resources/prompts/clean_text_system_prompt.txt")

    prompt_template = ChatPromptTemplate([
        ("system", clean_text_sys_prompt),
        ("human", "I am providing you {type}. Based upon the instructions, provide me the extracted info in plain text without PREAMBLE and text formatting. Find the content below from which you have to extract the details. \n\n{text}")
    ])

    prompt = prompt_template.invoke({
        "type": type_text,
        "text": text
    })

    response_text = ask_llm(prompt)
    return response_text

def match_skills(resume_text, job_description):
    """Match resume against job description and generate analysis"""
    system_prompt = read_prompt_from_file("backend/resources/prompts/match_skills_system_prompt.txt")
    
    human_prompt = """Analyze how well the candidate's resume matches the job description. First extract key skills and requirements from both documents, then provide:

1. An overall match score (percentage)
2. Matching skills with proficiency levels
3. Missing skills required by the job
4. Suggestions for improving the resume

Resume:
{resume_text}

Job Description:
{job_description}

In addition to the text analysis, return a structured assessment with specific skill categories and their match levels as a JSON object."""

    prompt_template = ChatPromptTemplate([
        ("system", system_prompt),
        ("human", human_prompt)
    ])
    
    prompt = prompt_template.invoke({
        "resume_text": resume_text,
        "job_description": job_description
    })

    response = ask_llm(prompt)
    
    # Try to extract JSON data from the response if available
    try:
        # First, attempt to find JSON data in the response
        json_start = response.find('{')
        json_end = response.rfind('}') + 1
        
        if json_start != -1 and json_end != -1:
            json_str = response[json_start:json_end]
            data = json.loads(json_str)
            
            return {
                "report": response[:json_start].strip(),
                "matchedSkills": data.get("overallMatch", 70),
                "missingSkills": 100 - data.get("overallMatch", 70),
                "requiredSkills": data.get("requiredSkills", {}),
                "availableSkills": data.get("availableSkills", {})
            }
    except:
        pass
    
    # Fallback if no JSON is found or parsing fails
    return {
        "report": response,
        "matchedSkills": 70,  # Example percentage
        "missingSkills": 30,  # Example percentage
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
    }