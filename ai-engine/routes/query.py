from fastapi import APIRouter, HTTPException
from models.schemas import QueryRequest
from services.nl_to_sql import analyze_data

router = APIRouter(prefix="/ai", tags=["Query"])

@router.post("/query")
async def query_data(data: QueryRequest):
    try:
        result = analyze_data(
            question=    data.question,
            columns=     data.columns,
            sample_data= data.sample_data,
            full_data=   data.full_data,
        )
        return {
            "success": True,
            "data":    result,
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))