import { Router } from 'express';
import mongoose from 'mongoose';
import { auth } from '../middleware/auth.js';
import { Appointment, Doctor, Invoice, Patient, Prescription } from '../models/index.js';

const router = Router();
router.use(auth);

const isMongoReady = () => mongoose.connection.readyState === 1;

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

const safe = (handler) => (req, res) => Promise.resolve(handler(req, res)).catch((error) => res.status(400).json({ message: error.message || 'Request failed.' }));

function resource(path, Model, sort = { createdAt: -1 }, fallback = []) {
  router.get(path, safe(async (req, res) => {
    if (!isMongoReady()) return res.json(fallback);
    const query = req.query.search ? { name: { $regex: req.query.search, $options: 'i' } } : {};
    const rows = await Model.find(query).sort(sort).limit(500).lean();
    res.json(rows);
  }));

  router.post(path, safe(async (req, res) => {
    if (!isMongoReady()) return res.status(200).json({ message: 'Demo mode active. Data is not persisted until MongoDB is connected.', ...req.body });
    const record = await Model.create(req.body);
    res.status(201).json(record);
  }));

  router.patch(`${path}/:id`, safe(async (req, res) => {
    if (!isMongoReady()) return res.status(200).json({ message: 'Demo mode active. No persisted change.', ...req.body });
    const item = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!item) return res.status(404).json({ message: 'Record not found.' });
    res.json(item);
  }));

  router.delete(`${path}/:id`, safe(async (req, res) => {
    if (!isMongoReady()) return res.json({ message: 'Demo mode active. Record not deleted from database.' });
    const item = await Model.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: 'Record not found.' });
    res.json({ message: 'Record deleted.' });
  }));
}

router.get('/dashboard', safe(async (_req, res) => {
  if (!isMongoReady()) {
    return res.json({
      stats: { patients: 184, doctors: 26, appointments: 82, scheduled: 19 },
      recentAppointments: demoAppointments,
      patientTrend: [
        { _id: 1, count: 12 }, { _id: 2, count: 16 }, { _id: 3, count: 18 }, { _id: 4, count: 27 },
        { _id: 5, count: 20 }, { _id: 6, count: 34 }, { _id: 7, count: 29 }, { _id: 8, count: 38 },
        { _id: 9, count: 35 }, { _id: 10, count: 44 }, { _id: 11, count: 41 }, { _id: 12, count: 57 },
      ],
    });
  }

  const [patients, doctors, appointments, scheduled, recentAppointments, patientTrend] = await Promise.all([
    Patient.countDocuments(),
    Doctor.countDocuments(),
    Appointment.countDocuments(),
    Appointment.countDocuments({ status: 'Scheduled' }),
    Appointment.find().sort({ date: -1 }).limit(6).lean(),
    Patient.aggregate([{ $group: { _id: { $month: '$createdAt' }, count: { $sum: 1 } } }, { $sort: { _id: 1 } }]),
  ]);

  res.json({ stats: { patients, doctors, appointments, scheduled }, recentAppointments, patientTrend });
}));

router.get('/invoices', safe(async (_req, res) => {
  if (!isMongoReady()) return res.json(demoInvoices);
  res.json(await Invoice.find({}).sort({ date: -1 }).lean());
}));

router.get('/prescriptions', safe(async (_req, res) => {
  if (!isMongoReady()) return res.json(demoPrescriptions);
  res.json(await Prescription.find({}).sort({ date: -1 }).lean());
}));

resource('/patients', Patient, { createdAt: -1 }, demoPatients);
resource('/doctors', Doctor, { createdAt: -1 }, demoDoctors);
resource('/appointments', Appointment, { date: -1 }, demoAppointments);

export default router;
