from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.query    import router as query_router
from routes.forecast import router as forecast_router
from routes.churn    import router as churn_router
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(
    title="NexusIQ AI Engine",
    description="AI-Powered Business Intelligence Engine",
    version="1.0.0"
)

# ── CORS ──────────────────────────────────────────────
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:5000",
        "http://localhost:5173",
        os.getenv("CLIENT_URL", "*"),
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Health Check ──────────────────────────────────────
@app.get("/")
def root():
    return {"message": "✅ NexusIQ AI Engine is running"}

# ── Routers ───────────────────────────────────────────
app.include_router(query_router)
app.include_router(forecast_router)
app.include_router(churn_router)