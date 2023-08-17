import { Op } from "sequelize";
import { IAppointmentRepository } from "../Interfaces/interface-patient-repository.js";
import { Appointment } from "../Models/AppointmentModel.js";

class AppointmentRepository implements IAppointmentRepository {
  async add(appointment: Appointment): Promise<void> {
    await appointment.save();
  }

  async findByDateAndTime(
    date: Date,
    startTime: string
  ): Promise<Appointment | null> {
    return Appointment.findOne({
      where: { date, startTime },
    });
  }

  async getAll(): Promise<Appointment[]> {
    return Appointment.findAll();
  }

  async getByDateRange(start: Date, end: Date): Promise<Appointment[]> {
    return Appointment.findAll({
      where: { date: { [Op.between]: [start, end] } },
    });
  }

  async deleteByCPF(cpf: string): Promise<void> {
    await Appointment.destroy({
      where: { cpf },
    });
  }

  async deleteByDateAndTime(date: Date, startTime: string): Promise<void> {
    await Appointment.destroy({
      where: { date, startTime },
    });
  }
}

export { AppointmentRepository };
