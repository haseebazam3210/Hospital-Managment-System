@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Manrope:wght@400;500;600;700;800&display=swap');

:root {
  --bg: #f5f7fc;
  --panel: #ffffff;
  --line: #ebeff6;
  --ink: #1d2b45;
  --muted: #7b8598;
  --blue: #5b6ff6;
  --blue-soft: #eff4ff;
  --green: #3bb07c;
  --green-soft: #ebfaf3;
  --purple: #8c6df4;
  --purple-soft: #f3eeff;
  --orange: #f3a55c;
  --orange-soft: #fff2de;
  --red: #e16465;
  --red-soft: #fff0f0;
}

* { box-sizing: border-box; }
html, body, #root { min-height: 100%; }
body {
  margin: 0;
  font-family: 'DM Sans', sans-serif;
  background: radial-gradient(circle at top left, rgba(92, 112, 255, 0.18), transparent 32%), radial-gradient(circle at bottom right, rgba(72, 208, 170, 0.12), transparent 30%), var(--bg);
  color: var(--ink);
}

a { text-decoration: none; color: inherit; }
button, input, select, textarea { font: inherit; }
button { cursor: pointer; }

.app-shell { display: flex; min-height: 100vh; }

.sidebar {
  width: 250px; background: rgba(255,255,255,0.8); border-right: 1px solid var(--line); backdrop-filter: blur(12px);
  padding: 22px 14px 18px; display: flex; flex-direction: column; position: sticky; top: 0; height: 100vh; z-index: 20;
}
.brand { display: flex; align-items: center; gap: 11px; font: 800 22px 'Manrope'; letter-spacing: -0.7px; margin: 4px 8px 8px; }
.brand-dot { color: var(--blue); }
.brand-icon { width: 36px; height: 36px; border-radius: 11px; display: grid; place-items: center; background: linear-gradient(135deg, var(--blue-soft), #e7ebff); color: var(--blue); }

.workspace-wrap {
  display: flex; align-items: center; gap: 10px; margin: 30px 8px 18px; padding: 11px 10px; border: 1px solid var(--line);
  border-radius: 12px; background: rgba(255,255,255,0.9); box-shadow: 0 10px 30px rgba(38, 73, 124, 0.04);
}
.workspace-badge {
  width: 34px; height: 34px; border-radius: 10px; display: grid; place-items: center; font-weight: 700; color: #2cb68c; background: #ebfaf3;
}
.workspace-wrap strong, .workspace-wrap small { display: block; }
.workspace-wrap strong { font-size: 12px; }
.workspace-wrap small { font-size: 9px; color: var(--muted); margin-top: 2px; }

.nav-list { display: flex; flex-direction: column; gap: 4px; margin-top: 8px; }
.nav-item {
  display: flex; align-items: center; gap: 10px; padding: 9px 12px; border-radius: 10px; color: #70809b; font-size: 12px; font-weight: 600; transition: all 0.2s ease;
}
.nav-item:hover { background: #f7f9ff; color: #36466a; }
.nav-item.active { background: linear-gradient(135deg, #ecf1ff, #f3f7ff); color: var(--blue); box-shadow: inset 0 0 0 1px #e5ebff; }
.nav-tag {
  margin-left: auto; min-width: 18px; height: 18px; display: grid; place-items: center; border-radius: 999px; font-size: 9px; background: #ecf1ff; color: var(--blue);
}

.sidebar-footer { margin-top: auto; }
.feature-callout { display: flex; gap: 10px; padding: 12px 10px; border: 1px solid var(--line); border-radius: 12px; background: linear-gradient(135deg, #f3f6ff, #fafbff); }
.callout-icon { width: 28px; height: 28px; display: grid; place-items: center; border-radius: 8px; background: #fff; color: var(--blue); }
.callout-icon.success { background: #ebfaf3; color: var(--green); }
.feature-callout strong, .feature-callout p { display: block; }
.feature-callout strong { font-size: 11px; }
.feature-callout p { margin: 4px 0 0; color: var(--muted); font-size: 9px; line-height: 1.5; }

.profile-card {
  width: 100%; display: flex; align-items: center; gap: 10px; padding: 12px 8px 0; margin-top: 12px; border: 0; background: transparent; border-top: 1px solid var(--line); text-align: left; color: var(--ink);
}
.user-badge {
  width: 30px; height: 30px; border-radius: 50%; display: grid; place-items: center; font-size: 12px; font-weight: 700; background: #eef1ff; color: var(--blue);
}
.user-badge.large { width: 42px; height: 42px; font-size: 16px; }
.user-badge.accent { background: #ebfaf3; color: var(--green); }
.user-badge.small { width: 26px; height: 26px; font-size: 10px; }
.profile-meta { flex: 1; }
.profile-meta strong, .profile-meta small { display: block; }
.profile-meta strong { font-size: 11px; }
.profile-meta small { margin-top: 2px; font-size: 9px; color: var(--muted); }

.main-panel { flex: 1; min-width: 0; }
.topbar {
  height: 68px; display: flex; align-items: center; justify-content: space-between; padding: 0 30px; border-bottom: 1px solid var(--line); background: rgba(255,255,255,0.7); backdrop-filter: blur(10px); position: sticky; top: 0; z-index: 15;
}
.crumbs { font-size: 11px; color: var(--muted); }
.crumbs span { margin: 0 8px; color: #c3cbe0; }
.crumbs strong { color: var(--ink); font-weight: 600; }
.top-actions { display: flex; align-items: center; gap: 14px; }
.day-pill {
  display: inline-flex; align-items: center; gap: 8px; background: var(--panel); border: 1px solid var(--line); border-radius: 7px; padding: 8px 10px; font-size: 10px; color: #66738a;
}
.live-dot { display: inline-block; width: 7px; height: 7px; border-radius: 50%; background: #38b57d; }
.icon-btn { width: 32px; height: 32px; display: grid; place-items: center; border-radius: 9px; background: transparent; border: 1px solid transparent; color: #6f7d98; }
.icon-btn:hover { background: var(--blue-soft); border-color: var(--line); }
.top-user { display: flex; align-items: center; gap: 6px; background: var(--panel); border: 1px solid var(--line); border-radius: 9px; padding: 5px 8px 5px 5px; }

.content-wrap { padding: 30px; }
.page-shell { display: flex; flex-direction: column; gap: 18px; }
.page-head { display: flex; align-items: center; justify-content: space-between; gap: 18px; }
.page-head h1 { margin: 8px 0 4px; font-size: 30px; letter-spacing: -0.8px; font-family: 'Manrope'; }
.page-head h1 em { color: var(--blue); font-style: normal; }
.page-head p { margin: 0; color: var(--muted); font-size: 12px; }
.eyebrow { font-size: 9px; letter-spacing: 1.1px; text-transform: uppercase; color: #96a0b6; font-weight: 700; }
.eyebrow.light { color: #dfe8ff; }

.primary, .secondary, .ghost-btn {
  border: 0; border-radius: 9px; padding: 10px 14px; font-size: 11px; font-weight: 700; display: inline-flex; align-items: center; gap: 7px; transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.primary { background: linear-gradient(135deg, var(--blue), #435fe9); color: white; box-shadow: 0 10px 22px rgba(91, 111, 246, 0.25); }
.primary:hover, .secondary:hover, .ghost-btn:hover { transform: translateY(-1px); }
.secondary { background: #fff; border: 1px solid var(--line); color: #42506a; }
.ghost-btn { background: #fff; border: 1px solid var(--line); color: #5f6b80; }
.wide { width: 100%; justify-content: center; }

.stat-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 15px; }
.small-grid { grid-template-columns: repeat(4, minmax(0, 1fr)); }
.stat-card {
  padding: 16px 15px; background: rgba(255,255,255,0.9); border: 1px solid var(--line); border-radius: 12px; box-shadow: 0 10px 28px rgba(28, 41, 64, 0.03);
}
.stat-icon { width: 32px; height: 32px; border-radius: 10px; display: grid; place-items: center; margin-bottom: 14px; }
.stat-icon.blue { background: var(--blue-soft); color: var(--blue); }
.stat-icon.green { background: var(--green-soft); color: var(--green); }
.stat-icon.purple { background: var(--purple-soft); color: var(--purple); }
.stat-icon.orange { background: var(--orange-soft); color: var(--orange); }
.stat-card span { display: block; font-size: 10px; color: var(--muted); }
.stat-value { font-family: 'Manrope'; font-size: 26px; font-weight: 800; letter-spacing: -0.8px; margin: 8px 0 4px; }
.stat-card small { color: #96a0b7; font-size: 9px; }

.main-grid { display: grid; grid-template-columns: 1.8fr 1fr; gap: 15px; }
.panel { background: rgba(255,255,255,0.9); border: 1px solid var(--line); border-radius: 14px; padding: 16px 18px; box-shadow: 0 10px 28px rgba(19, 30, 52, 0.02); }
.panel-head { display: flex; align-items: flex-start; justify-content: space-between; gap: 10px; }
.panel-head h3 { margin: 0 0 4px; font-size: 14px; font-family: 'Manrope'; }
.panel-head p { margin: 0; color: var(--muted); font-size: 10px; }
.chart-meta { margin-top: 18px; display: flex; align-items: center; gap: 8px; font-size: 10px; color: var(--muted); }
.chart-meta strong { color: var(--ink); font-size: 14px; font-weight: 700; margin-left: auto; }
.positive { color: var(--green); background: var(--green-soft); padding: 4px 6px; border-radius: 5px; }
.dot { width: 7px; height: 7px; display: inline-block; border-radius: 50%; }
.dot.blue { background: var(--blue); }
.dot.green { background: var(--green); }
.chart-box { height: 210px; margin-top: 12px; }
.small-box { height: 180px; }
.pie-box { height: 170px; }
.summary-total { display: flex; align-items: flex-end; gap: 10px; margin: 24px 0 18px; }
.summary-total strong { font-size: 38px; font-family: 'Manrope'; letter-spacing: -1px; }
.summary-total span { font-size: 10px; color: var(--muted); line-height: 1.5; }
.progress-stack { display: flex; flex-direction: column; gap: 7px; }
.progress-stack i { display: block; height: 7px; border-radius: 999px; background: linear-gradient(90deg, var(--blue), #96a4ff); }
.progress-stack i:nth-child(2) { background: linear-gradient(90deg, var(--green), #7ce0b7); }
.progress-stack i:nth-child(3) { background: linear-gradient(90deg, #dfe9ff, #b8c4ff); }
.legend-row { margin-top: 12px; display: flex; gap: 16px; font-size: 9px; color: var(--muted); }
.legend-row span { display: inline-flex; align-items: center; gap: 6px; }
.summary-footer { margin-top: 22px; border-top: 1px solid var(--line); padding-top: 16px; display: flex; align-items: center; gap: 10px; }
.summary-footer>div:nth-child(2) { flex: 1; }
.summary-footer strong, .summary-footer small { display: block; }
.summary-footer strong { font-size: 10px; color: var(--ink); }
.summary-footer small { margin-top: 4px; font-size: 8px; color: var(--muted); }
.text-link { color: var(--blue); font-size: 10px; font-weight: 700; display: inline-flex; align-items: center; gap: 6px; }
.table-wrap { overflow-x: auto; }
table { width: 100%; border-collapse: collapse; min-width: 600px; }
th { padding: 12px 10px; text-align: left; font-size: 8px; letter-spacing: 1px; color: #92a0b6; border-bottom: 1px solid var(--line); }
td { padding: 12px 10px; border-bottom: 1px solid var(--line); color: #4f5d79; font-size: 10px; }
tr:last-child td { border-bottom: none; }

.person-cell { display: flex; align-items: center; gap: 10px; }
.person-avatar { width: 28px; height: 28px; display: grid; place-items: center; border-radius: 50%; font-weight: 700; font-size: 10px; background: #eef1ff; color: var(--blue); }
.tone-0 { background: #eef1ff; color: var(--blue); }
.tone-1 { background: #e9fbf3; color: #2ca87f; }
.tone-2 { background: #fff1e7; color: #d78c45; }
.tone-3 { background: #fdeef3; color: #d7638d; }
.person-cell strong, .person-cell small { display: block; }
.person-cell strong { color: var(--ink); }
.person-cell small { margin-top: 3px; color: var(--muted); }
.muted { color: var(--muted); }
.row-actions { display: flex; justify-content: flex-end; gap: 5px; }
.row-actions button { width: 28px; height: 28px; display: grid; place-items: center; border: 0; background: #f3f5fb; border-radius: 7px; color: #6b7993; }

.records-panel { padding: 0; }
.toolbar { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 14px 16px; border-bottom: 1px solid var(--line); }
.search-box { width: min(330px, 60%); display: flex; align-items: center; gap: 8px; border: 1px solid var(--line); background: #fff; border-radius: 9px; padding: 8px 10px; color: var(--muted); }
.search-box input { border: 0; outline: none; background: transparent; width: 100%; color: var(--ink); font-size: 11px; }
.record-counter { color: var(--muted); font-size: 10px; }
.record-counter strong { color: var(--ink); }
.empty-state { min-height: 180px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 7px; color: var(--muted); text-align: center; font-size: 10px; }
.empty-state strong { font-size: 12px; color: var(--ink); }
.error-banner, .error-box { padding: 10px 12px; border-radius: 8px; font-size: 10px; }
.error-banner { border: 1px solid #ffd7d5; background: #fff4f2; color: #a44947; }
.error-box { margin-top: 2px; border: 1px solid #ffd7d5; background: #fff4f2; color: #a44947; }

.status-pill { display: inline-flex; align-items: center; gap: 6px; padding: 5px 8px; border-radius: 999px; font-size: 9px; font-weight: 700; background: #eef6f3; color: #2f9a71; }
.status-pill i { width: 6px; height: 6px; border-radius: 50%; display: inline-block; background: currentColor; }
.status-pill.completed { background: #eef3ff; color: var(--blue); }
.status-pill.cancelled, .status-pill.overdue { background: #fff0f0; color: var(--red); }
.status-pill.pending { background: #fff6e9; color: #dd9d43; }
.status-pill.available { background: #ebfaf3; color: var(--green); }
.status-pill.on-duty { background: #fff4e8; color: #d58b47; }
.status-pill.off-duty { background: #f3f4f9; color: #697693; }

.modal-backdrop { position: fixed; inset: 0; background: rgba(18,31,56,0.38); display: grid; place-items: center; padding: 18px; z-index: 50; }
.modal-card { width: min(540px, 100%); background: white; border-radius: 14px; border: 1px solid var(--line); box-shadow: 0 20px 60px rgba(16, 26, 46, 0.18); }
.modal-head { display: flex; align-items: flex-start; justify-content: space-between; gap: 10px; padding: 18px 20px 14px; border-bottom: 1px solid var(--line); }
.modal-head h2 { margin: 6px 0 0; font-size: 19px; font-family: 'Manrope'; }
.modal-form { padding: 18px 20px 20px; }
.form-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 14px; }
.form-grid label { display: flex; flex-direction: column; gap: 6px; font-size: 10px; color: #5d6a80; font-weight: 600; }
.form-grid input, .form-grid select, .form-grid textarea { width: 100%; border: 1px solid var(--line); border-radius: 8px; background: #fff; padding: 9px 10px; color: var(--ink); outline: none; }
.form-grid input:focus, .form-grid select:focus, .form-grid textarea:focus { border-color: #b9c6ff; box-shadow: 0 0 0 3px rgba(95, 119, 245, 0.1); }
.span-2 { grid-column: span 2; }
.modal-actions { display: flex; justify-content: flex-end; gap: 8px; margin-top: 18px; }

.settings-panel { padding: 18px 20px; }
.settings-card { display: flex; align-items: center; gap: 12px; padding-bottom: 18px; border-bottom: 1px solid var(--line); }
.settings-card strong, .settings-card small { display: block; }
.settings-card strong { font-size: 12px; }
.settings-card small { margin-top: 3px; color: var(--muted); }
.settings-row { display: flex; justify-content: space-between; align-items: center; gap: 10px; padding: 16px 0; border-bottom: 1px solid var(--line); }
.settings-row:last-child { border-bottom: none; }
.settings-row strong, .settings-row small { display: block; }
.settings-row strong { font-size: 10px; }
.settings-row small { margin-top: 3px; color: var(--muted); }
.settings-row span { font-size: 10px; color: #485771; }

.report-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 15px; }

.auth-screen { min-height: 100vh; display: grid; grid-template-columns: 1.1fr 1fr; }
.auth-visual {
  position: relative; overflow: hidden; background: linear-gradient(145deg, #233866 0%, #4d66e8 100%); padding: 42px 50px 34px; display: flex; flex-direction: column; justify-content: space-between;
}
.auth-visual::before, .auth-visual::after { content: ''; position: absolute; border-radius: 50%; border: 1px solid rgba(255,255,255,0.1); }
.auth-visual::before { width: 520px; height: 520px; right: -180px; top: 30px; }
.auth-visual::after { width: 260px; height: 260px; right: 20px; bottom: 20px; background: rgba(255,255,255,0.06); }
.hero-copy { position: relative; z-index: 1; max-width: 420px; margin: auto 0; }
.hero-copy h1 { font-size: clamp(38px, 5vw, 62px); line-height: 0.98; letter-spacing: -2.2px; font-family: 'Manrope'; margin: 18px 0 16px; color: white; }
.hero-copy h1 em { color: #d5dcff; font-style: normal; }
.hero-copy p { font-size: 14px; line-height: 1.7; color: rgba(255,255,255,0.84); }
.feature-pills { display: flex; gap: 10px; flex-wrap: wrap; margin-top: 20px; }
.feature-pills span { display: inline-flex; align-items: center; gap: 6px; padding: 8px 10px; border-radius: 999px; background: rgba(255,255,255,0.08); color: rgba(255,255,255,0.9); font-size: 10px; border: 1px solid rgba(255,255,255,0.1); }
.mini-tile { margin-top: 28px; width: max-content; max-width: 100%; display: flex; align-items: center; gap: 12px; padding: 12px 14px; border-radius: 12px; background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.12); color: white; }
.avatar-stack { display: flex; margin-left: 6px; }
.avatar-stack i, .avatar-stack b { width: 28px; height: 28px; border-radius: 50%; border: 2px solid rgba(82, 123, 255, 0.8); font-size: 8px; font-weight: 700; display: grid; place-items: center; margin-left: -5px; background: #f0d7d0; color: #5f463e; }
.avatar-stack i:nth-child(2) { background: #d7eee1; color: #2a7b68; }
.avatar-stack i:nth-child(3) { background: #e9d9f5; color: #6b4eb0; }
.avatar-stack b { background: white; color: var(--blue); }
.mini-tile strong, .mini-tile small { display: block; }
.mini-tile small { margin-top: 3px; color: rgba(255,255,255,0.77); font-size: 9px; }

.auth-panel { display: grid; place-items: center; padding: 32px 26px; background: rgba(245,247,252,0.8); }
.auth-card { width: min(380px, 100%); background: rgba(255,255,255,0.98); padding: 22px 22px 18px; border: 1px solid var(--line); border-radius: 18px; box-shadow: 0 20px 45px rgba(23, 34, 66, 0.08); animation: floatIn 0.6s ease both; }
.auth-header { margin-top: 16px; }
.auth-header h2 { margin: 8px 0 0; font-size: 26px; font-family: 'Manrope'; letter-spacing: -0.7px; }
.auth-form { margin-top: 18px; display: flex; flex-direction: column; gap: 14px; }
.auth-form label { display: flex; flex-direction: column; gap: 7px; color: #58667a; font-size: 10px; font-weight: 600; }
.auth-form input, .auth-form select { width: 100%; border: 1px solid var(--line); background: #fff; border-radius: 8px; padding: 10px 11px; font-size: 11px; color: var(--ink); outline: none; }
.auth-form input:focus, .auth-form select:focus { border-color: #bac8ff; box-shadow: 0 0 0 3px rgba(91,111,246,0.09); }
.auth-toggle { margin: 18px 0 0; text-align: center; font-size: 10px; color: var(--muted); }
.auth-toggle button { background: transparent; border: 0; color: var(--blue); font-weight: 700; }
.secure-badge { margin-top: 18px; border-top: 1px solid var(--line); padding-top: 14px; display: flex; align-items: center; justify-content: center; gap: 7px; font-size: 9px; color: var(--muted); }

.toast { position: fixed; right: 22px; bottom: 22px; display: inline-flex; align-items: center; gap: 8px; background: #17243f; color: white; padding: 12px 16px; border-radius: 10px; font-size: 11px; box-shadow: 0 20px 40px rgba(17,27,48,0.22); z-index: 80; }
.scrim { position: fixed; inset: 0; background: rgba(10,20,36,0.38); z-index: 18; }
.close-btn { margin-left: auto; display: none; background: transparent; border: 0; color: #6d7b91; }
.menu-btn { display: none; background: transparent; border: 0; color: #53607b; }
.mobile-only { display: none; }

@keyframes floatIn { 0% { opacity: 0; transform: translateY(14px); } 100% { opacity: 1; transform: translateY(0); } }

@media (max-width: 1024px) {
  .sidebar { position: fixed; left: 0; top: 0; height: 100vh; transform: translateX(-110%); transition: transform 0.25s ease; box-shadow: 12px 0 25px rgba(18,31,56,0.08); }
  .sidebar.show { transform: translateX(0); }
  .menu-btn, .close-btn { display: inline-flex; }
  .topbar { padding: 0 18px; }
  .content-wrap { padding: 22px 18px; }
  .stat-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .main-grid, .report-grid { grid-template-columns: 1fr; }
}

@media (max-width: 700px) {
  .auth-screen { grid-template-columns: 1fr; }
  .auth-visual { display: none; }
  .auth-panel { padding: 24px 16px; }
  .page-head { flex-direction: column; align-items: flex-start; }
  .page-head h1 { font-size: 22px; }
  .search-box { width: 100%; }
  .toolbar { flex-direction: column; align-items: stretch; }
  .form-grid { grid-template-columns: 1fr; }
  .span-2 { grid-column: span 1; }
  .day-pill { display: none; }
  .top-user { display: none; }
  .content-wrap { padding: 18px 14px; }
  .stat-grid { grid-template-columns: 1fr; }
  .report-grid { grid-template-columns: 1fr; }
  .mobile-only { display: flex; }
}
