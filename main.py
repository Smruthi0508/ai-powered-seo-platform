
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel, HttpUrl

from seo_analyzer import analyze_website

app = FastAPI(
    title="AI-Powered SEO Optimization Platform",
    description="Website SEO Analysis API",
    version="1.0.0"
)

# Allow React frontend connections
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"]
)


# Request model
class WebsiteRequest(BaseModel):
    url: HttpUrl


@app.get("/")
def home():
    return {
        "message": "SEO Backend is running successfully!"
    }


@app.get("/api/v1/health")
def health_check():
    return {
        "status": "ok"
    }


# Website SEO analysis API
@app.post("/api/analyze")
def analyze_url(request: WebsiteRequest):

    try:
        result = analyze_website(str(request.url))
        return result

    except ValueError as error:
        return JSONResponse(
            status_code=400,
            content={
                "error": {
                    "code": "FETCH_FAILED",
                    "message": str(error)
                }
            }
        )

    except Exception:
        return JSONResponse(
            status_code=500,
            content={
                "error": {
                    "code": "ANALYSIS_FAILED",
                    "message": "SEO analysis failed. Please try again."
                }
            }
        )
