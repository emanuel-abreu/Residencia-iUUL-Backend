import { Patient } from "../TableModel/PatientModel.js";
import { IPatientRepository } from "../Interfaces/interface-patient-repository.js";

class PatientRepository implements IPatientRepository {
  private patients: Patient[];

  constructor() {
    this.patients = [];
  }

  add(patient: Patient): void {
    this.patients.push(patient);
  }

  getAll(): Patient[] {
    return this.patients.slice();
  }
}

export default PatientRepository;
