/**
 * Pressure Vessel Welding Process Prediction System
 * Siemens NX / ANSYS Industrial Engineering Logic & Dashboard Architecture
 */

document.addEventListener('DOMContentLoaded', () => {
    // --- Application State ---
    const state = {
        theme: 'dark',
        predictionHistory: [],
        currentResult: null,
        charts: {
            tempGauge: null,
            stressGauge: null,
            riskGauge: null,
            bar: null,
            pie: null
        }
    };

    // Material Yield & Mechanical Database
    const MATERIALS_DB = {
        SA516_70: { name: "SA-516 Grade 70 (Carbon Steel)", yieldStress: 260, tensile: 485 },
        SS304L: { name: "Stainless Steel 304L", yieldStress: 210, tensile: 515 },
        SS316L: { name: "Stainless Steel 316L", yieldStress: 240, tensile: 550 },
        SA387_22: { name: "Cr-Mo SA-387 Gr 22 Alloy", yieldStress: 310, tensile: 515 },
        INCONEL625: { name: "Inconel 625 Nickel Alloy", yieldStress: 410, tensile: 830 }
    };

    // Presets
    const PRESETS = {
        preset_high: { temp: 950, stress: 350, material: 'SA387_22', thickness: 40 },
        preset_mid: { temp: 800, stress: 220, material: 'SA516_70', thickness: 25 },
        preset_low: { temp: 550, stress: 120, material: 'SS304L', thickness: 12 },
        preset_heavy_saw: { temp: 1200, stress: 450, material: 'SA516_70', thickness: 60 }
    };

    // --- DOM Element References ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.getElementById('nav-links');

    const tempSlider = document.getElementById('temp-slider');
    const tempInput = document.getElementById('welding-temp');
    const tempDisplay = document.getElementById('temp-display');

    const stressSlider = document.getElementById('stress-slider');
    const stressInput = document.getElementById('fea-stress');
    const stressDisplay = document.getElementById('stress-display');
    const stressBarFill = document.getElementById('stress-bar-fill');

    const predictionForm = document.getElementById('prediction-form');
    const predictBtn = document.getElementById('predict-btn');
    const dashboardSection = document.getElementById('dashboard-section');

    const hudTemp = document.getElementById('hud-temp');
    const hudStress = document.getElementById('hud-stress');
    const stressContour = document.getElementById('stress-contour');

    // KPI Results Elements
    const resProcessName = document.getElementById('res-process-name');
    const resProcessAcronym = document.getElementById('res-process-acronym');
    const resDistortionStatus = document.getElementById('res-distortion-status');
    const resDistortionSubtext = document.getElementById('res-distortion-subtext');
    const resDistortionIcon = document.getElementById('res-distortion-icon');
    const resRiskLevel = document.getElementById('res-risk-level');
    const resRiskIcon = document.getElementById('res-risk-icon');
    const resRiskBar = document.getElementById('res-risk-bar');
    const resConfidenceVal = document.getElementById('res-confidence-val');
    const resConfidenceBar = document.getElementById('res-confidence-bar');

    // Gauge Values Text
    const gaugeTempVal = document.getElementById('gauge-temp-val');
    const gaugeStressVal = document.getElementById('gauge-stress-val');
    const gaugeRiskVal = document.getElementById('gauge-risk-val');

    // Recommendations List & Details
    const recListContainer = document.getElementById('rec-list-container');
    const recPreheat = document.getElementById('rec-preheat');
    const recHeatInput = document.getElementById('rec-heat-input');
    const recPwht = document.getElementById('rec-pwht');
    const recClamping = document.getElementById('rec-clamping');
    const recCooling = document.getElementById('rec-cooling');
    const recStressMonitoring = document.getElementById('rec-stress-monitoring');

    // Action Buttons & History Table
    const downloadPdfBtn = document.getElementById('download-pdf-btn');
    const saveHistoryBtn = document.getElementById('save-history-btn');
    const historyTableBody = document.getElementById('history-table-body');
    const emptyHistoryMsg = document.getElementById('empty-history-msg');
    const historySearch = document.getElementById('history-search');
    const historyFilter = document.getElementById('history-filter');
    const exportCsvBtn = document.getElementById('export-csv-btn');
    const clearHistoryBtn = document.getElementById('clear-history-btn');
    const contactForm = document.getElementById('contact-form');

    // --- Application Initialization ---
    function init() {
        loadHistoryFromStorage();
        setupEventListeners();
        syncInputs();
        setupScrollSpy();
    }

    function setupEventListeners() {
        // Theme Toggle
        themeToggleBtn.addEventListener('click', toggleTheme);

        // Mobile Menu
        mobileMenuBtn.addEventListener('click', () => navLinks.classList.toggle('active'));

        // Temperature Controls Sync
        tempSlider.addEventListener('input', (e) => {
            tempInput.value = e.target.value;
            syncInputs();
        });
        tempInput.addEventListener('input', (e) => {
            tempSlider.value = e.target.value || 0;
            syncInputs();
        });

        // FEA Stress Controls Sync
        stressSlider.addEventListener('input', (e) => {
            stressInput.value = e.target.value;
            syncInputs();
        });
        stressInput.addEventListener('input', (e) => {
            stressSlider.value = e.target.value || 0;
            syncInputs();
        });

        // Presets Loader
        document.querySelectorAll('.preset-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const key = btn.dataset.preset;
                if (PRESETS[key]) {
                    loadPreset(PRESETS[key]);
                    showToast(`Loaded engineering preset scenario`, 'success');
                }
            });
        });

        // Submit Form
        predictionForm.addEventListener('submit', handleFormSubmit);

        // Actions & History
        downloadPdfBtn.addEventListener('click', generatePdfReport);
        saveHistoryBtn.addEventListener('click', saveCurrentPredictionToHistory);
        clearHistoryBtn.addEventListener('click', clearHistory);
        exportCsvBtn.addEventListener('click', exportHistoryToCSV);
        historySearch.addEventListener('input', renderHistoryTable);
        historyFilter.addEventListener('change', renderHistoryTable);
        contactForm.addEventListener('submit', handleContactSubmit);
    }

    // --- Inputs Synchronization & Real-time CAD Viewport ---
    function syncInputs() {
        const temp = parseFloat(tempInput.value) || 0;
        const stress = parseFloat(stressInput.value) || 0;

        tempDisplay.textContent = `${temp} °C`;
        stressDisplay.textContent = `${stress} MPa`;

        // Update CAD HUD
        hudTemp.textContent = `TEMP: ${temp}°C`;
        hudStress.textContent = `STRESS: ${stress} MPa`;

        // Stress bar fill preview
        const maxStress = 600;
        const pct = Math.min(Math.max((stress / maxStress) * 100, 0), 100);
        stressBarFill.style.width = `${pct}%`;

        // Stress contour scale animation in viewport
        const scaleFactor = 0.6 + Math.min((stress / 400), 1.2);
        stressContour.style.transform = `translate(-50%, -50%) scale(${scaleFactor})`;
    }

    function loadPreset(data) {
        tempInput.value = data.temp;
        tempSlider.value = data.temp;
        stressInput.value = data.stress;
        stressSlider.value = data.stress;

        if (data.material) document.getElementById('material-grade').value = data.material;
        if (data.thickness) document.getElementById('vessel-thickness').value = data.thickness;

        syncInputs();
        document.getElementById('prediction').scrollIntoView({ behavior: 'smooth' });
    }

    function toggleTheme() {
        state.theme = state.theme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', state.theme);
        themeToggleBtn.querySelector('i').className = state.theme === 'light' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
    }

    function setupScrollSpy() {
        const sections = document.querySelectorAll('section');
        const links = document.querySelectorAll('.nav-link');

        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(sec => {
                const top = sec.offsetTop - 120;
                if (window.scrollY >= top) current = sec.getAttribute('id');
            });

            links.forEach(l => {
                l.classList.remove('active');
                if (l.getAttribute('href') === `#${current}`) l.classList.add('active');
            });
        });
    }

    // --- Core Rule Logic Engine ---
    function evaluatePredictionLogic(temp, stress, materialKey, thickness) {
        const mat = MATERIALS_DB[materialKey] || MATERIALS_DB.SA516_70;
        let process = "SMAW";
        let acronym = "Shielded Metal Arc Welding (Stick)";
        let distortionStatus = "Not Required";
        let riskLevel = "Low Risk";
        let riskScore = 25; // out of 100
        let confidence = 96.5;

        // Specific Prompt Logic Checks
        if (temp > 900 && stress > 300) {
            process = thickness >= 30 ? "SAW (Submerged Arc)" : "GTAW (TIG)";
            acronym = thickness >= 30 ? "Submerged Arc Welding (High Deposition)" : "Gas Tungsten Arc Welding (Precision Root)";
            distortionStatus = "Required";
            riskLevel = "High Risk";
            riskScore = Math.min(80 + Math.round((stress - 300) / 10), 98);
            confidence = 97.4;
        } else if (temp >= 700 && temp <= 900) {
            process = "GMAW (MIG)";
            acronym = "Gas Metal Arc Welding (Semi-Automated)";
            distortionStatus = "Recommended";
            riskLevel = "Moderate Risk";
            riskScore = Math.min(50 + Math.round((temp - 700) / 10), 75);
            confidence = 94.8;
        } else if (temp < 700) {
            process = "SMAW";
            acronym = "Shielded Metal Arc Welding (Manual Stick)";
            distortionStatus = "Not Required";
            riskLevel = "Low Risk";
            riskScore = Math.max(15 + Math.round(stress / 15), 10);
            confidence = 96.2;
        } else {
            // High temp moderate stress fallback
            process = "GTAW (TIG)";
            acronym = "Gas Tungsten Arc Welding";
            distortionStatus = "Recommended";
            riskLevel = "Moderate Risk";
            riskScore = 60;
            confidence = 93.5;
        }

        // Tailored Engineering Recommendations Generator
        const recommendationsList = [];
        let preheatText = "Preheating Optional (Ambient 20°C)";
        let heatInputText = "Standard Heat Input (1.8 - 2.5 kJ/mm)";
        let pwhtText = "PWHT Not Mandatory";
        let clampingText = "Standard Alignment Tack Clamps";
        let coolingText = "Air Cooling in Still Workshop Air";
        let stressMonText = "Periodic Visual & Penetrant Testing";

        if (riskLevel === "High Risk") {
            recommendationsList.push("Apply Mandatory Preheating (150°C - 250°C) to reduce thermal shock & hydrogen cracking.");
            recommendationsList.push("Reduce arc voltage/current to lower heat input (< 1.5 kJ/mm) and limit thermal strain volume.");
            recommendationsList.push("Perform Post Weld Heat Treatment (PWHT at 600°C for 2 Hours) for stress relief.");
            recommendationsList.push("Increase clamping rigidity using heavy-duty internal hydraulic spider bracing.");
            recommendationsList.push("Use controlled slow cooling under thermal insulation blankets.");
            recommendationsList.push("Monitor residual stresses continuously using real-time strain gauges & FEA correlation.");

            preheatText = "Mandatory Preheating (180°C - 220°C)";
            heatInputText = "Strict Low Heat Input (< 1.4 kJ/mm)";
            pwhtText = "Perform PWHT (600°C for 2 Hours)";
            clampingText = "Rigid Internal Spider Bracing & External Rings";
            coolingText = "Controlled Slow Cooling with Insulated Blankets";
            stressMonText = "Continuous Strain Gauge & FEA Stress Monitoring";
        } else if (riskLevel === "Moderate Risk") {
            recommendationsList.push("Apply preheating (100°C - 150°C) prior to root pass execution.");
            recommendationsList.push("Use balanced symmetrical back-step welding sequence to equalize heat distribution.");
            recommendationsList.push("Maintain interpass temperature below 200°C.");
            recommendationsList.push("Apply rigid strongbacks and outer alignment clamp fixtures.");
            recommendationsList.push("Use controlled cooling in still air; protect joint from drafts.");
            recommendationsList.push("Monitor residual stresses with interpass dial indicator checks.");

            preheatText = "Apply Preheating (100°C - 150°C)";
            heatInputText = "Balanced Heat Input (1.5 - 2.0 kJ/mm)";
            pwhtText = "PWHT Recommended for Thick Sections (> 38mm)";
            clampingText = "Rigid Strongbacks & Heavy Duty Mechanical Clamps";
            coolingText = "Protected Air Cooling (Draft-Free Environment)";
            stressMonText = "Interpass Dial Indicator & Magnetic Particle Check";
        } else {
            recommendationsList.push("Preheating not required under standard ambient conditions (> 20°C).");
            recommendationsList.push("Maintain standard pass sequence and proper travel speed.");
            recommendationsList.push("PWHT optional unless specified by ASME Sec VIII wall thickness criteria.");
            recommendationsList.push("Standard external alignment clamps sufficient.");
            recommendationsList.push("Normal workshop air cooling acceptable.");
            recommendationsList.push("Standard visual weld inspection & NDT after cooling.");
        }

        return {
            timestamp: new Date().toLocaleString(),
            temp: temp,
            stress: stress,
            materialKey: materialKey,
            materialObj: mat,
            thickness: thickness,
            process: process,
            acronym: acronym,
            distortionStatus: distortionStatus,
            riskLevel: riskLevel,
            riskScore: riskScore,
            confidence: confidence,
            recommendationsList: recommendationsList,
            preheatText: preheatText,
            heatInputText: heatInputText,
            pwhtText: pwhtText,
            clampingText: clampingText,
            coolingText: coolingText,
            stressMonText: stressMonText
        };
    }

    // --- Form Submit Event ---
    async function handleFormSubmit(e) {
        e.preventDefault();

        const temp = parseFloat(tempInput.value);
        const stress = parseFloat(stressInput.value);
        const materialKey = document.getElementById('material-grade').value;
        const thickness = parseFloat(document.getElementById('vessel-thickness').value) || 25;
        const isBackendApi = document.getElementById('backend-api-mode').checked;

        // Validation: Positive values required
        if (isNaN(temp) || temp <= 0) {
            showToast('Welding Temperature must be a positive numeric value.', 'error');
            return;
        }
        if (isNaN(stress) || stress <= 0) {
            showToast('FEA Stress must be a positive numeric value.', 'error');
            return;
        }

        // Button Loading UI
        const btnText = predictBtn.querySelector('.btn-text');
        const btnSpinner = predictBtn.querySelector('.btn-spinner');
        btnText.classList.add('hidden');
        btnSpinner.classList.remove('hidden');
        predictBtn.disabled = true;

        // Simulated AI inference latency
        await new Promise(resolve => setTimeout(resolve, 900));

        let res = evaluatePredictionLogic(temp, stress, materialKey, thickness);

        if (isBackendApi) {
            showToast('API Mode: Simulated REST call to Python Flask/FastAPI backend ML model.', 'info');
        }

        state.currentResult = res;

        // Restore Button
        btnText.classList.remove('hidden');
        btnSpinner.classList.add('hidden');
        predictBtn.disabled = false;

        // Render Dashboard
        renderResultsDashboard(res);
        showToast('Prediction calculation completed successfully!', 'success');

        // Display Dashboard & Scroll
        dashboardSection.classList.remove('hidden');
        dashboardSection.scrollIntoView({ behavior: 'smooth' });
    }

    // --- Render Results & Gauges ---
    function renderResultsDashboard(res) {
        // KPI Status Cards
        resProcessName.textContent = res.process;
        resProcessAcronym.textContent = res.acronym;

        resDistortionStatus.textContent = res.distortionStatus;
        resDistortionSubtext.textContent = `${res.riskLevel} Assessment`;

        resRiskLevel.textContent = res.riskLevel;
        resRiskBar.style.width = `${res.riskScore}%`;

        resConfidenceVal.textContent = `${res.confidence}%`;
        resConfidenceBar.style.width = `${res.confidence}%`;

        // Update Risk Indicator Styling
        if (res.riskLevel === 'High Risk') {
            resDistortionStatus.className = 'kpi-main-val text-red';
            resDistortionIcon.className = 'fa-solid fa-triangle-exclamation text-red';
            resRiskLevel.className = 'kpi-main-val text-red';
            resRiskBar.className = 'progress-fill fill-danger';
        } else if (res.riskLevel === 'Moderate Risk') {
            resDistortionStatus.className = 'kpi-main-val text-amber';
            resDistortionIcon.className = 'fa-solid fa-triangle-exclamation text-amber';
            resRiskLevel.className = 'kpi-main-val text-amber';
            resRiskBar.className = 'progress-fill fill-warning';
        } else {
            resDistortionStatus.className = 'kpi-main-val text-green';
            resDistortionIcon.className = 'fa-solid fa-circle-check text-green';
            resRiskLevel.className = 'kpi-main-val text-green';
            resRiskBar.className = 'progress-fill fill-success';
        }

        // Gauges Footer Text
        gaugeTempVal.textContent = `${res.temp} °C`;
        gaugeStressVal.textContent = `${res.stress} MPa`;
        gaugeRiskVal.textContent = `${res.riskScore} / 100 Risk Score`;

        // Actionable Recommendations List
        recListContainer.innerHTML = res.recommendationsList.map(rec => `
            <li><i class="fa-solid fa-circle-check text-cyan"></i> <span>${rec}</span></li>
        `).join('');

        recPreheat.textContent = res.preheatText;
        recHeatInput.textContent = res.heatInputText;
        recPwht.textContent = res.pwhtText;
        recClamping.textContent = res.clampingText;
        recCooling.textContent = res.coolingText;
        recStressMonitoring.textContent = res.stressMonText;

        // Render Chart.js Visualizations
        renderAllCharts(res);
    }

    // --- Chart.js Gauges & Charts ---
    function renderAllCharts(res) {
        // 1. Temperature Half Gauge Chart
        const ctxTemp = document.getElementById('tempGaugeChart').getContext('2d');
        if (state.charts.tempGauge) state.charts.tempGauge.destroy();

        const tempScore = Math.min((res.temp / 1500) * 100, 100);
        state.charts.tempGauge = new Chart(ctxTemp, {
            type: 'doughnut',
            data: {
                datasets: [{
                    data: [tempScore, 100 - tempScore],
                    backgroundColor: ['#f59e0b', 'rgba(255, 255, 255, 0.08)'],
                    borderWidth: 0
                }]
            },
            options: {
                rotation: -90,
                circumference: 180,
                cutout: '75%',
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false }, tooltip: { enabled: false } }
            }
        });

        // 2. FEA Stress Half Gauge Chart
        const ctxStress = document.getElementById('stressGaugeChart').getContext('2d');
        if (state.charts.stressGauge) state.charts.stressGauge.destroy();

        const stressScore = Math.min((res.stress / 600) * 100, 100);
        state.charts.stressGauge = new Chart(ctxStress, {
            type: 'doughnut',
            data: {
                datasets: [{
                    data: [stressScore, 100 - stressScore],
                    backgroundColor: ['#00f2fe', 'rgba(255, 255, 255, 0.08)'],
                    borderWidth: 0
                }]
            },
            options: {
                rotation: -90,
                circumference: 180,
                cutout: '75%',
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false }, tooltip: { enabled: false } }
            }
        });

        // 3. Distortion Risk Meter Gauge Chart
        const ctxRisk = document.getElementById('riskGaugeChart').getContext('2d');
        if (state.charts.riskGauge) state.charts.riskGauge.destroy();

        const riskColor = res.riskLevel === 'High Risk' ? '#ef4444' : (res.riskLevel === 'Moderate Risk' ? '#f59e0b' : '#10b981');
        state.charts.riskGauge = new Chart(ctxRisk, {
            type: 'doughnut',
            data: {
                datasets: [{
                    data: [res.riskScore, 100 - res.riskScore],
                    backgroundColor: [riskColor, 'rgba(255, 255, 255, 0.08)'],
                    borderWidth: 0
                }]
            },
            options: {
                rotation: -90,
                circumference: 180,
                cutout: '75%',
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false }, tooltip: { enabled: false } }
            }
        });

        // 4. Bar Chart: FEA Stress vs Yield & Tensile Capacity
        const ctxBar = document.getElementById('barChart').getContext('2d');
        if (state.charts.bar) state.charts.bar.destroy();

        state.charts.bar = new Chart(ctxBar, {
            type: 'bar',
            data: {
                labels: ['Applied FEA Stress', 'Material Yield Limit', 'Tensile Strength'],
                datasets: [{
                    label: 'Stress Value (MPa)',
                    data: [res.stress, res.materialObj.yieldStress, res.materialObj.tensile],
                    backgroundColor: [
                        res.stress > res.materialObj.yieldStress ? 'rgba(239, 68, 68, 0.85)' : 'rgba(0, 242, 254, 0.85)',
                        'rgba(245, 158, 11, 0.85)',
                        'rgba(59, 130, 246, 0.85)'
                    ],
                    borderRadius: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    y: { beginAtZero: true, grid: { color: 'rgba(255, 255, 255, 0.08)' }, ticks: { color: '#94a3b8' } },
                    x: { grid: { display: false }, ticks: { color: '#94a3b8' } }
                }
            }
        });

        // 5. Pie Chart: Distortion Risk Factors Breakdown
        const ctxPie = document.getElementById('pieChart').getContext('2d');
        if (state.charts.pie) state.charts.pie.destroy();

        state.charts.pie = new Chart(ctxPie, {
            type: 'pie',
            data: {
                labels: ['Thermal Expansion Stress', 'FEA Residual Stress', 'Material Yield Strain', 'Clamping Resistance'],
                datasets: [{
                    data: [res.temp * 0.3, res.stress * 0.4, res.materialObj.yieldStress * 0.2, 50],
                    backgroundColor: ['#f59e0b', '#ef4444', '#00f2fe', '#a855f7'],
                    borderWidth: 2,
                    borderColor: '#070d1e'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'right', labels: { color: '#f8fafc', font: { size: 11 } } }
                }
            }
        });
    }

    // --- PDF Report Generator (jsPDF) ---
    function generatePdfReport() {
        if (!state.currentResult) {
            showToast('No prediction results available to generate PDF.', 'error');
            return;
        }

        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        const res = state.currentResult;

        // Header Background Banner
        doc.setFillColor(7, 13, 30);
        doc.rect(0, 0, 210, 42, 'F');

        doc.setTextColor(0, 242, 254);
        doc.setFontSize(18);
        doc.setFont('helvetica', 'bold');
        doc.text("WELD-AI Pressure Vessel Engineering Report", 14, 22);

        doc.setTextColor(255, 255, 255);
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.text(`Generated: ${res.timestamp} | ASME BPVC Section VIII Standard`, 14, 32);

        // Section 1: User Inputs Table
        doc.setTextColor(15, 23, 42);
        doc.setFontSize(13);
        doc.setFont('helvetica', 'bold');
        doc.text("1. Input Welding & Structural Parameters", 14, 52);

        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.text(`Welding Temperature: ${res.temp} °C`, 14, 62);
        doc.text(`FEA Peak Von Mises Stress: ${res.stress} MPa`, 14, 70);
        doc.text(`Material Grade: ${res.materialObj.name}`, 14, 78);
        doc.text(`Vessel Wall Thickness: ${res.thickness} mm`, 14, 86);

        // Section 2: Recommended Output
        doc.setFontSize(13);
        doc.setFont('helvetica', 'bold');
        doc.text("2. AI Prediction & Distortion Assessment", 14, 102);

        doc.setFontSize(11);
        doc.setTextColor(2, 132, 199);
        doc.text(`Recommended Welding Process: ${res.process} (${res.acronym})`, 14, 112);

        doc.setTextColor(res.riskLevel === 'High Risk' ? 220 : 15, 38, 38);
        doc.text(`Distortion Monitoring Status: ${res.distortionStatus} (${res.riskLevel})`, 14, 120);

        doc.setTextColor(15, 23, 42);
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.text(`Prediction Confidence Score: ${res.confidence}%`, 14, 128);
        doc.text(`Distortion Risk Meter: ${res.riskScore} / 100`, 14, 136);

        // Section 3: Engineering Recommendations
        doc.setFontSize(13);
        doc.setFont('helvetica', 'bold');
        doc.text("3. Engineering Recommendations & Mitigation Controls", 14, 152);

        doc.setFontSize(9.5);
        doc.setFont('helvetica', 'normal');
        let yPos = 162;
        res.recommendationsList.forEach((item, idx) => {
            doc.text(`${idx + 1}. ${item}`, 14, yPos);
            yPos += 7;
        });

        yPos += 5;
        doc.setFont('helvetica', 'bold');
        doc.text("Thermal & Fixturing Specifications:", 14, yPos);
        yPos += 6;
        doc.setFont('helvetica', 'normal');
        doc.text(`- Preheat Requirement: ${res.preheatText}`, 16, yPos); yPos += 6;
        doc.text(`- Heat Input Control: ${res.heatInputText}`, 16, yPos); yPos += 6;
        doc.text(`- PWHT Guidance: ${res.pwhtText}`, 16, yPos); yPos += 6;
        doc.text(`- Clamping Strategy: ${res.clampingText}`, 16, yPos);

        // Save PDF
        doc.save(`Welding_Prediction_Report_${Date.now()}.pdf`);
        showToast('PDF Technical Report downloaded successfully!', 'success');
    }

    // --- History Log Storage & CSV Exporter ---
    function saveCurrentPredictionToHistory() {
        if (!state.currentResult) return;

        state.predictionHistory.unshift(state.currentResult);
        if (state.predictionHistory.length > 25) state.predictionHistory.pop();

        localStorage.setItem('weld_ai_pv_history', JSON.stringify(state.predictionHistory));
        renderHistoryTable();
        showToast('Prediction calculation saved to local history log.', 'success');
    }

    function loadHistoryFromStorage() {
        const saved = localStorage.getItem('weld_ai_pv_history');
        if (saved) {
            try {
                state.predictionHistory = JSON.parse(saved);
            } catch (e) {
                state.predictionHistory = [];
            }
        }
        renderHistoryTable();
    }

    function renderHistoryTable() {
        const query = historySearch.value.toLowerCase();
        const filterRisk = historyFilter.value;

        const filtered = state.predictionHistory.filter(item => {
            const matchesQuery = item.process.toLowerCase().includes(query) ||
                                 item.distortionStatus.toLowerCase().includes(query) ||
                                 item.timestamp.toLowerCase().includes(query);
            const matchesFilter = filterRisk === 'all' || item.riskLevel.includes(filterRisk);
            return matchesQuery && matchesFilter;
        });

        if (filtered.length === 0) {
            emptyHistoryMsg.classList.remove('hidden');
            historyTableBody.innerHTML = '';
            return;
        }

        emptyHistoryMsg.classList.add('hidden');
        historyTableBody.innerHTML = filtered.map((item, idx) => `
            <tr>
                <td>${item.timestamp}</td>
                <td><strong>${item.temp} °C</strong></td>
                <td>${item.stress} MPa</td>
                <td><span class="text-cyan font-semibold">${item.process}</span></td>
                <td><span class="badge ${item.riskLevel === 'High Risk' ? 'badge-danger' : (item.riskLevel === 'Moderate Risk' ? 'badge-warning' : 'badge-success')}">${item.distortionStatus}</span></td>
                <td>${item.riskLevel} (${item.riskScore})</td>
                <td>${item.confidence}%</td>
                <td>
                    <button class="btn-action reload-btn" data-idx="${idx}" title="Reload Parameters"><i class="fa-solid fa-rotate-left"></i></button>
                    <button class="btn-action delete delete-btn" data-idx="${idx}" title="Delete Record"><i class="fa-solid fa-trash-can"></i></button>
                </td>
            </tr>
        `).join('');

        // Attach Handlers
        historyTableBody.querySelectorAll('.reload-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const item = state.predictionHistory[btn.dataset.idx];
                loadPreset({ temp: item.temp, stress: item.stress, material: item.materialKey, thickness: item.thickness });
                showToast('Re-loaded history parameters into prediction form.', 'info');
            });
        });

        historyTableBody.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                state.predictionHistory.splice(btn.dataset.idx, 1);
                localStorage.setItem('weld_ai_pv_history', JSON.stringify(state.predictionHistory));
                renderHistoryTable();
                showToast('Removed entry from prediction history.', 'info');
            });
        });
    }

    function exportHistoryToCSV() {
        if (state.predictionHistory.length === 0) {
            showToast('No history available to export.', 'warning');
            return;
        }

        const headers = ["Timestamp", "Temperature_C", "FEA_Stress_MPa", "Process", "Distortion_Status", "Risk_Level", "Confidence_Pct"];
        const rows = state.predictionHistory.map(item => [
            `"${item.timestamp}"`,
            item.temp,
            item.stress,
            `"${item.process}"`,
            `"${item.distortionStatus}"`,
            `"${item.riskLevel}"`,
            item.confidence
        ]);

        const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `Prediction_History_${Date.now()}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        showToast('Exported history log to CSV file.', 'success');
    }

    function clearHistory() {
        if (confirm('Are you sure you want to clear all history records?')) {
            state.predictionHistory = [];
            localStorage.removeItem('weld_ai_pv_history');
            renderHistoryTable();
            showToast('History log cleared.', 'info');
        }
    }

    // --- Contact Form ---
    function handleContactSubmit(e) {
        e.preventDefault();
        showToast('Inquiry submitted! Our engineering team will respond shortly.', 'success');
        contactForm.reset();
    }

    // --- Toast Notifications ---
    function showToast(message, type = 'info') {
        const container = document.getElementById('toast-container');
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;

        let icon = 'fa-circle-info text-cyan';
        if (type === 'success') icon = 'fa-circle-check text-green';
        if (type === 'warning') icon = 'fa-triangle-exclamation text-amber';
        if (type === 'error') icon = 'fa-circle-xmark text-red';

        toast.innerHTML = `<i class="fa-solid ${icon}"></i> <span>${message}</span>`;
        container.appendChild(toast);

        setTimeout(() => {
            toast.style.animation = 'toastIn 0.3s reverse forwards';
            setTimeout(() => toast.remove(), 300);
        }, 3500);
    }

    init();
});
