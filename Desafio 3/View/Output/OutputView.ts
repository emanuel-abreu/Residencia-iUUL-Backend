import { Patient } from "../../Model/Models/PatientModel.js";
import { Appointment } from "../../Model/Models/AppointmentModel.js";

import { ValidationUtils } from "../../Validations/Validations.js";
import { InputOutputProviderImpl } from "../Input/InputOutputProviderImpl.js";

class OutputView {
  private ioProvider: InputOutputProviderImpl;

  private validations: ValidationUtils;

  constructor(ioProvider: InputOutputProviderImpl) {
    this.ioProvider = ioProvider;
    this.validations = new ValidationUtils();
  }

  listPatientsView(patients: Patient[]): void {
    this.ioProvider.showOutput(
      "------------------------------------------------------------"
    );
    this.ioProvider.showOutput("CPF\t\tNome\t\tDt.Nasc.\tIdade");
    this.ioProvider.showOutput(
      "------------------------------------------------------------"
    );

    for (const patient of patients) {
      const formattedDateOfBirth = patient.dateOfBirth
        .toISOString()
        .slice(0, 10);
      const age = this.validations.calculateAge(formattedDateOfBirth);
      this.ioProvider.showOutput(
        `${patient.cpf}\t${patient.name}\t${formattedDateOfBirth}\t${age}`
      );
    }

    this.ioProvider.showOutput(
      "------------------------------------------------------------"
    );
  }

  listAgendaView(appointments: Appointment[]): // appointments: Appointment[],

  void {
    this.ioProvider.showOutput(
      "-------------------------------------------------------------"
    );
    this.ioProvider.showOutput("Data");
    this.ioProvider.showOutput("H.Ini H.Fim Tempo Nome");
    this.ioProvider.showOutput("Dt.Nasc.");
    this.ioProvider.showOutput(
      "-------------------------------------------------------------"
    );

    // for (const appointment of appointments) {
    //   const formattedDate = appointment.date.toISOString().slice(0, 10);

    //   const patient = this.patientRepository.findByCPF(appointment.patientId);

    //   if (patient) {
    //     const age = this.validations.calculateAge(
    //       patient.dateOfBirth.toISOString().slice(0, 10)
    //     );

    //     this.ioProvider.showOutput(
    //       `${formattedDate} ${appointment.startTime} ${appointment.endTime} ${
    //         appointment.time
    //       } ${patient.name} ${patient.dateOfBirth
    //         .toISOString()
    //         .slice(0, 10)} ${age}`
    //     );
    //   }
    // }

    this.ioProvider.showOutput(
      "-------------------------------------------------------------"
    );
  }

  showMainMenu() {
    this.ioProvider.showOutput("\nMenu Principal");
    this.ioProvider.showOutput("1 - Administração de pacientes");
    this.ioProvider.showOutput("2 - Acessar agenda");
    this.ioProvider.showOutput("3 - Sair");
  }

  showAgendaMenu() {
    this.ioProvider.showOutput("\nMenu da Agenda");
    this.ioProvider.showOutput("1 - Agendar consulta");
    this.ioProvider.showOutput("2 - Cancelar agendamento");
    this.ioProvider.showOutput("3 - Listar agenda");
    this.ioProvider.showOutput("4 - Voltar para o menu principal");
  }

  showPatientRegistrationMenu() {
    this.ioProvider.showOutput("\nMenu do Cadastro de Pacientes");
    this.ioProvider.showOutput("1 - Cadastrar novo paciente");
    this.ioProvider.showOutput("2 - Excluir paciente");
    this.ioProvider.showOutput("3 - Listar pacientes (ordenado por CPF)");
    this.ioProvider.showOutput("4 - Listar pacientes (ordenado por nome)");
    this.ioProvider.showOutput("5 - Voltar para o menu principal");
  }
}

export { OutputView };
