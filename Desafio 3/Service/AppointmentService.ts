import { DateTime } from "luxon";
import {
  IPatientRepository,
  IAppointmentRepository,
} from "../Model/Interfaces/interface-patient-repository.js";
import { Appointment } from "../Model/Models/AppointmentModel.js";
import { ValidationUtils } from "../Validations/Validations.js";

class AppointmentService {
  private validations: ValidationUtils;
  private patientRepository: IPatientRepository;
  private appointmentRepository: IAppointmentRepository;

  constructor(
    validations: ValidationUtils,

    patientRepository: IPatientRepository,
    appointmentRepository: IAppointmentRepository
  ) {
    this.validations = validations;
    this.patientRepository = patientRepository;
    this.appointmentRepository = appointmentRepository;
  }

  async createAppointment(
    cpf: string,
    date: string,
    startTime: string,
    endTime: string
  ): Promise<void> {
    const patient = await this.patientRepository.findByCPF(cpf);

    if (!patient) {
      throw new Error("Paciente não encontrado.");
    }

    if (!this.validations.validateDate(date)) {
      throw new Error("Data inválida.");
    }

    const age = this.validations.calculateAge(
      patient.dateOfBirth.toISOString().slice(0, 10)
    );

    if (age < 13) {
      throw new Error("Paciente deve ter pelo menos 13 anos.");
    }

    if (
      !this.validations.validateTime(startTime) ||
      !this.validations.validateTime(endTime)
    ) {
      throw new Error("Horário inválido.");
    }

    const currentDate = DateTime.now();
    const selectedDate = DateTime.fromFormat(date, "dd/MM/yyyy");
    const selectedStartTime = DateTime.fromFormat(startTime, "HHmm");
    const selectedEndTime = DateTime.fromFormat(endTime, "HHmm");

    if (
      selectedDate < currentDate ||
      (selectedDate.equals(currentDate) && selectedStartTime <= currentDate)
    ) {
      throw new Error("O agendamento deve ser para um período futuro.");
    }

    if (selectedEndTime <= selectedStartTime) {
      throw new Error("A hora final deve ser maior que a hora inicial.");
    }

    const appointmentStartTime =
      selectedStartTime.minute % 15 === 0
        ? selectedStartTime
        : selectedStartTime.plus({
            minutes: 15 - (selectedStartTime.minute % 15),
          });

    const appointmentEndTime =
      selectedEndTime.minute % 15 === 0
        ? selectedEndTime
        : selectedEndTime.minus({ minutes: selectedEndTime.minute % 15 });

    if (
      appointmentStartTime.hour < 8 ||
      appointmentEndTime.hour > 19 ||
      appointmentStartTime > appointmentEndTime
    ) {
      throw new Error("Horários de agendamento fora dos limites ou inválidos.");
    }

    const existingAppointment =
      await this.appointmentRepository.findByDateAndTime(
        selectedDate.toJSDate(),
        appointmentStartTime.toFormat("HHmm")
      );

    if (existingAppointment) {
      throw new Error("Já existe um agendamento para esse horário.");
    }

    const futureAppointments = await this.appointmentRepository.getByDateRange(
      currentDate.plus({ days: 1 }).toJSDate(),
      currentDate.plus({ years: 1 }).toJSDate()
    );

    const hasFutureAppointment = futureAppointments.some(
      (appointment) => appointment.patientId === patient.id
    );

    if (hasFutureAppointment) {
      throw new Error("O paciente já possui um agendamento futuro.");
    }

    const appointment = new Appointment({
      patientId: patient.id,
      date: selectedDate.toJSDate(),
      startTime: appointmentStartTime.toFormat("HHmm"),
      endTime: appointmentEndTime.toFormat("HHmm"),
    });

    await this.appointmentRepository.add(appointment);
  }

  async cancelAppointment(
    cpf: string,
    date: string,
    startTime: string
  ): Promise<void> {
    const patient = await this.patientRepository.findByCPF(cpf);

    if (!patient) {
      throw new Error("Paciente não encontrado.");
    }

    const currentDate = DateTime.now();
    const selectedDate = DateTime.fromFormat(date, "dd/MM/yyyy");
    const selectedStartTime = DateTime.fromFormat(startTime, "HHmm");

    if (
      selectedDate < currentDate ||
      (selectedDate.equals(currentDate) && selectedStartTime < currentDate)
    ) {
      throw new Error(
        "O cancelamento só pode ser realizado para um agendamento futuro."
      );
    }

    const appointment = await this.appointmentRepository.findByDateAndTime(
      selectedDate.toJSDate(),
      selectedStartTime.toFormat("HHmm")
    );

    if (!appointment) {
      throw new Error("Agendamento não encontrado.");
    }

    await this.appointmentRepository.deleteByDateAndTime(
      selectedDate.toJSDate(),
      selectedStartTime.toFormat("HHmm")
    );
  }

  async listAppointments(
    startDate?: string,
    endDate?: string
  ): Promise<Appointment[]> {
    let startDateTime: DateTime;
    let endDateTime: DateTime;

    if (startDate && endDate) {
      if (
        !this.validations.validateDate(startDate) ||
        !this.validations.validateDate(endDate)
      ) {
        throw new Error("Datas inválidas.");
      }

      startDateTime = DateTime.fromFormat(startDate, "dd/MM/yyyy");
      endDateTime = DateTime.fromFormat(endDate, "dd/MM/yyyy");

      if (endDateTime < startDateTime) {
        throw new Error("A data final deve ser posterior à data inicial.");
      }
    } else {
      // Caso não sejam fornecidas datas, listaremos toda a agenda
      startDateTime = DateTime.fromObject({ year: 1900 }); // Data mínima
      endDateTime = DateTime.now().plus({ years: 100 }); // Data máxima
    }

    const appointments = await this.appointmentRepository.getByDateRange(
      startDateTime.toJSDate(),
      endDateTime.toJSDate()
    );

    return appointments;
  }
}

export { AppointmentService };
