import { IPatientRepository } from "../Model/Interfaces/interface-patient-repository.js";
import { Patient } from "../Model/Models/PatientModel.js";
import { ValidationUtils } from "../Validations/Validations.js";
import { DateTime } from "luxon";
import { IAppointmentRepository } from "../Model/Interfaces/interface-patient-repository.js";

class PatientService {
  private appointmentRepository: IAppointmentRepository;
  private patientRepository: IPatientRepository;
  private validations: ValidationUtils;

  constructor(
    appointmentRepository: IAppointmentRepository,

    patientRepository: IPatientRepository,

    validations: ValidationUtils
  ) {
    this.appointmentRepository = appointmentRepository;
    this.patientRepository = patientRepository;
    this.validations = validations;
  }

  async createPatient(
    cpf: string,
    name: string,
    dateOfBirth: string
  ): Promise<void> {
    if (!this.validations.validateCPF(cpf)) {
      throw new Error("CPF inválido.");
    }

    if (name.length < 5) {
      throw new Error("Nome deve ter pelo menos 5 caracteres.");
    }

    if (!this.validations.validateDate(dateOfBirth)) {
      throw new Error("Data de nascimento inválida.");
    }

    const age = this.validations.calculateAge(dateOfBirth);

    if (age < 13) {
      throw new Error("Paciente deve ter pelo menos 13 anos.");
    }

    const existingPatient = await this.patientRepository.findByCPF(cpf);

    if (existingPatient) {
      throw new Error("Já existe um paciente com esse CPF.");
    }

    const patient = new Patient({
      cpf,
      name,
      dateOfBirth: DateTime.fromFormat(dateOfBirth, "dd/MM/yyyy").toJSDate(),
    });

    await this.patientRepository.add(patient);
  }

  async deletePatient(cpf: string): Promise<void> {
    const patient = await this.patientRepository.findByCPF(cpf);

    if (!patient) {
      throw new Error("Paciente não encontrado.");
    }

    // Verificar se o paciente tem consultas agendadas futuras
    const currentDate = DateTime.now();
    const futureAppointments = await this.appointmentRepository.getByDateRange(
      currentDate.plus({ days: 1 }).toJSDate(),
      currentDate.plus({ years: 1 }).toJSDate()
    );

    const hasFutureAppointment = futureAppointments.some(
      (appointment) => appointment.patientId === patient.id
    );

    if (hasFutureAppointment) {
      throw new Error(
        "O paciente possui consultas agendadas futuras e não pode ser excluído."
      );
    }

    // Excluir paciente e suas consultas agendadas passadas
    await this.patientRepository.deleteByCPF(cpf);
  }

  async listPatients(): Promise<Patient[]> {
    return this.patientRepository.getAll();
  }
}

export { PatientService };
