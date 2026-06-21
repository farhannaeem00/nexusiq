from pydantic import BaseModel
from typing import List, Optional, Any

class QueryRequest(BaseModel):
    question:    str
    dataset_id:  str
    columns:     List[str]
    sample_data: List[dict]
    full_data:   List[dict]

class ForecastRequest(BaseModel):
    dataset_id:  str
    date_column: str
    value_column: str
    data:        List[dict]
    periods:     int = 6

class ChurnRequest(BaseModel):
    dataset_id:       str
    data:             List[dict]
    customer_id_col:  str
    date_col:         Optional[str] = None
    value_col:        Optional[str] = None