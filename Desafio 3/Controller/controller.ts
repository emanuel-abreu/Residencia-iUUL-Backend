import { InputOutputProviderImpl } from "../View/Input/InputOutputProviderImpl.js";
import { OutputView } from "../View/Output/OutputView.js";
import {
  IPatientRepository,
  IAppointmentRepository,
} from "../Model/Interfaces/interface-patient-repository.js";
import { PatientService } from "../Service/PatientService.js";
import { ValidationUtils } from "../Validations/Validations.js";
import { AppointmentService } from "../Service/AppointmentService.js";
import { sequelize } from "../database/connectionBD.js";

await sequelize.sync({ alter: true });

class Controller {
  private ioProvider: InputOutputProviderImpl;
  private outputView: OutputView;
  private patientRepository: IPatientRepository;
  private appointmentRepository: IAppointmentRepository;

  constructor(
    ioProvider: InputOutputProviderImpl,
    outputView: OutputView,
    patientRepository: IPatientRepository,
    appointmentRepository: IAppointmentRepository
  ) {
    this.ioProvider = ioProvider;
    this.outputView = outputView;
    this.patientRepository = patientRepository;
    this.appointmentRepository = appointmentRepository;
  }

  async run(): Promise<void> {
    this.outputView.showMainMenu();

    const option = this.ioProvider.getInput("Escolha uma opção: ");

    switch (option) {
      case "1":
        await this.handlePatientActions();
        break;
      case "2":
        await this.handleAgendaActions();
        break;
      case "3":
        this.ioProvider.showOutput("Encerrando o programa...");
        break;
      default:
        this.ioProvider.showOutput("Opção inválida. Digite novamente.");
        break;
    }
  }

  async handlePatientActions(): Promise<void> {
    this.outputView.showPatientRegistrationMenu();

    const patientOption = this.ioProvider.getInput("Digite a opção desejada: ");

    switch (patientOption) {
      case "1":
        await this.cadastrarPaciente();
        break;
      case "2":
        await this.excluirPaciente();
        break;
      case "3":
        await this.listarPacientesOrdenadoPorCPF();
        break;
      case "4":
        await this.listarPacientesOrdenadoPorNome();
        break;
      case "5":
        this.outputView.showMainMenu();
        break;
      default:
        this.ioProvider.showOutput("Opção inválida. Digite novamente.");
        break;
    }
  }

  async handleAgendaActions(): Promise<void> {
    this.outputView.showAgendaMenu();

    const agendaOption = this.ioProvider.getInput("Digite a opção desejada: ");

    switch (agendaOption) {
      case "1":
        await this.agendarConsulta();
        break;
      case "2":
        await this.cancelarAgendamento();
        break;
      case "3":
        await this.listarAgenda();
        break;
      case "4":
        this.outputView.showMainMenu();
        break;
      default:
        this.ioProvider.showOutput("Opção inválida. Digite novamente.");
        break;
    }
  }

  async cadastrarPaciente(): Promise<void> {
    const cpf = this.ioProvider.getInput("Digite o CPF do paciente: ");
    const name = this.ioProvider.getInput("Digite o nome do paciente: ");
    const dateOfBirth = this.ioProvider.getInput(
      "Digite a data de nascimento do paciente (DD/MM/AAAA): "
    );

    try {
      const patientService = new PatientService(
        this.appointmentRepository,
        this.patientRepository,
        new ValidationUtils()
      );

      await patientService.createPatient(cpf, name, dateOfBirth);
      this.ioProvider.showOutput("Paciente cadastrado com sucesso!");
    } catch (error) {
      this.ioProvider.showOutput(
        `Erro ao cadastrar paciente: ${(error as Error).message}`
      );
    }
  }

  async excluirPaciente(): Promise<void> {
    const cpf = this.ioProvider.getInput(
      "Digite o CPF do paciente que deseja excluir: "
    );

    try {
      const patientService = new PatientService(
        this.appointmentRepository,
        this.patientRepository,
        new ValidationUtils()
      );

      await patientService.deletePatient(cpf);
      this.ioProvider.showOutput("Paciente excluído com sucesso!");
    } catch (error) {
      this.ioProvider.showOutput(
        `Erro ao excluir paciente: ${(error as Error).message}`
      );
    }
  }

  async listarPacientesOrdenadoPorCPF(): Promise<void> {
    try {
      const patientService = new PatientService(
        this.appointmentRepository,
        this.patientRepository,
        new ValidationUtils()
      );

      const patients = await patientService.listPatients();
      this.outputView.listPatientsView(patients);
    } catch (error) {
      this.ioProvider.showOutput(
        `Erro ao listar pacientes: ${(error as Error).message}`
      );
    }
  }

  async listarPacientesOrdenadoPorNome(): Promise<void> {
    try {
      const patientService = new PatientService(
        this.appointmentRepository,
        this.patientRepository,
        new ValidationUtils()
      );

      const patients = await patientService.listPatients();
      this.outputView.listPatientsView(patients);
    } catch (error) {
      this.ioProvider.showOutput(
        `Erro ao listar pacientes: ${(error as Error).message}`
      );
    }
  }

  // Funções específicas do menu de agenda

  async agendarConsulta(): Promise<void> {
    const cpf = this.ioProvider.getInput("Digite o CPF do paciente: ");
    const date = this.ioProvider.getInput(
      "Digite a data da consulta (DD/MM/AAAA): "
    );
    const startTime = this.ioProvider.getInput(
      "Digite a hora de início da consulta (HHmm): "
    );
    const endTime = this.ioProvider.getInput(
      "Digite a hora de término da consulta (HHmm): "
    );

    try {
      const appointmentService = new AppointmentService(
        new ValidationUtils(),
        this.patientRepository,
        this.appointmentRepository
      );

      await appointmentService.createAppointment(cpf, date, startTime, endTime);
      this.ioProvider.showOutput("Consulta agendada com sucesso!");
    } catch (error) {
      this.ioProvider.showOutput(
        `Erro ao agendar consulta: ${(error as Error).message}`
      );
    }
  }

  async cancelarAgendamento(): Promise<void> {
    const cpf = this.ioProvider.getInput("Digite o CPF do paciente: ");
    const date = this.ioProvider.getInput(
      "Digite a data da consulta (DD/MM/AAAA): "
    );
    const startTime = this.ioProvider.getInput(
      "Digite a hora de início da consulta (HHmm): "
    );

    try {
      const appointmentService = new AppointmentService(
        new ValidationUtils(),
        this.patientRepository,
        this.appointmentRepository
      );

      await appointmentService.cancelAppointment(cpf, date, startTime);
      this.ioProvider.showOutput("Agendamento cancelado com sucesso!");
    } catch (error) {
      this.ioProvider.showOutput(
        `Erro ao cancelar agendamento: ${(error as Error).message}`
      );
    }
  }

  async listarAgenda(): Promise<void> {
    const startDate = this.ioProvider.getInput(
      "Digite a data de início (DD/MM/AAAA): "
    );
    const endDate = this.ioProvider.getInput(
      "Digite a data de término (DD/MM/AAAA): "
    );

    try {
      const appointmentService = new AppointmentService(
        new ValidationUtils(),
        this.patientRepository,
        this.appointmentRepository
      );

      const appointments = await appointmentService.listAppointments(
        startDate,
        endDate
      );
      this.outputView.listAgendaView(appointments);
    } catch (error) {
      this.ioProvider.showOutput(
        `Erro ao listar a agenda: ${(error as Error).message}`
      );
    }
  }
}

export { Controller };
