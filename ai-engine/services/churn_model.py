import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder

def predict_churn(
    data: list,
    customer_id_col: str,
    date_col: str = None,
    value_col: str = None
) -> dict:
    try:
        df = pd.DataFrame(data)

        features  = []
        customers = df[customer_id_col].tolist()

        # Feature: transaction count per customer
        tx_counts = df.groupby(customer_id_col).size().reset_index(name='tx_count')
        df        = df.merge(tx_counts, on=customer_id_col, how='left')
        features.append('tx_count')

        # Feature: total value per customer
        if value_col and value_col in df.columns:
            df[value_col] = pd.to_numeric(
                df[value_col].astype(str).str.replace(',', ''),
                errors='coerce'
            ).fillna(0)
            total_value = df.groupby(customer_id_col)[value_col].sum().reset_index(name='total_value')
            df          = df.merge(total_value, on=customer_id_col, how='left')
            features.append('total_value')

        # Drop duplicates — one row per customer
        df_unique = df.drop_duplicates(subset=[customer_id_col]).copy()

        if len(df_unique) < 5:
            raise ValueError("Need at least 5 customers for churn prediction")

        # Simple heuristic: low tx count + low value = high churn risk
        X = df_unique[features].fillna(0)

        # Normalize features
        for col in features:
            max_val = X[col].max()
            if max_val > 0:
                X[col] = X[col] / max_val

        # Create synthetic churn labels
        # (in real world: based on last purchase date)
        churn_score = 1 - X[features[0]]
        if len(features) > 1:
            churn_score = (churn_score + (1 - X[features[1]])) / 2

        churn_probability = (churn_score * 100).round(1)

        results = []
        for i, customer in enumerate(df_unique[customer_id_col].tolist()):
            prob = float(churn_probability.iloc[i])
            risk = 'high' if prob >= 70 else 'medium' if prob >= 40 else 'low'
            results.append({
                "customer":          str(customer),
                "churn_probability": prob,
                "risk_level":        risk,
                "recommendation":    (
                    "Immediate retention action needed"
                    if risk == 'high' else
                    "Send re-engagement campaign"
                    if risk == 'medium' else
                    "Low risk — maintain relationship"
                ),
            })

        # Sort by churn probability
        results.sort(key=lambda x: x['churn_probability'], reverse=True)

        high_risk   = sum(1 for r in results if r['risk_level'] == 'high')
        medium_risk = sum(1 for r in results if r['risk_level'] == 'medium')
        low_risk    = sum(1 for r in results if r['risk_level'] == 'low')

        return {
            "predictions":   results[:50],
            "total":         len(results),
            "high_risk":     high_risk,
            "medium_risk":   medium_risk,
            "low_risk":      low_risk,
            "insight": f"{high_risk} customers are at high churn risk and need immediate attention.",
        }

    except Exception as e:
        raise ValueError(f"Churn prediction failed: {str(e)}")