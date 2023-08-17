import { IPatientRepository } from "../Interfaces/interface-patient-repository.js";
import { Patient } from "../Models/PatientModel.js";

class PatientRepository implements IPatientRepository {
  async add(patient: Patient): Promise<void> {
    await patient.save();
  }

  async findByCPF(cpf: string): Promise<Patient | null> {
    return Patient.findOne({
      where: { cpf },
    });
  }

  async getAll(): Promise<Patient[]> {
    return Patient.findAll();
  }

  async deleteByCPF(cpf: string): Promise<void> {
    await Patient.destroy({
      where: { cpf },
    });
  }
}

export { PatientRepository };
