from fastapi import APIRouter, HTTPException
from models.schemas import ForecastRequest
from services.forecasting import forecast_revenue

router = APIRouter(prefix="/ai", tags=["Forecast"])

@router.post("/forecast")
async def forecast(data: ForecastRequest):
    try:
        result = forecast_revenue(
            data=         data.data,
            date_col=     data.date_column,
            value_col=    data.value_column,
            periods=      data.periods,
        )
        return {
            "success": True,
            "data":    result,
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))