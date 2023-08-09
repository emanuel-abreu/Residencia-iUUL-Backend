import { Patient } from "../TableModel/PatientModel.js";

interface IPatientRepository {
  add(patient: Patient): void;
  getAll(): Patient[];
}

export { IPatientRepository };
