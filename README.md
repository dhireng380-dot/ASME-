# Pressure Vessel Welding Process Prediction & Distortion Monitoring System

An industrial-grade, AI-assisted engineering web application designed to recommend optimal welding processes (GTAW, GMAW, SMAW, SAW) and monitor weld distortion risks in heavy pressure vessel fabrication according to **ASME Boiler & Pressure Vessel Code (BPVC) Section VIII** standards.

![System Preview](assets/welding_hero.jpg)

---

## 🌟 Key Features

- **Industrial Engineering Dashboard Aesthetic**: Modern glassmorphism UI styled after Siemens NX, ANSYS APDL, and ABB software interfaces.
- **Rule Engine & AI Model Simulation**:
  - **High Risk / High Heat**: `Temperature > 900°C` & `FEA Stress > 300 MPa` $\rightarrow$ Recommends **GTAW (TIG) / SAW**, **Distortion Monitoring Required**, **High Risk**.
  - **Moderate Risk**: `Temperature 700°C – 900°C` $\rightarrow$ Recommends **GMAW (MIG)**, **Distortion Monitoring Recommended**, **Moderate Risk**.
  - **Low Risk**: `Temperature < 700°C` $\rightarrow$ Recommends **SMAW (Stick)**, **Distortion Monitoring Not Required**, **Low Risk**.
- **Interactive Visualizations & Gauges**:
  - Temperature Half-Gauge Chart
  - FEA Stress Half-Gauge Chart
  - Distortion Risk Meter
  - FEA Stress vs Yield Limit Bar Chart
  - Distortion Factor Breakdown Pie Chart
- **Automated Technical Report Generation**: Downloads formatted PDF reports via `jsPDF` featuring parameters, risk metrics, and mitigation protocols.
- **Persistent Prediction History**: LocalStorage history log with search, risk filtering, parameter reload, and **CSV Data Export**.
- **Python ML Backend Ready**: Designed to seamlessly connect with a Python Flask or FastAPI Machine Learning backend model.

---

## 📁 Project File Structure

```
pressure_vessel_welding_app/
├── index.html          # Main SPA application shell & sections
├── style.css           # Industrial CSS design system (Dark/Light mode, Glassmorphic cards)
├── script.js            # Engineering logic, Chart.js gauges, PDF exporter, LocalStorage
├── README.md           # Comprehensive project documentation
└── assets/
    └── welding_hero.jpg # Industrial pressure vessel welding hero image
```

---

## 🚀 How to Run the Application

### Method 1: Direct File Opening
Double-click `index.html` or open `file:///C:/Users/gdhir/.gemini/antigravity/scratch/pressure_vessel_welding_app/index.html` in any browser (Chrome, Edge, Firefox, Safari).

### Method 2: Local HTTP Server (Python / Node.js)
To serve over HTTP:

**Using Python 3:**
```bash
cd C:\Users\gdhir\.gemini\antigravity\scratch\pressure_vessel_welding_app
python -m http.server 8080
```
Then navigate to `http://localhost:8080` in your browser.

**Using Node.js / serve:**
```bash
npx serve . -p 3000
```

---

## 🐍 Future Python Flask / FastAPI Integration Guide

The application includes a **Python Backend Mode** toggle. To connect to an actual Machine Learning model trained on thermomechanical datasets:

### Example Python FastAPI Backend (`main.py`):

```python
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI(title="Welding Prediction API")

class PredictionRequest(BaseModel):
    welding_temp: float
    fea_stress: float
    material_grade: str
    wall_thickness: float

@app.post("/api/v1/predict-welding")
def predict_welding(req: PredictionRequest):
    # Load your trained Scikit-Learn / XGBoost model here:
    # prediction = model.predict([[req.welding_temp, req.fea_stress, ...]])
    
    if req.welding_temp > 900 and req.fea_stress > 300:
        return {
            "recommended_process": "GTAW (TIG)",
            "distortion_status": "Required",
            "distortion_risk": "High Risk",
            "risk_score": 88,
            "confidence_pct": 97.4,
            "recommendations": [
                "Apply Mandatory Preheating (180°C - 220°C)",
                "Reduce Heat Input (< 1.4 kJ/mm)",
                "Perform PWHT (600°C for 2 Hours)",
                "Increase Clamping Rigidity & Spider Bracing"
            ]
        }
    elif 700 <= req.welding_temp <= 900:
        return {
            "recommended_process": "GMAW (MIG)",
            "distortion_status": "Recommended",
            "distortion_risk": "Moderate Risk",
            "risk_score": 58,
            "confidence_pct": 94.8,
            "recommendations": [
                "Apply Preheating (100°C - 150°C)",
                "Use Balanced Symmetrical Back-Step Sequence",
                "Apply Rigid Strongbacks"
            ]
        }
    else:
        return {
            "recommended_process": "SMAW (Stick)",
            "distortion_status": "Not Required",
            "distortion_risk": "Low Risk",
            "risk_score": 20,
            "confidence_pct": 96.2,
            "recommendations": [
                "Preheating Optional under Ambient Conditions",
                "Standard Workshop Air Cooling Acceptable"
            ]
        }
```

---

## 🛡️ ASME Code Compliance & Engineering References

1. **ASME BPVC Section VIII Division 1 & 2**: Rules for Construction of Pressure Vessels.
2. **ASME Section IX**: Welding, Brazing, and Fusing Qualifications (GTAW, GMAW, SMAW, SAW).
3. **Finite Element Analysis (FEA)**: Non-linear transient thermal & residual stress modeling.

---

## 📄 License & Credits

Developed for Mechanical Engineering & FEA Research. Open for academic presentation, hackathons, and industrial fabrication prototyping.
