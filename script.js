/* ==========================================================================
   Pressure Vessel Welding Process Prediction System - Industrial Style
   ========================================================================== */

:root {
    --bg-primary: #070d1e;
    --bg-secondary: #0f172a;
    --bg-card: rgba(15, 23, 42, 0.85);
    --bg-glass: rgba(17, 28, 54, 0.7);
    --border-glass: rgba(0, 242, 254, 0.2);
    --border-light: rgba(255, 255, 255, 0.08);
    --text-primary: #f8fafc;
    --text-secondary: #94a3b8;
    --text-muted: #64748b;
    --cyan: #00f2fe;
    --cyan-glow: rgba(0, 242, 254, 0.35);
    --green: #10b981;
    --amber: #f59e0b;
    --red: #ef4444;
    --purple: #a855f7;
    --font-main: 'Outfit', sans-serif;
    --font-mono: 'JetBrains Mono', monospace;
    --radius-sm: 6px;
    --radius-md: 12px;
    --radius-lg: 18px;
    --shadow-lg: 0 10px 30px -5px rgba(0, 0, 0, 0.6), 0 0 20px rgba(0, 242, 254, 0.15);
    --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

[data-theme="light"] {
    --bg-primary: #f1f5f9;
    --bg-secondary: #e2e8f0;
    --bg-card: rgba(255, 255, 255, 0.92);
    --bg-glass: rgba(255, 255, 255, 0.88);
    --border-glass: rgba(2, 132, 199, 0.25);
    --border-light: rgba(0, 0, 0, 0.08);
    --text-primary: #0f172a;
    --text-secondary: #334155;
    --text-muted: #64748b;
    --cyan: #0284c7;
    --cyan-glow: rgba(2, 132, 199, 0.2);
    --shadow-lg: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html {
    scroll-behavior: smooth;
}

body {
    font-family: var(--font-main);
    background-color: var(--bg-primary);
    color: var(--text-primary);
    line-height: 1.6;
    overflow-x: hidden;
    transition: background-color 0.4s ease, color 0.4s ease;
    padding: 0 20px 20px;
}

.container {
    max-width: 1400px;
    margin: 0 auto;
}

.section {
    padding: 3rem 0;
}

.section-hidden {
    display: none !important;
}

/* Grid System */
.grid {
    display: grid;
    gap: 1.5rem;
}

.grid-2 {
    grid-template-columns: repeat(2, 1fr);
}

.grid-3 {
    grid-template-columns: repeat(3, 1fr);
}

.grid-4 {
    grid-template-columns: repeat(4, 1fr);
}

/* Flex Utilities */
.flex {
    display: flex;
}

.flex-between {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.flex-center {
    display: flex;
    justify-content: center;
    align-items: center;
}

.gap-sm {
    gap: 1rem;
}

.gap-md {
    gap: 1.5rem;
}

.mt-sm {
    margin-top: 1rem;
}

.mt-md {
    margin-top: 1.5rem;
}

.mt-lg {
    margin-top: 2rem;
}

.text-center {
    text-align: center;
}

.text-cyan {
    color: var(--cyan);
}

.text-green {
    color: var(--green);
}

.text-amber {
    color: var(--amber);
}

.text-red {
    color: var(--red);
}

.text-muted {
    color: var(--text-muted);
}

.hidden {
    display: none !important;
}

/* Glass Cards */
.glass-panel {
    background: var(--bg-glass);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid var(--border-glass);
    border-radius: var(--radius-md);
    padding: 1.75rem;
    transition: var(--transition);
}

.glass-panel:hover {
    box-shadow: var(--shadow-lg);
    border-color: rgba(0, 242, 254, 0.35);
}

/* Header */
.header {
    position: sticky;
    top: 0;
    z-index: 1000;
    background: rgba(7, 13, 30, 0.92);
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
    border-bottom: 1px solid var(--border-light);
    padding: 0.75rem 0;
}

[data-theme="light"] .header {
    background: rgba(241, 245, 249, 0.92);
}

.nav-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;
}

.logo {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    text-decoration: none;
    color: var(--text-primary);
}

.logo-icon {
    width: 40px;
    height: 40px;
    background: linear-gradient(135deg, #00f2fe, #2563eb);
    border-radius: var(--radius-sm);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    color: #070d1e;
    box-shadow: 0 0 12px rgba(0, 242, 254, 0.4);
}

.brand-title {
    font-weight: 800;
    font-size: 1.2rem;
}

.brand-title .highlight {
    color: var(--cyan);
}

.brand-subtitle {
    font-size: 0.68rem;
    color: var(--text-muted);
}

.nav-links {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
}

.nav-link {
    background: none;
    border: none;
    color: var(--text-secondary);
    font-weight: 500;
    font-size: 0.9rem;
    padding: 0.5rem 1rem;
    border-radius: var(--radius-sm);
    cursor: pointer;
    transition: var(--transition);
    font-family: var(--font-main);
    display: flex;
    align-items: center;
    gap: 0.4rem;
}

.nav-link:hover,
.nav-link.active {
    color: var(--cyan);
    background: rgba(0, 242, 254, 0.08);
}

.theme-toggle {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid var(--border-light);
    color: var(--text-primary);
    width: 38px;
    height: 38px;
    border-radius: 50%;
    cursor: pointer;
    font-size: 1rem;
    transition: var(--transition);
}

.theme-toggle:hover {
    background: var(--cyan);
    color: #070d1e;
}

/* Buttons */
.btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.7rem 1.4rem;
    border-radius: var(--radius-sm);
    font-weight: 600;
    font-size: 0.9rem;
    cursor: pointer;
    border: none;
    transition: var(--transition);
    font-family: var(--font-main);
}

.btn-primary {
    background: linear-gradient(135deg, #00f2fe, #2563eb);
    color: #070d1e;
    box-shadow: 0 4px 15px rgba(0, 242, 254, 0.3);
}

.btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 242, 254, 0.5);
}

.btn-secondary {
    background: var(--bg-secondary);
    color: var(--text-primary);
    border: 1px solid var(--border-glass);
}

.btn-secondary:hover {
    background: var(--border-glass);
    border-color: var(--cyan);
}

.btn-success {
    background: var(--green);
    color: #070d1e;
}

.btn-success:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(16, 185, 129, 0.4);
}

.btn-danger {
    background: var(--red);
    color: white;
}

.btn-danger:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(239, 68, 68, 0.4);
}

.btn-sm {
    padding: 0.4rem 0.9rem;
    font-size: 0.8rem;
}

/* Form Controls */
.form-group {
    margin-bottom: 1rem;
}

.form-label {
    display: block;
    font-weight: 600;
    font-size: 0.85rem;
    color: var(--text-secondary);
    margin-bottom: 0.25rem;
}

.form-control {
    width: 100%;
    padding: 0.6rem 0.9rem;
    background: rgba(7, 13, 30, 0.6);
    border: 1px solid var(--border-light);
    border-radius: var(--radius-sm);
    color: var(--text-primary);
    font-size: 0.9rem;
    transition: var(--transition);
    font-family: var(--font-main);
}

[data-theme="light"] .form-control {
    background: #ffffff;
}

.form-control:focus {
    outline: none;
    border-color: var(--cyan);
    box-shadow: 0 0 10px var(--cyan-glow);
}

select.form-control {
    appearance: none;
    -webkit-appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%2394a3b8' d='M6 8L1 3h10z'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 0.9rem center;
    padding-right: 2.5rem;
}

/* Badges */
.badge {
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    padding: 0.2rem 0.6rem;
    border-radius: var(--radius-sm);
    font-size: 0.7rem;
    font-weight: 600;
}

.badge-success {
    background: rgba(16, 185, 129, 0.15);
    color: var(--green);
    border: 1px solid var(--green);
}

.badge-warning {
    background: rgba(245, 158, 11, 0.15);
    color: var(--amber);
    border: 1px solid var(--amber);
}

.badge-danger {
    background: rgba(239, 68, 68, 0.15);
    color: var(--red);
    border: 1px solid var(--red);
}

.badge-cyan {
    background: rgba(0, 242, 254, 0.15);
    color: var(--cyan);
    border: 1px solid var(--cyan);
}

/* Progress Bar */
.progress-bar {
    width: 100%;
    height: 6px;
    background: rgba(255, 255, 255, 0.08);
    border-radius: 4px;
    overflow: hidden;
}

.progress-fill {
    height: 100%;
    border-radius: 4px;
    transition: width 0.5s ease;
}

.fill-cyan {
    background: var(--cyan);
    box-shadow: 0 0 10px var(--cyan);
}

.fill-green {
    background: var(--green);
    box-shadow: 0 0 10px var(--green);
}

.fill-amber {
    background: var(--amber);
    box-shadow: 0 0 10px var(--amber);
}

.fill-red {
    background: var(--red);
    box-shadow: 0 0 10px var(--red);
}

/* Chart Container */
.chart-container {
    position: relative;
    height: 200px;
    width: 100%;
}

/* Results */
.result-row {
    display: flex;
    justify-content: space-between;
    padding: 0.4rem 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.04);
    font-size: 0.9rem;
}

.result-row:last-child {
    border: none;
}

.result-label {
    color: var(--text-secondary);
}

.result-value {
    font-weight: 600;
    font-family: var(--font-mono);
}

/* History Table */
.table-wrap {
    overflow-x: auto;
}

table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.85rem;
}

th {
    text-align: left;
    padding: 0.6rem 0.8rem;
    color: var(--text-secondary);
    border-bottom: 1px solid #282f5a;
    font-weight: 600;
    font-size: 0.7rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

td {
    padding: 0.6rem 0.8rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.04);
    font-family: var(--font-mono);
    font-size: 0.8rem;
}

tbody tr:hover {
    background: rgba(0, 242, 254, 0.03);
}

/* ML Training Status */
.ml-status {
    background: rgba(0, 242, 254, 0.05);
    border: 1px solid var(--border-glass);
    border-radius: var(--radius-sm);
    padding: 1rem;
    margin-top: 1rem;
}

.ml-status .epoch-bar {
    display: flex;
    gap: 2px;
    margin: 0.5rem 0;
    flex-wrap: wrap;
}

.ml-status .epoch-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.1);
    transition: background 0.3s ease;
}

.ml-status .epoch-dot.active {
    background: var(--cyan);
    box-shadow: 0 0 8px var(--cyan);
}

.ml-status .epoch-dot.done {
    background: var(--green);
}

/* KPI Cards */
.kpi-card {
    background: rgba(255, 255, 255, 0.03);
    border-radius: var(--radius-sm);
    padding: 1rem;
    text-align: center;
    border: 1px solid var(--border-light);
}

.kpi-value {
    font-size: 1.5rem;
    font-weight: 700;
    font-family: var(--font-mono);
}

.kpi-label {
    font-size: 0.7rem;
    color: var(--text-muted);
    margin-top: 0.2rem;
}

/* Toast Notifications */
.toast-container {
    position: fixed;
    bottom: 1.5rem;
    right: 1.5rem;
    z-index: 2000;
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
}

.toast {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.8rem 1.2rem;
    background: var(--bg-card);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid var(--border-glass);
    border-radius: var(--radius-sm);
    box-shadow: var(--shadow-lg);
    color: var(--text-primary);
    font-size: 0.85rem;
    min-width: 280px;
    animation: toastIn 0.3s ease forwards;
}

.toast-success {
    border-left: 4px solid var(--green);
}

.toast-warning {
    border-left: 4px solid var(--amber);
}

.toast-error {
    border-left: 4px solid var(--red);
}

.toast-info {
    border-left: 4px solid var(--cyan);
}

@keyframes toastIn {
    from {
        transform: translateX(100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

/* Responsive */
@media (max-width: 1024px) {
    .grid-4 {
        grid-template-columns: repeat(2, 1fr);
    }
    .grid-3 {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (max-width: 768px) {
    .grid-2,
    .grid-3,
    .grid-4 {
        grid-template-columns: 1fr;
    }

    .nav-container {
        flex-direction: column;
        align-items: stretch;
    }

    .nav-links {
        justify-content: center;
    }

    .section {
        padding: 1.5rem 0;
    }

    body {
        padding: 0 10px 10px;
    }

    .toast {
        min-width: unset;
        width: calc(100vw - 40px);
    }
}
