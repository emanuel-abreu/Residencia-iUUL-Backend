import { Appointment } from "../Models/AppointmentModel.js";
import { Patient } from "../Models/PatientModel.js";

interface IPatientRepository {
  add(patient: Patient): Promise<void>;
  findByCPF(cpf: string): Promise<Patient | null>;
  getAll(): Promise<Patient[]>;
  deleteByCPF(cpf: string): Promise<void>;
}

interface IAppointmentRepository {
  add(appointment: Appointment): Promise<void>;
  findByDateAndTime(date: Date, startTime: string): Promise<Appointment | null>;
  getAll(): Promise<Appointment[]>;
  getByDateRange(start: Date, end: Date): Promise<Appointment[]>;
  deleteByCPF(cpf: string): Promise<void>;
  deleteByDateAndTime(date: Date, startTime: string): Promise<void>;
}

export { IPatientRepository, IAppointmentRepository };
