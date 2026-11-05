import { Router } from 'express';
import { auth } from '../middleware/auth.js';
import { Patient, Doctor, Appointment } from '../models/index.js';
const router = Router(); router.use(auth);
const safe = handler => (req, res) => Promise.resolve(handler(req, res)).catch(err => res.status(400).json({ message: err.message || 'Request failed.' }));
router.get('/dashboard', safe(async (_req, res) => {
  const [patients, doctors, appointments, scheduled, recentAppointments, patientTrend] = await Promise.all([
    Patient.countDocuments(), Doctor.countDocuments(), Appointment.countDocuments(), Appointment.countDocuments({ status: 'Scheduled' }),
    Appointment.find().sort({ date: -1 }).limit(6).lean(),
    Patient.aggregate([{ $group: { _id: { $month: '$createdAt' }, count: { $sum: 1 } } }, { $sort: { _id: 1 } }])
  ]);
  res.json({ stats: { patients, doctors, appointments, scheduled }, recentAppointments, patientTrend });
}));
function resource(path, Model, sort = { createdAt: -1 }) {
  router.get(path, safe(async (req, res) => res.json(await Model.find(req.query.search ? { name: { $regex: req.query.search, $options: 'i' } } : {}).sort(sort).limit(500).lean())));
  router.post(path, safe(async (req, res) => res.status(201).json(await Model.create(req.body))));
  router.patch(`${path}/:id`, safe(async (req, res) => { const item = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }); if (!item) return res.status(404).json({ message: 'Record not found.' }); res.json(item); }));
  router.delete(`${path}/:id`, safe(async (req, res) => { const item = await Model.findByIdAndDelete(req.params.id); if (!item) return res.status(404).json({ message: 'Record not found.' }); res.json({ message: 'Record deleted.' }); }));
}
resource('/patients', Patient); resource('/doctors', Doctor); resource('/appointments', Appointment, { date: -1 });
export default router;
