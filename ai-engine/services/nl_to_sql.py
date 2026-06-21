import os
import json
from groq import Groq
from dotenv import load_dotenv

load_dotenv()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

def analyze_data(question: str, columns: list, sample_data: list, full_data: list) -> dict:
    # Build data summary for AI
    data_summary = f"""
Dataset has {len(full_data)} rows and {len(columns)} columns.
Columns: {', '.join(columns)}

Sample data (first 5 rows):
{json.dumps(sample_data[:5], indent=2)}
"""

    # Build full data context (limit to 100 rows for token limit)
    data_context = json.dumps(full_data[:100], indent=2)

    prompt = f"""
You are an expert data analyst AI.
Analyze this dataset and answer the user's question with insights and chart data.
Respond ONLY with valid JSON. No explanation, no markdown.

QUESTION: {question}

DATASET INFO:
{data_summary}

FULL DATA (up to 100 rows):
{data_context}

Respond with EXACTLY this JSON structure:
{{
  "answer": "Clear plain English answer to the question",
  "chart_type": "bar",
  "chart_title": "Chart title here",
  "chart_data": [
    {{"name": "Label", "value": 100}},
    {{"name": "Label2", "value": 200}}
  ],
  "insight": "One key insight from the data",
  "has_chart": true
}}

Rules:
- chart_type must be one of: "bar", "line", "pie", "area", "none"
- chart_data must be an array of objects with "name" and "value" keys
- If question doesn't need a chart set has_chart to false and chart_data to []
- For time series data use "line" or "area"
- For comparisons use "bar" or "pie"
- For trends use "line"
- answer must directly address the question
- insight must be a useful business observation

Return ONLY the JSON object.
"""

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        temperature=0.1,
        max_tokens=2000,
        messages=[{"role": "user", "content": prompt}],
    )

    content = response.choices[0].message.content.strip()
    cleaned = content \
        .replace("```json", "") \
        .replace("```", "") \
        .strip()

    try:
        parsed = json.loads(cleaned)
    except Exception as e:
        raise ValueError(f"AI returned invalid JSON: {e}")

    return parsed