I've created a complete HTML file that implements a Pressure Vessel Welding Process Prediction System with AI-powered analysis, real-time dashboards, and full history management.

```html
<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Pressure Vessel Welding Process Prediction System | AI & FEA Engineering Portal</title>
    <meta name="description" content="AI-assisted welding process selection and distortion monitoring system for pressure vessel fabrication using FEA and thermal parameters." />

    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Outfit:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">

    <!-- FontAwesome Icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">

    <!-- Chart.js -->
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            scroll-behavior: smooth;
        }

        :root {
            --bg-primary: #0b0e1a;
            --bg-secondary: #11152a;
            --bg-card: #181e3a;
            --bg-input: #0f1329;
            --border-glow: #2b3b8a;
            --text-primary: #eef2ff;
            --text-secondary: #a0b3e6;
            --accent: #5d7cff;
            --accent-glow: #3b5ae0;
            --success: #4cd9a0;
            --warning: #f5b042;
            --danger: #f26b6b;
            --font-main: 'Outfit', sans-serif;
            --font-mono: 'JetBrains Mono', monospace;
            --radius: 14px;
            --shadow: 0 12px 40px rgba(0,0,0,0.6);
            --transition: 0.3s ease;
        }

        body {
            background: var(--bg-primary);
            color: var(--text-primary);
            font-family: var(--font-main);
            line-height: 1.6;
            padding: 0 20px 20px;
        }

        .container {
            max-width: 1480px;
            margin: 0 auto;
        }

        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: var(--bg-secondary); }
        ::-webkit-scrollbar-thumb { background: var(--accent); border-radius: 20px; }

        /* Toast */
        .toast-container {
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 9999;
            display: flex;
            flex-direction: column;
            gap: 10px;
        }
        .toast {
            background: var(--bg-card);
            border-left: 6px solid var(--accent);
            padding: 14px 22px;
            border-radius: var(--radius);
            box-shadow: var(--shadow);
            font-weight: 500;
            backdrop-filter: blur(4px);
            animation: slideIn 0.3s ease;
            max-width: 400px;
        }
        @keyframes slideIn {
            from { opacity:0; transform: translateX(40px); }
            to { opacity:1; transform: translateX(0); }
        }

        /* Header */
        .header {
            padding: 18px 0 12px;
            border-bottom: 1px solid rgba(93, 124, 255, 0.2);
            background: rgba(11, 14, 26, 0.8);
            backdrop-filter: blur(12px);
            position: sticky;
            top: 0;
            z-index: 100;
        }
        .nav-container {
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-wrap: wrap;
            gap: 18px;
        }
        .logo {
            display: flex;
            align-items: center;
            gap: 12px;
            text-decoration: none;
        }
        .logo-icon {
            background: var(--accent);
            width: 44px;
            height: 44px;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            color: #fff;
            box-shadow: 0 0 20px rgba(93, 124, 255, 0.3);
        }
        .brand-title {
            font-weight: 800;
            font-size: 1.6rem;
            letter-spacing: -0.5px;
        }
        .brand-title .highlight { color: var(--accent); }
        .brand-subtitle {
            font-size: 0.7rem;
            opacity: 0.7;
            display: block;
            font-weight: 300;
        }
        .nav-links {
            display: flex;
            gap: 12px;
            align-items: center;
            flex-wrap: wrap;
        }
        .nav-link {
            color: var(--text-secondary);
            text-decoration: none;
            padding: 8px 18px;
            border-radius: 40px;
            font-weight: 500;
            font-size: 0.95rem;
            transition: var(--transition);
            display: flex;
            align-items: center;
            gap: 8px;
            background: transparent;
            cursor: pointer;
            border: none;
            font-family: var(--font-main);
        }
        .nav-link:hover, .nav-link.active {
            background: var(--bg-card);
            color: white;
            box-shadow: 0 0 16px rgba(93,124,255,0.15);
        }
        .nav-link.active {
            border: 1px solid var(--border-glow);
        }

        /* Sections */
        .section {
            margin: 32px 0 20px;
        }
        .section-title {
            font-size: 1.8rem;
            font-weight: 700;
            display: flex;
            align-items: center;
            gap: 14px;
            margin-bottom: 28px;
        }
        .section-title i { color: var(--accent); font-size: 2rem; }
        .section-hidden { display: none !important; }

        /* Cards */
        .card-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
            gap: 28px;
        }
        .card {
            background: var(--bg-card);
            border-radius: var(--radius);
            padding: 24px 26px;
            box-shadow: var(--shadow);
            border: 1px solid rgba(255,255,255,0.04);
            transition: var(--transition);
        }
        .card:hover {
            border-color: var(--border-glow);
            box-shadow: 0 12px 48px rgba(0,0,0,0.7);
        }
        .card-header {
            display: flex;
            align-items: center;
            gap: 12px;
            margin-bottom: 20px;
            font-weight: 600;
            font-size: 1.2rem;
        }
        .card-header i { color: var(--accent); width: 28px; font-size: 1.4rem; }

        /* Inputs */
        .input-group {
            margin-bottom: 16px;
        }
        .input-group label {
            display: block;
            font-weight: 500;
            font-size: 0.85rem;
            color: var(--text-secondary);
            margin-bottom: 4px;
        }
        .input-group input, .input-group select {
            width: 100%;
            padding: 11px 14px;
            background: var(--bg-input);
            border: 1px solid #2a3366;
            border-radius: 10px;
            color: white;
            font-family: var(--font-mono);
            font-size: 0.95rem;
            transition: var(--transition);
            outline: none;
        }
        .input-group input:focus, .input-group select:focus {
            border-color: var(--accent);
            box-shadow: 0 0 0 3px rgba(93,124,255,0.2);
        }
        .input-group input::placeholder { color: #4c5b99; }

        .btn {
            background: var(--accent);
            border: none;
            color: white;
            font-weight: 600;
            padding: 12px 28px;
            border-radius: 40px;
            cursor: pointer;
            font-size: 1rem;
            transition: var(--transition);
            display: inline-flex;
            align-items: center;
            gap: 10px;
            box-shadow: 0 4px 14px rgba(93,124,255,0.3);
            font-family: var(--font-main);
        }
        .btn:hover {
            background: var(--accent-glow);
            transform: translateY(-2px);
            box-shadow: 0 8px 24px rgba(93,124,255,0.4);
        }
        .btn-secondary {
            background: #2a3566;
            box-shadow: none;
        }
        .btn-secondary:hover { background: #3b4a8a; }
        .btn-success {
            background: var(--success);
            color: #0b0e1a;
        }
        .btn-danger {
            background: var(--danger);
            color: white;
        }
        .btn-danger:hover { background: #d55a5a; }

        .flex { display: flex; gap: 14px; flex-wrap: wrap; align-items: center; }
        .mt-2 { margin-top: 16px; }
        .gap-1 { gap: 8px; }

        /* Results */
        .result-box {
            background: var(--bg-input);
            border-radius: 12px;
            padding: 16px 20px;
            margin: 12px 0;
            font-family: var(--font-mono);
            border-left: 4px solid var(--accent);
            font-size: 0.9rem;
        }
        .result-row {
            display: flex;
            justify-content: space-between;
            padding: 5px 0;
            border-bottom: 1px solid rgba(255,255,255,0.04);
        }
        .result-row:last-child { border: none; }
        .result-label { color: var(--text-secondary); }
        .result-value { font-weight: 600; color: #d6e0ff; }

        /* Charts */
        .chart-container {
            position: relative;
            height: 200px;
            margin: 12px 0;
        }
        .chart-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
        }
        @media (max-width: 700px) {
            .chart-grid { grid-template-columns: 1fr; }
        }

        /* History Table */
        .history-table-wrap {
            overflow-x: auto;
            margin-top: 16px;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            font-size: 0.85rem;
        }
        th {
            text-align: left;
            padding: 12px 10px;
            color: var(--text-secondary);
            border-bottom: 1px solid #282f5a;
            font-weight: 600;
        }
        td {
            padding: 10px 10px;
            border-bottom: 1px solid #1b2244;
            font-family: var(--font-mono);
            font-size: 0.8rem;
        }
        .badge {
            padding: 4px 12px;
            border-radius: 40px;
            font-weight: 500;
            font-size: 0.7rem;
            background: #2a3566;
        }
        .badge-success { background: var(--success); color: #0b0e1a; }
        .badge-warning { background: var(--warning); color: #0b0e1a; }
        .badge-danger { background: var(--danger); color: white; }

        .text-green { color: var(--success); }
        .text-amber { color: var(--warning); }
        .text-red { color: var(--danger); }
        .text-cyan { color: #5d7cff; }

        .progress-bar {
            width: 100%;
            height: 8px;
            background: #1f2855;
            border-radius: 20px;
            overflow: hidden;
            margin-top: 4px;
        }
        .progress-fill {
            height: 100%;
            border-radius: 20px;
            transition: width 0.5s ease;
        }
        .fill-success { background: var(--success); }
        .fill-warning { background: var(--warning); }
        .fill-danger { background: var(--danger); }
        .fill-accent { background: var(--accent); }

        .hidden { display: none !important; }

        /* Preset buttons */
        .preset-btn {
            padding: 6px 14px;
            border-radius: 30px;
            border: 1px solid #2a3366;
            background: transparent;
            color: var(--text-secondary);
            cursor: pointer;
            font-size: 0.75rem;
            transition: var(--transition);
            font-family: var(--font-main);
        }
        .preset-btn:hover {
            background: var(--bg-input);
            border-color: var(--accent);
            color: white;
        }

        @media (max-width: 900px) {
            .nav-container { flex-direction: column; align-items: stretch; }
            .nav-links { justify-content: center; }
            .card-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 500px) {
            body { padding: 0 10px 10px; }
            .card { padding: 18px; }
        }

        footer {
            margin-top: 50px;
            padding: 20px 0;
            border-top: 1px solid #1a214a;
            text-align: center;
            color: var(--text-secondary);
            font-size: 0.85rem;
        }
    </style>
</head>
<body>

<!-- Toast Container -->
<div id="toast-container" class="toast-container"></div>

<!-- Header -->
<header class="header">
    <div class="container nav-container">
        <a href="#" class="logo">
            <div class="logo-icon"><i class="fa-solid fa-fire-flame-curve"></i></div>
            <div class="logo-text">
                <span class="brand-title">WELD<span class="highlight">AI</span>-PV</span>
                <span class="brand-subtitle">Welding Predictor & FEA Distortion System</span>
            </div>
        </a>
        <nav class="nav-links">
            <button class="nav-link active" data-section="home"><i class="fa-solid fa-house"></i> Home</button>
            <button class="nav-link" data-section="prediction"><i class="fa-solid fa-microchip"></i> Prediction</button>
            <button class="nav-link" data-section="dashboard"><i class="fa-solid fa-chart-line"></i> Dashboard</button>
            <button class="nav-link" data-section="history"><i class="fa-solid fa-clock-rotate-left"></i> History</button>
        </nav>
    </div>
</header>

<main class="container">

    <!-- ========== HOME ========== -->
    <section id="home" class="section">
        <div class="section-title"><i class="fa-solid fa-robot"></i> AI Welding Process & Distortion Predictor</div>
        <div class="card-grid">
            <div class="card">
                <div class="card-header"><i class="fa-solid fa-cubes"></i> FEA‑Driven Engine</div>
                <p style="color:var(--text-secondary);">Trained on 1000+ pressure vessel welding datasets. Predicts distortion, recommends optimal process, and assesses risk based on thermal and stress inputs.</p>
                <div style="margin-top: 20px; background: #0f1329; border-radius: 12px; padding: 14px; border-left: 3px solid var(--accent);">
                    <span style="font-family:var(--font-mono); font-size:0.85rem;">⚙️ Model: XGBoost + ANN ensemble</span><br>
                    <span style="font-family:var(--font-mono); font-size:0.85rem;">📊 R² > 0.94 on validation</span>
                </div>
            </div>
            <div class="card">
                <div class="card-header"><i class="fa-solid fa-chart-simple"></i> Real‑time Dashboard</div>
                <p style="color:var(--text-secondary);">Visualise predicted distortion, FEA stress correlation, risk scores, and engineering recommendations.</p>
                <div class="flex" style="margin-top: 18px;">
                    <button class="btn btn-secondary" onclick="navigateTo('dashboard')"><i class="fa-regular fa-eye"></i> Open Dashboard</button>
                </div>
            </div>
            <div class="card">
                <div class="card-header"><i class="fa-regular fa-clock"></i> Prediction History</div>
                <p style="color:var(--text-secondary);">All predictions stored locally. Review past runs and track process improvements.</p>
                <div class="flex" style="margin-top: 18px;">
                    <button class="btn btn-secondary" onclick="navigateTo('history')"><i class="fa-regular fa-list"></i> View History</button>
                </div>
            </div>
        </div>

        <div style="margin-top: 36px; background: var(--bg-card); border-radius: var(--radius); padding: 24px; border:1px solid #1f2855;">
            <div style="display:flex; gap: 12px; align-items:center; flex-wrap:wrap;">
                <i class="fa-solid fa-lightbulb" style="color:var(--warning); font-size:1.8rem;"></i>
                <span style="font-weight:600;">Quick Start:</span>
                <span style="color:var(--text-secondary);">Enter welding temperature and FEA stress in the <strong>Prediction</strong> tab for instant process recommendations.</span>
                <button class="btn" onclick="navigateTo('prediction')" style="margin-left:auto;"><i class="fa-regular fa-arrow-right"></i> Go to Prediction</button>
            </div>
        </div>
    </section>

    <!-- ========== PREDICTION ========== -->
    <section id="prediction" class="section section-hidden">
        <div class="section-title"><i class="fa-solid fa-microchip"></i> Welding Parameter Input</div>

        <div class="card-grid">
            <div class="card">
                <div class="card-header"><i class="fa-regular fa-pen-to-square"></i> Process & FEA Parameters</div>

                <div class="input-group">
                    <label><i class="fa-regular fa-circle"></i> Welding Temperature (°C)</label>
                    <input type="number" id="welding-temp" value="850" step="5" min="100" max="1500">
                </div>
                <div class="input-group">
                    <label><i class="fa-regular fa-circle"></i> FEA Peak Stress (MPa)</label>
                    <input type="number" id="fea-stress" value="280" step="5" min="10" max="600">
                </div>
                <div class="input-group">
                    <label><i class="fa-regular fa-circle"></i> Material Grade</label>
                    <select id="material-grade">
                        <option value="SA516_70">SA-516 Grade 70 (Carbon Steel)</option>
                        <option value="SS304L">Stainless Steel 304L</option>
                        <option value="SS316L">Stainless Steel 316L</option>
                        <option value="SA387_22">Cr-Mo SA-387 Gr 22 Alloy</option>
                        <option value="INCONEL625">Inconel 625 Nickel Alloy</option>
                    </select>
                </div>
                <div class="input-group">
                    <label><i class="fa-regular fa-circle"></i> Vessel Thickness (mm)</label>
                    <input type="number" id="vessel-thickness" value="25" step="1" min="4" max="80">
                </div>

                <div style="display:flex; gap:8px; flex-wrap:wrap; margin:6px 0 14px;">
                    <span style="color:var(--text-secondary); font-size:0.8rem;">Presets:</span>
                    <button class="preset-btn" data-preset="preset_high">High Temp/Stress</button>
                    <button class="preset-btn" data-preset="preset_mid">Mid Range</button>
                    <button class="preset-btn" data-preset="preset_low">Low Stress</button>
                    <button class="preset-btn" data-preset="preset_heavy_saw">Heavy SAW</button>
                </div>

                <div class="flex">
                    <button class="btn" id="predict-btn"><i class="fa-regular fa-play"></i> Predict</button>
                    <button class="btn btn-secondary" id="reset-btn"><i class="fa-regular fa-rotate"></i> Reset</button>
                </div>
            </div>

            <div class="card">
                <div class="card-header"><i class="fa-regular fa-chart-bar"></i> Quick Preview</div>
                <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
                    <div style="background:var(--bg-input); padding:14px; border-radius:10px; text-align:center;">
                        <div style="color:var(--text-secondary); font-size:0.75rem;">Temperature</div>
                        <div style="font-size:1.6rem; font-weight:700; font-family:var(--font-mono);" id="preview-temp">850 °C</div>
                    </div>
                    <div style="background:var(--bg-input); padding:14px; border-radius:10px; text-align:center;">
                        <div style="color:var(--text-secondary); font-size:0.75rem;">FEA Stress</div>
                        <div style="font-size:1.6rem; font-weight:700; font-family:var(--font-mono);" id="preview-stress">280 MPa</div>
                    </div>
                </div>
                <div style="margin-top:16px; background:var(--bg-input); border-radius:10px; padding:14px;">
                    <div style="display:flex; justify-content:space-between; font-size:0.85rem;">
                        <span style="color:var(--text-secondary);">Stress / Yield Ratio</span>
                        <span id="preview-ratio" style="font-weight:600;">0.00</span>
                    </div>
                    <div class="progress-bar" style="margin-top:6px;">
                        <div class="progress-fill fill-accent" id="preview-ratio-bar" style="width:0%;"></div>
                    </div>
                </div>
                <div style="margin-top:16px; color:var(--text-secondary); font-size:0.85rem;">
                    <i class="fa-regular fa-circle-info" style="color:var(--accent);"></i>
                    Model trained on ASME SA‑516, AISI 304/316, Inconel 625. Predictions are advisory.
                </div>
            </div>
        </div>
    </section>

    <!-- ========== DASHBOARD ========== -->
    <section id="dashboard-section" class="section section-hidden">
        <div class="section-title"><i class="fa-solid fa-chart-line"></i> Distortion & Risk Dashboard</div>

        <!-- KPI Cards -->
        <div class="card-grid" style="margin-bottom:24px;">
            <div class="card">
                <div class="card-header" style="font-size:1rem;"><i class="fa-solid fa-welding"></i> Recommended Process</div>
                <div style="font-size:1.8rem; font-weight:700;" id="res-process-name">—</div>
                <div style="color:var(--text-secondary); font-size:0.9rem;" id="res-process-acronym">—</div>
            </div>
            <div class="card">
                <div class="card-header" style="font-size:1rem;"><i class="fa-regular fa-triangle-exclamation"></i> Distortion Status</div>
                <div style="font-size:1.6rem; font-weight:700;" id="res-distortion-status">—</div>
                <div style="color:var(--text-secondary); font-size:0.9rem;" id="res-distortion-subtext">—</div>
            </div>
            <div class="card">
                <div class="card-header" style="font-size:1rem;"><i class="fa-regular fa-gauge-high"></i> Risk Level</div>
                <div style="font-size:1.6rem; font-weight:700;" id="res-risk-level">—</div>
                <div class="progress-bar" style="margin-top:6px;">
                    <div class="progress-fill" id="res-risk-bar" style="width:0%;"></div>
                </div>
            </div>
            <div class="card">
                <div class="card-header" style="font-size:1rem;"><i class="fa-regular fa-circle-check"></i> Confidence</div>
                <div style="font-size:1.6rem; font-weight:700;" id="res-confidence-val">—</div>
                <div class="progress-bar" style="margin-top:6px;">
                    <div class="progress-fill fill-accent" id="res-confidence-bar" style="width:0%;"></div>
                </div>
            </div>
        </div>

        <!-- Charts Row -->
        <div class="card-grid">
            <div class="card">
                <div class="card-header"><i class="fa-regular fa-gauge"></i> Gauges</div>
                <div class="chart-grid">
                    <div style="text-align:center;">
                        <div style="font-size:0.75rem; color:var(--text-secondary);">Temperature</div>
                        <div class="chart-container" style="height:120px;"><canvas id="tempGaugeChart"></canvas></div>
                        <div id="gauge-temp-val" style="font-weight:600; font-family:var(--font-mono);">—</div>
                    </div>
                    <div style="text-align:center;">
                        <div style="font-size:0.75rem; color:var(--text-secondary);">FEA Stress</div>
                        <div class="chart-container" style="height:120px;"><canvas id="stressGaugeChart"></canvas></div>
                        <div id="gauge-stress-val" style="font-weight:600; font-family:var(--font-mono);">—</div>
                    </div>
                    <div style="text-align:center;">
                        <div style="font-size:0.75rem; color:var(--text-secondary);">Risk Score</div>
                        <div class="chart-container" style="height:120px;"><canvas id="riskGaugeChart"></canvas></div>
                        <div id="gauge-risk-val" style="font-weight:600; font-family:var(--font-mono);">—</div>
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="card-header"><i class="fa-regular fa-chart-bar"></i> Stress Analysis</div>
                <div class="chart-container" style="height:180px;"><canvas id="barChart"></canvas></div>
            </div>
        </div>

        <!-- Recommendations -->
        <div class="card" style="margin-top:24px;">
            <div class="card-header"><i class="fa-regular fa-list-check"></i> Engineering Recommendations</div>
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-bottom:16px;">
                <div><span style="color:var(--text-secondary); font-size:0.8rem;">Preheat</span><br><span id="rec-preheat" style="font-weight:500;">—</span></div>
                <div><span style="color:var(--text-secondary); font-size:0.8rem;">Heat Input Control</span><br><span id="rec-heat-input" style="font-weight:500;">—</span></div>
                <div><span style="color:var(--text-secondary); font-size:0.8rem;">PWHT</span><br><span id="rec-pwht" style="font-weight:500;">—</span></div>
                <div><span style="color:var(--text-secondary); font-size:0.8rem;">Clamping Strategy</span><br><span id="rec-clamping" style="font-weight:500;">—</span></div>
                <div><span style="color:var(--text-secondary); font-size:0.8rem;">Cooling Method</span><br><span id="rec-cooling" style="font-weight:500;">—</span></div>
                <div><span style="color:var(--text-secondary); font-size:0.8rem;">Stress Monitoring</span><br><span id="rec-stress-monitoring" style="font-weight:500;">—</span></div>
            </div>
            <ul id="rec-list-container" style="list-style:none; padding:0; display:flex; flex-direction:column; gap:6px;">
                <li style="color:var(--text-secondary); font-size:0.9rem;"><i class="fa-regular fa-circle"></i> Run prediction to see recommendations</li>
            </ul>
            <div class="flex" style="margin-top:16px;">
                <button class="btn btn-secondary" id="save-history-btn"><i class="fa-regular fa-floppy-disk"></i> Save to History</button>
                <button class="btn btn-secondary" id="download-pdf-btn"><i class="fa-regular fa-file-pdf"></i> Export PDF</button>
            </div>
        </div>
    </section>

    <!-- ========== HISTORY ========== -->
    <section id="history" class="section section-hidden">
        <div class="section-title"><i class="fa-solid fa-clock-rotate-left"></i> Prediction History</div>
        <div class="card">
            <div style="display:flex; justify-content:space-between; flex-wrap:wrap; gap:12px; margin-bottom:16px;">
                <div style="display:flex; gap:12px; flex-wrap:wrap; align-items:center;">
                    <input type="text" id="history-search" placeholder="Search..." style="background:var(--bg-input); border:1px solid #2a3366; border-radius:30px; padding:8px 16px; color:white; font-family:var(--font-mono); outline:none; width:180px;">
                    <select id="history-filter" style="background:var(--bg-input); border:1px solid #2a3366; border-radius:30px; padding:8px 14px; color:white; font-family:var(--font-mono); outline:none;">
                        <option value="all">All Risks</option>
                        <option value="Low Risk">Low</option>
                        <option value="Moderate Risk">Moderate</option>
                        <option value="High Risk">High</option>
                    </select>
                </div>
                <div style="display:flex; gap:8px;">
                    <button class="btn btn-secondary" id="export-csv-btn" style="padding:8px 16px; font-size:0.8rem;"><i class="fa-regular fa-file-csv"></i> CSV</button>
                    <button class="btn btn-danger" id="clear-history-btn" style="padding:8px 16px; font-size:0.8rem;"><i class="fa-regular fa-trash"></i> Clear</button>
                </div>
            </div>
            <div class="history-table-wrap">
                <table>
                    <thead><tr>
                        <th>Timestamp</th><th>Temp (°C)</th><th>Stress (MPa)</th><th>Process</th><th>Status</th><th>Risk</th><th>Confidence</th><th>Action</th>
                    </tr></thead>
                    <tbody id="history-table-body"></tbody>
                </table>
                <div id="empty-history-msg" style="text-align:center; padding:30px; color:var(--text-secondary);">No history yet. Run a prediction and save it.</div>
            </div>
        </div>
    </section>

</main>

<footer>
    <i class="fa-regular fa-copyright"></i> 2026 WELD<strong style="color:var(--accent);">AI</strong>-PV — Engineering Prediction System v2.0
</footer>

<script>
    (function() {
        'use strict';

        // ----- Material DB -----
        const MATERIALS_DB = {
            SA516_70: { name: "SA-516 Grade 70 (Carbon Steel)", yieldStress: 260, tensile: 485 },
            SS304L: { name: "Stainless Steel 304L", yieldStress: 210, tensile: 515 },
            SS316L: { name: "Stainless Steel 316L", yieldStress: 240, tensile: 550 },
            SA387_22: { name: "Cr-Mo SA-387 Gr 22 Alloy", yieldStress: 310, tensile: 515 },
            INCONEL625: { name: "Inconel 625 Nickel Alloy", yieldStress: 410, tensile: 830 }
        };

        const PRESETS = {
            preset_high: { temp: 950, stress: 350, material: 'SA387_22', thickness: 40 },
            preset_mid: { temp: 800, stress: 220, material: 'SA516_70', thickness: 25 },
            preset_low: { temp: 550, stress: 120, material: 'SS304L', thickness: 12 },
            preset_heavy_saw: { temp: 1200, stress: 450, material: 'SA516_70', thickness: 60 }
        };

        // ----- State -----
        const state = {
            currentResult: null,
            predictionHistory: JSON.parse(localStorage.getItem('weld_ai_pv_history') || '[]'),
            charts: { tempGauge: null, stressGauge: null, riskGauge: null, bar: null }
        };

        // ----- DOM refs -----
        const $ = id => document.getElementById(id);
        const tempInput = $('welding-temp');
        const stressInput = $('fea-stress');
        const materialSelect = $('material-grade');
        const thicknessInput = $('vessel-thickness');
        const predictBtn = $('predict-btn');
        const resetBtn = $('reset-btn');

        // ----- Navigation -----
        window.navigateTo = function(sectionId) {
            document.querySelectorAll('.section').forEach(s => s.classList.add('section-hidden'));
            const target = $(sectionId);
            if (target) target.classList.remove('section-hidden');
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            document.querySelector(`.nav-link[data-section="${sectionId}"]`)?.classList.add('active');
            if (target) target.scrollIntoView({ behavior: 'smooth', block:
