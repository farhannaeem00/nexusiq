from fastapi import APIRouter, HTTPException
from models.schemas import ChurnRequest
from services.churn_model import predict_churn

router = APIRouter(prefix="/ai", tags=["Churn"])

@router.post("/churn")
async def churn(data: ChurnRequest):
    try:
        result = predict_churn(
            data=             data.data,
            customer_id_col=  data.customer_id_col,
            date_col=         data.date_col,
            value_col=        data.value_col,
        )
        return {
            "success": True,
            "data":    result,
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))