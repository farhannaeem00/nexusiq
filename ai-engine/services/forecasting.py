import pandas as pd
import numpy as np
from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import PolynomialFeatures

def forecast_revenue(
    data: list,
    date_col: str,
    value_col: str,
    periods: int = 6
) -> dict:
    try:
        df = pd.DataFrame(data)

        # Clean value column
        df[value_col] = pd.to_numeric(
            df[value_col].astype(str).str.replace(',', ''),
            errors='coerce'
        ).fillna(0)

        # Sort by date if possible
        try:
            df[date_col] = pd.to_datetime(df[date_col])
            df = df.sort_values(date_col)
            date_labels = df[date_col].dt.strftime('%b %Y').tolist()
        except Exception:
            date_labels = [str(i) for i in range(len(df))]

        values = df[value_col].tolist()

        # Build historical data for chart
        historical = [
            {"name": date_labels[i], "value": round(float(values[i]), 2), "type": "historical"}
            for i in range(len(values))
        ]

        # Train model
        X = np.array(range(len(values))).reshape(-1, 1)
        y = np.array(values)

        poly    = PolynomialFeatures(degree=2)
        X_poly  = poly.fit_transform(X)
        model   = LinearRegression()
        model.fit(X_poly, y)

        # Predict future periods
        future_X    = np.array(range(len(values), len(values) + periods)).reshape(-1, 1)
        future_poly = poly.transform(future_X)
        predictions = model.predict(future_poly)

        # Generate future labels
        future_labels = [f"Month +{i+1}" for i in range(periods)]

        forecast = [
            {
                "name":  future_labels[i],
                "value": round(max(0, float(predictions[i])), 2),
                "type":  "forecast"
            }
            for i in range(periods)
        ]

        all_data = historical + forecast

        total_historical = sum(values)
        avg_historical   = total_historical / len(values) if values else 0
        total_forecast   = sum(max(0, float(p)) for p in predictions)
        growth_rate      = ((predictions[-1] - values[-1]) / values[-1] * 100) if values[-1] != 0 else 0

        return {
            "chart_data":        all_data,
            "historical_count":  len(historical),
            "forecast_count":    len(forecast),
            "total_historical":  round(total_historical, 2),
            "avg_historical":    round(avg_historical, 2),
            "total_forecast":    round(total_forecast, 2),
            "growth_rate":       round(float(growth_rate), 2),
            "insight": f"Based on historical data, revenue is expected to {'grow' if growth_rate > 0 else 'decline'} by {abs(round(float(growth_rate), 1))}% over the next {periods} periods.",
        }

    except Exception as e:
        raise ValueError(f"Forecasting failed: {str(e)}")