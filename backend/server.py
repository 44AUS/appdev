from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from typing import Optional
import os
import uuid
from datetime import datetime

app = FastAPI(title="App&Flow API", version="1.0.0")

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Models
class ContactForm(BaseModel):
    name: str
    email: EmailStr
    company: Optional[str] = None
    message: str

class DiscoveryCallRequest(BaseModel):
    name: str
    email: EmailStr
    company: Optional[str] = None
    project_type: Optional[str] = None
    message: Optional[str] = None

# In-memory storage for demo purposes
contact_submissions = []
discovery_calls = []

@app.get("/api/health")
async def health_check():
    return {"status": "healthy", "timestamp": datetime.utcnow().isoformat()}

@app.post("/api/contact")
async def submit_contact(form: ContactForm):
    submission = {
        "id": str(uuid.uuid4()),
        "name": form.name,
        "email": form.email,
        "company": form.company,
        "message": form.message,
        "created_at": datetime.utcnow().isoformat()
    }
    contact_submissions.append(submission)
    return {"success": True, "message": "Thank you for your message! We'll get back to you soon.", "id": submission["id"]}

@app.post("/api/discovery-call")
async def book_discovery_call(request: DiscoveryCallRequest):
    booking = {
        "id": str(uuid.uuid4()),
        "name": request.name,
        "email": request.email,
        "company": request.company,
        "project_type": request.project_type,
        "message": request.message,
        "created_at": datetime.utcnow().isoformat()
    }
    discovery_calls.append(booking)
    return {"success": True, "message": "Discovery call request received! We'll contact you within 24 hours.", "id": booking["id"]}

@app.get("/api/stats")
async def get_stats():
    return {
        "projects_completed": 150,
        "happy_clients": 85,
        "years_experience": 10,
        "apps_launched": 200
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)
