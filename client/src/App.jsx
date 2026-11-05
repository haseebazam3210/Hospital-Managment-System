import { useEffect, useMemo, useState } from 'react';
import { Routes, Route, Navigate, NavLink } from 'react-router-dom';
import axios from 'axios';
import {
  Activity, ArrowUpRight, BarChart3, Bell, BriefcaseMedical, CalendarDays,
  Check, ChevronDown, ClipboardList, CreditCard, FileText, HeartPulse,
  LayoutDashboard, LogOut, Menu, MoreHorizontal, Pencil, Plus, Search,
  Settings, ShieldCheck, Sparkles, Stethoscope, Trash2, UserRound, Users,
  Wallet, X
} from 'lucide-react';
import {
  Area, AreaChart, Bar, BarChart, Cell, Pie, PieChart, ResponsiveContainer,
  Tooltip, XAxis, YAxis
} from 'recharts';

const api = axios.create({ baseURL: '/api' });
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('medicare_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const demoDashboard = {
  stats: { patients: 184, doctors: 26, appointments: 82, scheduled: 19 },
  recentAppointments: [
    { _id: 'a1', patientName: 'Sarah Ali', doctorName: 'Dr. Amna Khan', date: '2026-11-05T10:00:00.000Z', time: '10:00 AM', type: 'Consultation', status: 'Scheduled' },
    { _id: 'a2', patientName: 'Ali Raza', doctorName: 'Dr. Ibrahim Noor', date: '2026-11-05T12:00:00.000Z', time: '12:00 PM', type: 'Follow-up', status: 'Completed' },
    { _id: 'a3', patientName: 'Nimra Hasan', doctorName: 'Dr. Sara Khan', date: '2026-11-06T09:30:00.000Z', time: '09:30 AM', type: 'Checkup', status: 'Scheduled' },
    { _id: 'a4', patientName: 'Usman Shah', doctorName: 'Dr. Tariq Farid', date: '2026-11-07T08:00:00.000Z', time: '08:00 AM', type: 'Vaccination', status: 'Cancelled' },
  ],
  patientTrend: [
    { _id: 1, count: 12 }, { _id: 2, count: 16 }, { _id: 3, count: 18 }, { _id: 4, count: 27 },
    { _id: 5, count: 20 }, { _id: 6, count: 34 }, { _id: 7, count: 29 }, { _id: 8, count: 38 },
    { _id: 9, count: 35 }, { _id: 10, count: 44 }, { _id: 11, count: 41 }, { _id: 12, count: 57 },
  ],
};

const demoPatients = [
  { _id: 'p1', name: 'Sarah Ali', email: 'sarah@example.com', phone: '+92 300 1111111', age: 29, gender: 'Female', bloodGroup: 'A+', condition: 'Hypertension', status: 'Active' },
  { _id: 'p2', name: 'Ali Raza', email: 'ali@example.com', phone: '+92 300 2222222', age: 42, gender: 'Male', bloodGroup: 'O-', condition: 'Post-surgery recovery', status: 'Active' },
  { _id: 'p3', name: 'Nimra Hasan', email: 'nimra@example.com', phone: '+92 300 3333333', age: 34, gender: 'Female', bloodGroup: 'B+', condition: 'Migraine', status: 'Critical' },
  { _id: 'p4', name: 'Usman Shah', email: 'usman@example.com', phone: '+92 300 4444444', age: 51, gender: 'Male', bloodGroup: 'AB+', condition: 'Diabetes monitoring', status: 'Discharged' },
];

const demoDoctors = [
  { _id: 'd1', name: 'Dr. Amna Khan', email: 'amna@medicare.com', phone: '+92 321 1111111', specialty: 'Cardiology', experience: 11, fee: 2400, status: 'Available' },
  { _id: 'd2', name: 'Dr. Ibrahim Noor', email: 'ibrahim@medicare.com', phone: '+92 321 2222222', specialty: 'Orthopedics', experience: 15, fee: 2800, status: 'On duty' },
  { _id: 'd3', name: 'Dr. Sara Khan', email: 'sara@medicare.com', phone: '+92 321 3333333', specialty: 'Neurology', experience: 9, fee: 2600, status: 'Available' },
  { _id: 'd4', name: 'Dr. Tariq Farid', email: 'tariq@medicare.com', phone: '+92 321 4444444', specialty: 'Pediatrics', experience: 13, fee: 2100, status: 'Off duty' },
];

const demoAppointments = [
  { _id: 'ap1', patientName: 'Sarah Ali', doctorName: 'Dr. Amna Khan', date: '2026-11-05', time: '10:00 AM', type: 'Consultation', status: 'Scheduled', notes: 'Blood pressure review' },
  { _id: 'ap2', patientName: 'Ali Raza', doctorName: 'Dr. Ibrahim Noor', date: '2026-11-05', time: '12:00 PM', type: 'Follow-up', status: 'Completed', notes: 'Physical therapy check' },
  { _id: 'ap3', patientName: 'Nimra Hasan', doctorName: 'Dr. Sara Khan', date: '2026-11-06', time: '09:30 AM', type: 'Checkup', status: 'Scheduled', notes: 'Migraine management' },
  { _id: 'ap4', patientName: 'Usman Shah', doctorName: 'Dr. Tariq Farid', date: '2026-11-07', time: '08:00 AM', type: 'Vaccination', status: 'Cancelled', notes: 'Child vaccination review' },
];

const demoInvoices = [
  { _id: 'inv-101', patient: 'Sarah Ali', date: '2026-10-24', amount: 320, status: 'Paid' },
  { _id: 'inv-102', patient: 'Ali Raza', date: '2026-10-25', amount: 185, status: 'Pending' },
  { _id: 'inv-103', patient: 'Nimra Hasan', date: '2026-10-26', amount: 640, status: 'Paid' },
  { _id: 'inv-104', patient: 'Usman Shah', date: '2026-10-27', amount: 240, status: 'Overdue' },
];

const demoPrescriptions = [
  { _id: 'rx1', patient: 'Sarah Ali', doctor: 'Dr. Amna Khan', medicine: 'Amlodipine 5mg', dosage: 'Once daily', notes: 'Continue for 30 days', date: '2026-11-01' },
  { _id: 'rx2', patient: 'Ali Raza', doctor: 'Dr. Ibrahim Noor', medicine: 'Ibuprofen 400mg', dosage: 'Twice a day', notes: 'After meals', date: '2026-11-02' },
  { _id: 'rx3', patient: 'Nimra Hasan', doctor: 'Dr. Sara Khan', medicine: 'Topiramate 25mg', dosage: 'Nightly', notes: 'Monitor side effects', date: '2026-11-03' },
];

const demoReports = {
  occupancy: [
    { name: 'Mon', value: 72 }, { name: 'Tue', value: 68 }, { name: 'Wed', value: 80 }, { name: 'Thu', value: 86 }, { name: 'Fri', value: 91 }, { name: 'Sat', value: 75 },
  ],
  departments: [
    { name: 'ER', value: 28 }, { name: 'Cardio', value: 22 }, { name: 'Neuro', value: 18 }, { name: 'Peds', value: 16 }, { name: 'Ortho', value: 16 },
  ],
};

const palette = ['#5b6ff6', '#40b794', '#febc4b', '#ef6b9a', '#7f70ff'];

function App() {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('medicare_user')); } catch { return null; }
  });

  const login = (data) => {
    localStorage.setItem('medicare_token', data.token);
    localStorage.setItem('medicare_user', JSON.stringify(data.user));
    setUser(data.user);
  };

  const logout = () => {
    localStorage.removeItem('medicare_token');
    localStorage.removeItem('medicare_user');
    setUser(null);
  };

  return (
    <Routes>
      <Route path="/login" element={user ? <Navigate to="/" replace /> : <AuthPage onLogin={login} />} />
      <Route path="*" element={user ? <Shell user={user} onLogout={logout} /> : <Navigate to="/login" replace />} />
    </Routes>
  );
}

function AuthPage({ onLogin }) {
  const [mode, setMode] = useState('login');
  const [role, setRole] = useState('admin');
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError('');

    try {
      const endpoint = mode === 'login' ? '/auth/login' : '/auth/register';
      const payload = mode === 'login'
        ? { email: form.email, password: form.password }
        : { name: form.name, email: form.email, password: form.password, role };
      const { data } = await api.post(endpoint, payload);
      onLogin(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to connect to hospital server.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="auth-screen">
      <div className="auth-visual">
        <div className="brand light">
          <span className="brand-icon"><HeartPulse size={22} /></span>
          <span>MediCare <span className="brand-dot">.</span></span>
        </div>

        <div className="hero-copy">
          <span className="eyebrow light">SMART HEALTHCARE</span>
          <h1>Hospital operations <em>without chaos.</em></h1>
          <p>One connected workspace for care teams, patients, hospital administration, and every appointment in between.</p>

          <div className="feature-pills">
            <span><ShieldCheck size={14} /> Secure access</span>
            <span><FileText size={14} /> Digital records</span>
          </div>

          <div className="mini-tile">
            <div className="avatar-stack">
              <i>A</i><i>K</i><i>R</i><b>+12</b>
            </div>
            <div>
              <strong>Trusted care team</strong>
              <small>Emergency, cardiology, and patient support</small>
            </div>
          </div>
        </div>
      </div>

      <div className="auth-panel">
        <div className="auth-card">
          <div className="brand mobile-only">
            <span className="brand-icon"><HeartPulse size={22} /></span>
            <span>MediCare <span className="brand-dot">.</span></span>
          </div>

          <div className="auth-header">
            <span className="eyebrow">{mode === 'login' ? 'WELCOME BACK' : 'CREATE ACCOUNT'}</span>
            <h2>{mode === 'login' ? 'Login to your workspace' : 'Start your hospital account'}</h2>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            {mode === 'register' && (
              <label>
                Full name
                <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="John Smith" required />
              </label>
            )}

            <label>
              Email address
              <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@medicare.com" required />
            </label>

            <label>
              Password
              <input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="••••••••" required minLength={8} />
            </label>

            {mode === 'register' && (
              <label>
                Access role
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                  <option value="admin">Admin</option>
                  <option value="doctor">Doctor</option>
                  <option value="receptionist">Receptionist</option>
                  <option value="patient">Patient</option>
                </select>
              </label>
            )}

            {error && <div className="error-box">{error}</div>}

            <button type="submit" className="primary wide" disabled={busy}>
              {busy ? 'Please wait...' : mode === 'login' ? 'Login to dashboard' : 'Create account'}
            </button>
          </form>

          <p className="auth-toggle">
            {mode === 'login' ? 'New here?' : 'Already have an account?'}
            <button type="button" onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setError(''); }}>
              {mode === 'login' ? 'Create account' : 'Sign in'}
            </button>
          </p>

          <div className="secure-badge">
            <ShieldCheck size={15} /> Protected by secure hospital authentication
          </div>
        </div>
      </div>
    </div>
  );
}

function Shell({ user, onLogout }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [toast, setToast] = useState('');

  const role = user.role || 'admin';
  const navItems = role === 'patient'
    ? [
        { label: 'Overview', to: '/', icon: LayoutDashboard },
        { label: 'Appointments', to: '/appointments', icon: CalendarDays },
        { label: 'Prescriptions', to: '/prescriptions', icon: FileText },
        { label: 'Billing', to: '/billing', icon: Wallet },
        { label: 'Profile', to: '/profile', icon: UserRound },
      ]
    : [
        { label: 'Dashboard', to: '/', icon: LayoutDashboard },
        { label: 'Patients', to: '/patients', icon: Users },
        { label: 'Doctors', to: '/doctors', icon: Stethoscope },
        { label: 'Appointments', to: '/appointments', icon: CalendarDays },
        { label: 'Prescriptions', to: '/prescriptions', icon: FileText },
        { label: 'Billing', to: '/billing', icon: Wallet },
        { label: 'Reports', to: '/reports', icon: BarChart3 },
        { label: 'Settings', to: '/settings', icon: Settings },
      ];

  const notify = (msg) => {
    setToast(msg);
    window.clearTimeout(notify.timeout);
    notify.timeout = window.setTimeout(() => setToast(''), 2600);
  };

  return (
    <div className="app-shell">
      <aside className={`sidebar ${menuOpen ? 'show' : ''}`}>
        <div className="brand row">
          <span className="brand-icon"><HeartPulse size={22} /></span>
          <span>MediCare <span className="brand-dot">.</span></span>
          <button className="close-btn" onClick={() => setMenuOpen(false)}><X size={16} /></button>
        </div>

        <div className="workspace-wrap">
          <div className="workspace-badge">H</div>
          <div>
            <strong>Horizon Health</strong>
            <small>{role === 'patient' ? 'Patient portal' : 'Admin command center'}</small>
          </div>
          <ChevronDown size={15} />
        </div>

        <nav className="nav-list">
          {navItems.map(({ label, to, icon: Icon }) => (
            <NavLink key={label} to={to} end={to === '/'} className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`} onClick={() => setMenuOpen(false)}>
              <Icon size={17} />
              <span>{label}</span>
              {label === 'Appointments' && <span className="nav-tag">4</span>}
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="feature-callout">
            <div className="callout-icon"><Sparkles size={14} /></div>
            <div>
              <strong>Patient-first care</strong>
              <p>Unified operations for all hospital services.</p>
            </div>
          </div>

          <button className="profile-card" onClick={onLogout}>
            <div className="user-badge">{user.name?.slice(0, 1).toUpperCase()}</div>
            <div className="profile-meta">
              <strong>{user.name}</strong>
              <small>{role}</small>
            </div>
            <LogOut size={16} />
          </button>
        </div>
      </aside>

      {menuOpen && <div className="scrim" onClick={() => setMenuOpen(false)} />}

      <main className="main-panel">
        <header className="topbar">
          <button className="menu-btn" onClick={() => setMenuOpen(true)}><Menu size={18} /></button>
          <div className="crumbs">Workspace <span>/</span> <strong>{role === 'patient' ? 'Patient overview' : 'Hospital overview'}</strong></div>

          <div className="top-actions">
            <div className="day-pill"><span className="live-dot" /> {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</div>
            <button className="icon-btn" onClick={() => notify('You are all caught up!')}><Bell size={18} /></button>
            <div className="top-user">
              <div className="user-badge small">{user.name?.slice(0, 1).toUpperCase()}</div>
              <ChevronDown size={14} />
            </div>
          </div>
        </header>

        <div className="content-wrap">
          <Routes>
            <Route path="/" element={<Dashboard notify={notify} role={role} />} />
            <Route path="/patients" element={<ResourcePage kind="patients" title="Patients" subtitle="Track every patient journey and care plan." notify={notify} />} />
            <Route path="/doctors" element={<ResourcePage kind="doctors" title="Medical team" subtitle="Manage doctors, specialties, and availability." notify={notify} />} />
            <Route path="/appointments" element={<AppointmentsPage notify={notify} />} />
            <Route path="/prescriptions" element={<PrescriptionsPage notify={notify} />} />
            <Route path="/billing" element={<BillingPage notify={notify} />} />
            <Route path="/reports" element={<ReportsPage />} />
            <Route path="/settings" element={<SettingsPage user={user} notify={notify} />} />
            <Route path="/profile" element={<ProfilePage user={user} notify={notify} />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </main>

      {toast && <div className="toast"><Check size={16} /> {toast}</div>}
    </div>
  );
}

function Dashboard({ notify, role }) {
  const [data, setData] = useState(demoDashboard);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const { data: response } = await api.get('/dashboard');
        setData(response);
      } catch {
        setData(demoDashboard);
        setError('MongoDB is not connected. Running demo hospital data.');
      }
    };
    load();
  }, []);

  const stats = data?.stats || demoDashboard.stats;
  const chartData = monthNames.map((name, i) => ({
    name,
    patients: (data?.patientTrend || demoDashboard.patientTrend).find((item) => item._id === i + 1)?.count || 18 + i * 4,
  }));

  return (
    <div className="page-shell">
      <div className="page-head">
        <div>
          <span className="eyebrow">{role === 'patient' ? 'PATIENT OVERVIEW' : 'HOSPITAL OVERVIEW'}</span>
          <h1>Good morning, <em>care team</em></h1>
          <p>Everything you need to run a healthier hospital.</p>
        </div>
        <button className="primary" onClick={() => notify('New appointment flow is ready.')}><Plus size={16} /> New appointment</button>
      </div>

      {error && <div className="error-banner">{error}</div>}

      <div className="stat-grid">
        <StatCard icon={Users} label="Total patients" value={stats.patients} note="Across active care" color="blue" />
        <StatCard icon={Stethoscope} label="Doctors" value={stats.doctors} note="Available and on-duty" color="green" />
        <StatCard icon={CalendarDays} label="Appointments" value={stats.appointments} note={`${stats.scheduled} scheduled`} color="purple" />
        <StatCard icon={Activity} label="Daily occupancy" value={`${Math.min(96, Math.round((stats.scheduled / 20) * 100))}%`} note="Within safe capacity" color="orange" />
      </div>

      <div className="main-grid">
        <section className="panel chart-panel">
          <div className="panel-head">
            <div>
              <h3>Patient capacity</h3>
              <p>Monthly patient flow</p>
            </div>
            <button className="ghost-btn">This year <ChevronDown size={14} /></button>
          </div>

          <div className="chart-meta">
            <span><i className="dot blue" /> Total patients</span>
            <strong>{stats.patients}</strong>
            <b className="positive">+12.8%</b>
          </div>

          <div className="chart-box">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 8, right: 6, left: -22, bottom: 0 }}>
                <defs>
                  <linearGradient id="fillPulse" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#5b6ff6" stopOpacity={0.25} />
                    <stop offset="100%" stopColor="#5b6ff6" stopOpacity={0.03} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#8893ac', fontSize: 11 }} />
                <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #edf0f5' }} />
                <Area type="monotone" dataKey="patients" stroke="#5b6ff6" strokeWidth={2.5} fill="url(#fillPulse)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="panel summary-panel">
          <div className="panel-head">
            <div>
              <h3>Care snapshot</h3>
              <p>Live operations</p>
            </div>
            <button className="icon-btn"><MoreHorizontal size={18} /></button>
          </div>

          <div className="summary-total">
            <strong>{stats.scheduled}</strong>
            <span>appointments <br /> in schedule</span>
          </div>

          <div className="progress-stack">
            <i style={{ width: '68%' }} />
            <i style={{ width: '42%' }} />
            <i style={{ width: '84%' }} />
          </div>

          <div className="legend-row">
            <span><i className="dot blue" /> Scheduled</span>
            <span><i className="dot green" /> Completed</span>
          </div>

          <div className="summary-footer">
            <div className="callout-icon success"><HeartPulse size={15} /></div>
            <div>
              <strong>Hospital status is strong</strong>
              <small>Care team is performing above target.</small>
            </div>
            <ArrowUpRight size={16} />
          </div>
        </section>
      </div>

      <section className="panel table-panel">
        <div className="panel-head">
          <div>
            <h3>Recent appointments</h3>
            <p>Latest patient activity</p>
          </div>
          <NavLink to="/appointments" className="text-link">View all <ArrowUpRight size={14} /></NavLink>
        </div>

        <AppointmentTable rows={(data?.recentAppointments || demoDashboard.recentAppointments).slice(0, 5)} />
      </section>
    </div>
  );
}

function ResourcePage({ kind, title, subtitle, notify }) {
  const resourceMap = {
    patients: {
      endpoint: '/patients',
      singular: 'patient',
      columns: ['Patient', 'Age / Gender', 'Blood group', 'Condition', 'Status'],
      fields: [
        ['name', 'Full name', 'text'],
        ['email', 'Email address', 'email'],
        ['phone', 'Phone number', 'tel'],
        ['age', 'Age', 'number'],
        ['gender', 'Gender', 'select', ['Male', 'Female', 'Other']],
        ['bloodGroup', 'Blood group', 'text'],
        ['condition', 'Condition', 'text'],
        ['status', 'Status', 'select', ['Active', 'Critical', 'Discharged']],
      ],
      data: demoPatients,
    },
    doctors: {
      endpoint: '/doctors',
      singular: 'doctor',
      columns: ['Doctor', 'Specialty', 'Experience', 'Phone', 'Status'],
      fields: [
        ['name', 'Full name', 'text'],
        ['email', 'Email address', 'email'],
        ['phone', 'Phone number', 'tel'],
        ['specialty', 'Specialty', 'text'],
        ['experience', 'Experience (years)', 'number'],
        ['fee', 'Fee', 'number'],
        ['status', 'Availability', 'select', ['Available', 'On duty', 'Off duty']],
      ],
      data: demoDoctors,
    },
  };

  const config = resourceMap[kind];
  const [rows, setRows] = useState(config.data);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({});
  const [error, setError] = useState('');

  const refresh = async () => {
    setLoading(true);
    try {
      const { data: response } = await api.get(config.endpoint);
      setRows(response.length ? response : config.data);
    } catch {
      setRows(config.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { refresh(); }, [kind]);

  const filtered = useMemo(() => {
    const term = search.toLowerCase();
    return rows.filter((row) => Object.values(row).some((value) => String(value || '').toLowerCase().includes(term)));
  }, [rows, search]);

  const openModal = (row = null) => {
    setEditing(row);
    setForm(row ? { ...row } : {});
    setError('');
    setModalOpen(true);
  };

  const saveRecord = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await api.patch(`${config.endpoint}/${editing._id}`, form);
      } else {
        await api.post(config.endpoint, form);
      }
      setModalOpen(false);
      await refresh();
      notify(`${config.singular.charAt(0).toUpperCase() + config.singular.slice(1)} saved successfully.`);
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to save this record.');
    }
  };

  const deleteRecord = async (id) => {
    if (!window.confirm(`Delete this ${config.singular}?`)) return;
    try {
      await api.delete(`${config.endpoint}/${id}`);
      await refresh();
      notify('Record deleted successfully.');
    } catch {
      notify('Unable to delete record.');
    }
  };

  return (
    <div className="page-shell">
      <div className="page-head">
        <div>
          <span className="eyebrow">HOSPITAL MANAGEMENT</span>
          <h1>{title}</h1>
          <p>{subtitle}</p>
        </div>
        <button className="primary" onClick={() => openModal()}><Plus size={16} /> Add {config.singular}</button>
      </div>

      <section className="panel records-panel">
        <div className="toolbar">
          <div className="search-box">
            <Search size={16} />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder={`Search ${title.toLowerCase()}...`} />
          </div>
          <span className="record-counter"><strong>{filtered.length}</strong> records</span>
        </div>

        {error && <div className="error-banner">{error}</div>}

        {loading ? (
          <div className="empty-state"><ClipboardList size={26} /> Loading records...</div>
        ) : filtered.length === 0 ? (
          <div className="empty-state">
            <ClipboardList size={26} />
            <strong>No matching records</strong>
            <span>Try another keyword or add a new {config.singular}.</span>
          </div>
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  {config.columns.map((column) => <th key={column}>{column.toUpperCase()}</th>)}
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((row, index) => (
                  <tr key={row._id || index}>
                    {kind === 'patients' ? (
                      <>
                        <td><PersonCell person={row} index={index} /></td>
                        <td>{row.age || '—'} <span className="muted">/ {row.gender || '—'}</span></td>
                        <td>{row.bloodGroup || '—'}</td>
                        <td>{row.condition || '—'}</td>
                        <td><StatusBadge value={row.status || 'Active'} /></td>
                      </>
                    ) : (
                      <>
                        <td><PersonCell person={row} index={index} prefix="Dr. " /></td>
                        <td>{row.specialty || '—'}</td>
                        <td>{row.experience ? `${row.experience} yrs` : '—'}</td>
                        <td>{row.phone || '—'}</td>
                        <td><StatusBadge value={row.status || 'Available'} /></td>
                      </>
                    )}
                    <td>
                      <div className="row-actions">
                        <button onClick={() => openModal(row)} aria-label="Edit"><Pencil size={15} /></button>
                        <button onClick={() => deleteRecord(row._id)} aria-label="Delete"><Trash2 size={15} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {modalOpen && (
        <div className="modal-backdrop" onClick={() => setModalOpen(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-head">
              <div>
                <span className="eyebrow">RECORD MANAGEMENT</span>
                <h2>{editing ? 'Edit' : 'Add'} {config.singular}</h2>
              </div>
              <button className="icon-btn" onClick={() => setModalOpen(false)}><X size={17} /></button>
            </div>

            <form onSubmit={saveRecord} className="modal-form">
              <div className="form-grid">
                {config.fields.map(([key, label, type, options]) => (
                  <label key={key} className={type === 'textarea' ? 'span-2' : ''}>
                    {label}
                    {type === 'select' ? (
                      <select value={form[key] ?? options[0]} onChange={(e) => setForm({ ...form, [key]: e.target.value })}>
                        {options.map((option) => <option key={option} value={option}>{option}</option>)}
                      </select>
                    ) : type === 'textarea' ? (
                      <textarea rows="3" value={form[key] || ''} onChange={(e) => setForm({ ...form, [key]: e.target.value })} />
                    ) : (
                      <input type={type} value={form[key] || ''} onChange={(e) => setForm({ ...form, [key]: type === 'number' ? Number(e.target.value || 0) : e.target.value })} />
                    )}
                  </label>
                ))}
              </div>

              {error && <div className="error-box">{error}</div>}

              <div className="modal-actions">
                <button type="button" className="secondary" onClick={() => setModalOpen(false)}>Cancel</button>
                <button type="submit" className="primary">{editing ? 'Save changes' : `Add ${config.singular}`}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function AppointmentsPage({ notify }) {
  const [appointments, setAppointments] = useState(demoAppointments);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ patientName: '', doctorName: '', date: '', time: '09:00 AM', type: 'Consultation', status: 'Scheduled', notes: '' });

  const load = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/appointments');
      setAppointments(data.length ? data : demoAppointments);
    } catch {
      setAppointments(demoAppointments);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const filtered = useMemo(() => appointments.filter((item) => {
    const term = search.toLowerCase();
    return [item.patientName, item.doctorName, item.type, item.status].join(' ').toLowerCase().includes(term);
  }), [appointments, search]);

  const save = async (e) => {
    e.preventDefault();
    try {
      await api.post('/appointments', form);
      setModalOpen(false);
      await load();
      notify('Appointment saved successfully.');
    } catch {
      notify('Unable to save appointment.');
    }
  };

  return (
    <div className="page-shell">
      <div className="page-head">
        <div>
          <span className="eyebrow">CARE COORDINATION</span>
          <h1>Appointments</h1>
          <p>Schedule and manage patient visits.</p>
        </div>
        <button className="primary" onClick={() => setModalOpen(true)}><Plus size={16} /> Book appointment</button>
      </div>

      <section className="panel records-panel">
        <div className="toolbar">
          <div className="search-box">
            <Search size={16} />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search appointment by patient or doctor" />
          </div>
          <span className="record-counter"><strong>{filtered.length}</strong> visits</span>
        </div>

        {loading ? <div className="empty-state">Loading appointments...</div> : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>PATIENT</th>
                  <th>DOCTOR</th>
                  <th>DATE & TIME</th>
                  <th>TYPE</th>
                  <th>STATUS</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((row) => (
                  <tr key={row._id}>
                    <td><PersonCell person={{ name: row.patientName }} index={row._id.length} /></td>
                    <td>{row.doctorName}</td>
                    <td>{new Date(row.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} <span className="muted">{row.time}</span></td>
                    <td>{row.type}</td>
                    <td><StatusBadge value={row.status || 'Scheduled'} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {modalOpen && (
        <div className="modal-backdrop" onClick={() => setModalOpen(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-head">
              <div>
                <span className="eyebrow">BOOK APPOINTMENT</span>
                <h2>New visit</h2>
              </div>
              <button className="icon-btn" onClick={() => setModalOpen(false)}><X size={17} /></button>
            </div>
            <form onSubmit={save} className="modal-form">
              <div className="form-grid">
                <label>Patient name<input required value={form.patientName} onChange={(e) => setForm({ ...form, patientName: e.target.value })} /></label>
                <label>Doctor name<input required value={form.doctorName} onChange={(e) => setForm({ ...form, doctorName: e.target.value })} /></label>
                <label>Date<input required type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} /></label>
                <label>Time<input required value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} /></label>
                <label>Type<select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}><option>Consultation</option><option>Follow-up</option><option>Checkup</option><option>Vaccination</option></select></label>
                <label>Status<select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}><option>Scheduled</option><option>Completed</option><option>Cancelled</option></select></label>
                <label className="span-2">Notes<textarea rows="3" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} /></label>
              </div>
              <div className="modal-actions">
                <button type="button" className="secondary" onClick={() => setModalOpen(false)}>Cancel</button>
                <button type="submit" className="primary">Save appointment</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function PrescriptionsPage({ notify }) {
  const [rows, setRows] = useState(demoPrescriptions);

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await api.get('/prescriptions');
        setRows(data.length ? data : demoPrescriptions);
      } catch {
        setRows(demoPrescriptions);
      }
    };
    load();
  }, []);

  return (
    <div className="page-shell">
      <div className="page-head">
        <div>
          <span className="eyebrow">CLINICAL RECORDS</span>
          <h1>Prescriptions</h1>
          <p>Track prescription plans and patient treatment.</p>
        </div>
        <button className="primary" onClick={() => notify('Prescription module is active.')}><Plus size={16} /> New prescription</button>
      </div>

      <section className="panel records-panel">
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>PATIENT</th>
                <th>DOCTOR</th>
                <th>MEDICINE</th>
                <th>DOSAGE</th>
                <th>DATE</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row._id}>
                  <td>{row.patient}</td>
                  <td>{row.doctor}</td>
                  <td>{row.medicine}</td>
                  <td>{row.dosage}</td>
                  <td>{new Date(row.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function BillingPage({ notify }) {
  const [rows, setRows] = useState(demoInvoices);

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await api.get('/invoices');
        setRows(data.length ? data : demoInvoices);
      } catch {
        setRows(demoInvoices);
      }
    };
    load();
  }, []);

  return (
    <div className="page-shell">
      <div className="page-head">
        <div>
          <span className="eyebrow">FINANCE</span>
          <h1>Billing overview</h1>
          <p>Maintain payment clarity and patient billing flow.</p>
        </div>
        <button className="primary" onClick={() => notify('Invoice generation is ready for integration.')}><Plus size={16} /> Create invoice</button>
      </div>

      <div className="stat-grid small-grid">
        <StatCard icon={CreditCard} label="Revenue" value="$24,580" note="Current month" color="blue" />
        <StatCard icon={Wallet} label="Outstanding" value="$4,260" note="12 pending" color="orange" />
        <StatCard icon={Check} label="Paid" value="86" note="Invoices paid" color="green" />
        <StatCard icon={CalendarDays} label="Overdue" value="3" note="Needs attention" color="purple" />
      </div>

      <section className="panel records-panel">
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>INVOICE</th>
                <th>PATIENT</th>
                <th>DATE</th>
                <th>AMOUNT</th>
                <th>STATUS</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row._id}>
                  <td>{row._id}</td>
                  <td>{row.patient}</td>
                  <td>{new Date(row.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                  <td>{`$${row.amount}`}</td>
                  <td><StatusBadge value={row.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function ReportsPage() {
  const occupancyData = demoReports.occupancy;
  const departmentData = demoReports.departments;
  const pieData = departmentData.map((item, index) => ({ ...item, color: palette[index % palette.length] }));

  return (
    <div className="page-shell">
      <div className="page-head">
        <div>
          <span className="eyebrow">OPERATIONS</span>
          <h1>Reports & analytics</h1>
          <p>Understand patterns across your hospital.</p>
        </div>
      </div>

      <div className="report-grid">
        <section className="panel">
          <div className="panel-head">
            <div>
              <h3>Occupancy</h3>
              <p>Weekly capacity load</p>
            </div>
          </div>
          <div className="chart-box small-box">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={occupancyData}>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#8893ac' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#8893ac' }} />
                <Tooltip />
                <Bar dataKey="value" radius={[6, 6, 0, 0]} fill="#5b6ff6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="panel">
          <div className="panel-head">
            <div>
              <h3>Department load</h3>
              <p>Share of active departments</p>
            </div>
          </div>
          <div className="chart-box pie-box">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} innerRadius={38} outerRadius={62} dataKey="value" nameKey="name" paddingAngle={2}>
                  {pieData.map((item) => <Cell key={item.name} fill={item.color} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>
    </div>
  );
}

function SettingsPage({ user, notify }) {
  return (
    <div className="page-shell">
      <div className="page-head">
        <div>
          <span className="eyebrow">WORKSPACE SETTINGS</span>
          <h1>Settings</h1>
          <p>Manage your profile and practice preferences.</p>
        </div>
      </div>

      <section className="panel settings-panel">
        <div className="settings-card">
          <div className="user-badge large">{user.name?.slice(0, 1).toUpperCase()}</div>
          <div>
            <strong>{user.name}</strong>
            <small>{user.role || 'admin'}</small>
          </div>
        </div>

        <div className="settings-row">
          <div>
            <strong>Email</strong>
            <small>Signed in with</small>
          </div>
          <span>{user.email}</span>
        </div>

        <div className="settings-row">
          <div>
            <strong>Hospital</strong>
            <small>Current healthcare organization</small>
          </div>
          <span>Horizon Health</span>
        </div>

        <div className="settings-row">
          <div>
            <strong>Security</strong>
            <small>Session protection</small>
          </div>
          <button className="secondary" onClick={() => notify('Session is secure and active.')}>Protected <span className="live-dot" /></button>
        </div>
      </section>
    </div>
  );
}

function ProfilePage({ user, notify }) {
  return (
    <div className="page-shell">
      <div className="page-head">
        <div>
          <span className="eyebrow">PROFILE</span>
          <h1>My profile</h1>
          <p>Review personal information and preferences.</p>
        </div>
      </div>

      <section className="panel settings-panel">
        <div className="settings-card">
          <div className="user-badge large accent">{user.name?.slice(0, 1).toUpperCase()}</div>
          <div>
            <strong>{user.name}</strong>
            <small>{user.role || 'patient'}</small>
          </div>
        </div>

        <div className="settings-row">
          <div><strong>Full name</strong><small>Your legal name</small></div>
          <span>{user.name}</span>
        </div>
        <div className="settings-row">
          <div><strong>Email</strong><small>Contact email</small></div>
          <span>{user.email}</span>
        </div>
        <div className="settings-row">
          <div><strong>Membership</strong><small>Current care plan</small></div>
          <span>Premium Care Plus</span>
        </div>
        <div className="settings-row">
          <div><strong>Preferences</strong><small>Health notifications</small></div>
          <button className="secondary" onClick={() => notify('Preferences saved successfully.')}>Enabled</button>
        </div>
      </section>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, note, color }) {
  return (
    <div className="stat-card">
      <div className={`stat-icon ${color}`}><Icon size={18} /></div>
      <span>{label}</span>
      <div className="stat-value">{value}</div>
      <small>{note}</small>
    </div>
  );
}

function PersonCell({ person, index, prefix = '' }) {
  return (
    <div className="person-cell">
      <div className={`person-avatar tone-${index % 4}`}>{(person.name || 'P').slice(0, 1).toUpperCase()}</div>
      <div>
        <strong>{prefix}{person.name}</strong>
        <small>{person.email || 'Hospital contact'}</small>
      </div>
    </div>
  );
}

function StatusBadge({ value = 'Scheduled' }) {
  const safe = String(value).toLowerCase().replace(/\s+/g, '-');
  return <span className={`status-pill ${safe}`}><i />{value}</span>;
}

function AppointmentTable({ rows = [] }) {
  if (!rows.length) return <div className="empty-state"><CalendarDays size={24} /> Nothing scheduled yet.</div>;

  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>PATIENT</th>
            <th>DOCTOR</th>
            <th>DATE & TIME</th>
            <th>TYPE</th>
            <th>STATUS</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={row._id || index}>
              <td><PersonCell person={{ name: row.patientName, email: row.patientEmail || 'patient@care.com' }} index={index} /></td>
              <td>{row.doctorName}</td>
              <td>{new Date(row.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} <span className="muted">{row.time}</span></td>
              <td>{row.type}</td>
              <td><StatusBadge value={row.status || 'Scheduled'} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
