"""
StoreMind Pro - AI Pydantic Schemas
"""

from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any


class ForecastRequest(BaseModel):
    product_id: str
    days: int = Field(7, ge=1, le=30)


class ForecastPoint(BaseModel):
    date: str
    predicted_sales: float
    lower_bound: float
    upper_bound: float


class ForecastResponse(BaseModel):
    product_id: str
    product_name: str
    forecast_days: int
    data: List[ForecastPoint]
    recommendation: str


class VoiceParseRequest(BaseModel):
    speech_text: str  # e.g., "Add 2 kg sugar and 3 packets milk"


class ParsedVoiceItem(BaseModel):
    query_item: str
    quantity: int
    unit: str
    matched_product_id: Optional[str] = None
    matched_product_name: Optional[str] = None
    price: Optional[float] = None


class VoiceParseResponse(BaseModel):
    original_text: str
    items: List[ParsedVoiceItem]


class RAGQueryRequest(BaseModel):
    query: str


class RAGQueryResponse(BaseModel):
    query: str
    answer: str
    sources: List[str] = []
