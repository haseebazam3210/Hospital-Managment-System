import mongoose from 'mongoose';

const options = { timestamps: true };

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'doctor', 'receptionist', 'patient'], default: 'admin' },
}, options);

const patientSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, lowercase: true, trim: true },
  phone: String,
  age: Number,
  gender: { type: String, enum: ['Male', 'Female', 'Other'], default: 'Other' },
  bloodGroup: String,
  condition: String,
  status: { type: String, enum: ['Active', 'Discharged', 'Critical'], default: 'Active' },
  address: String,
  room: String,
}, options);

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, lowercase: true, trim: true },
  phone: String,
  specialty: { type: String, required: true },
  experience: Number,
  status: { type: String, enum: ['Available', 'On duty', 'Off duty'], default: 'Available' },
  fee: Number,
  department: String,
}, options);

const appointmentSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient' },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' },
  patientName: { type: String, required: true },
  doctorName: { type: String, required: true },
  date: { type: Date, required: true },
  time: String,
  type: { type: String, default: 'Consultation' },
  status: { type: String, enum: ['Scheduled', 'Completed', 'Cancelled'], default: 'Scheduled' },
  notes: String,
}, options);

const invoiceSchema = new mongoose.Schema({
  invoiceId: { type: String, required: true, unique: true },
  patient: { type: String, required: true },
  date: { type: Date, required: true },
  amount: { type: Number, required: true },
  status: { type: String, enum: ['Paid', 'Pending', 'Overdue'], default: 'Pending' },
}, options);

const prescriptionSchema = new mongoose.Schema({
  patient: { type: String, required: true },
  doctor: { type: String, required: true },
  medicine: { type: String, required: true },
  dosage: String,
  notes: String,
  date: { type: Date, required: true },
}, options);

export const User = mongoose.model('User', userSchema);
export const Patient = mongoose.model('Patient', patientSchema);
export const Doctor = mongoose.model('Doctor', doctorSchema);
export const Appointment = mongoose.model('Appointment', appointmentSchema);
export const Invoice = mongoose.model('Invoice', invoiceSchema);
export const Prescription = mongoose.model('Prescription', prescriptionSchema);
