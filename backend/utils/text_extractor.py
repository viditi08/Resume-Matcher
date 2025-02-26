from langchain_community.document_loaders import WebBaseLoader
import os

# Use PyPDF2 instead of PyMuPDF (fitz)
try:
    import PyPDF2
    PDF_SUPPORT = True
except ImportError:
    print("WARNING: PyPDF2 not installed. PDF support will not be available.")
    PDF_SUPPORT = False

def extract_text_from_pdf(pdf_file):
    """Extract text from a PDF file uploaded through a form"""
    if not PDF_SUPPORT:
        return "PDF extraction is not available. Please install PyPDF2 with 'pip install PyPDF2'."
    
    try:
        reader = PyPDF2.PdfReader(pdf_file)
        text = ""
        for page_num in range(len(reader.pages)):
            page = reader.pages[page_num]
            text += page.extract_text() + "\n"
        return text
    except Exception as e:
        print(f"Error extracting PDF text: {e}")
        return "Error extracting text from PDF: " + str(e)

def extract_text_from_text(text_content):
    """Accept raw text input as an alternative to PDF"""
    return text_content

def fetch_job_description(url):
    """Fetch and extract text from a job description URL"""
    try:
        # Set user agent to avoid being blocked by websites
        user_agent = os.getenv("USER_AGENT", "Mozilla/5.0")
        loader = WebBaseLoader(
            web_paths=[url],
            header_template={"User-Agent": user_agent}
        )
        content = loader.load()[0].page_content
        return content
    except Exception as e:
        error_msg = f"Failed to fetch job description: {e}"
        print(error_msg)
        # Return a useful error message that can be displayed to the user
        return "ERROR: " + error_msg