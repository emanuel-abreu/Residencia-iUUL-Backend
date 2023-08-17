import { InputView } from "../View/Input/InputView.js";
import { OutputView } from "../View/Output/OutputView.js";
import {
  IPatientRepository,
  IAppointmentRepository,
} from "../Model/Interfaces/interface-patient-repository.js";
import { PatientService } from "../Service/PatientService.js";
import { ValidationUtils } from "../Validations/Validations.js";
import { AppointmentService } from "../Service/AppointmentService.js";

class Controller {
  private inputView: InputView;
  private outputView: OutputView;
  private patientRepository: IPatientRepository;
  private appointmentRepository: IAppointmentRepository;

  constructor(
    inputView: InputView,
    outputView: OutputView,
    patientRepository: IPatientRepository,
    appointmentRepository: IAppointmentRepository
  ) {
    this.inputView = inputView;
    this.outputView = outputView;
    this.patientRepository = patientRepository;
    this.appointmentRepository = appointmentRepository;
  }

  async run(): Promise<void> {
    this.outputView.showMainMenu();

    const option = this.inputView.getInput("Escolha uma opção: ");

    switch (option) {
      case "1":
        await this.handlePatientActions();
        break;
      case "2":
        await this.handleAgendaActions();
        break;
      case "3":
        this.outputView.showOutput("Encerrando o programa...");
        break;
      default:
        this.outputView.showOutput("Opção inválida. Digite novamente.");
        break;
    }
  }

  async handlePatientActions(): Promise<void> {
    this.outputView.showPatientRegistrationMenu();

    const patientOption = this.inputView.getInput("Digite a opção desejada: ");

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
        break;
      default:
        this.outputView.showOutput("Opção inválida. Digite novamente.");
        break;
    }
  }

  async handleAgendaActions(): Promise<void> {
    this.outputView.showAgendaMenu();

    const agendaOption = this.inputView.getInput("Digite a opção desejada: ");

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
        break;
      default:
        this.outputView.showOutput("Opção inválida. Digite novamente.");
        break;
    }
  }

  async cadastrarPaciente(): Promise<void> {
    const cpf = this.inputView.getInput("Digite o CPF do paciente: ");
    const name = this.inputView.getInput("Digite o nome do paciente: ");
    const dateOfBirth = this.inputView.getInput(
      "Digite a data de nascimento do paciente (DD/MM/AAAA): "
    );

    try {
      const patientService = new PatientService(
        this.appointmentRepository,
        this.patientRepository,
        new ValidationUtils()
      );

      await patientService.createPatient(cpf, name, dateOfBirth);
      this.outputView.showOutput("Paciente cadastrado com sucesso!");
    } catch (error) {
      this.outputView.showOutput(
        `Erro ao cadastrar paciente: ${(error as Error).message}`
      );
    }
  }

  async excluirPaciente(): Promise<void> {
    const cpf = this.inputView.getInput(
      "Digite o CPF do paciente que deseja excluir: "
    );

    try {
      const patientService = new PatientService(
        this.appointmentRepository,
        this.patientRepository,
        new ValidationUtils()
      );

      await patientService.deletePatient(cpf);
      this.outputView.showOutput("Paciente excluído com sucesso!");
    } catch (error) {
      this.outputView.showOutput(
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
      this.outputView.showOutput(
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
      this.outputView.showOutput(
        `Erro ao listar pacientes: ${(error as Error).message}`
      );
    }
  }

  // Funções específicas do menu de agenda

  async agendarConsulta(): Promise<void> {
    const cpf = this.inputView.getInput("Digite o CPF do paciente: ");
    const date = this.inputView.getInput(
      "Digite a data da consulta (DD/MM/AAAA): "
    );
    const startTime = this.inputView.getInput(
      "Digite a hora de início da consulta (HHmm): "
    );
    const endTime = this.inputView.getInput(
      "Digite a hora de término da consulta (HHmm): "
    );

    try {
      const appointmentService = new AppointmentService(
        new ValidationUtils(),
        this.patientRepository,
        this.appointmentRepository
      );

      await appointmentService.createAppointment(cpf, date, startTime, endTime);
      this.outputView.showOutput("Consulta agendada com sucesso!");
    } catch (error) {
      this.outputView.showOutput(
        `Erro ao agendar consulta: ${(error as Error).message}`
      );
    }
  }

  async cancelarAgendamento(): Promise<void> {
    const cpf = this.inputView.getInput("Digite o CPF do paciente: ");
    const date = this.inputView.getInput(
      "Digite a data da consulta (DD/MM/AAAA): "
    );
    const startTime = this.inputView.getInput(
      "Digite a hora de início da consulta (HHmm): "
    );

    try {
      const appointmentService = new AppointmentService(
        new ValidationUtils(),
        this.patientRepository,
        this.appointmentRepository
      );

      await appointmentService.cancelAppointment(cpf, date, startTime);
      this.outputView.showOutput("Agendamento cancelado com sucesso!");
    } catch (error) {
      this.outputView.showOutput(
        `Erro ao cancelar agendamento: ${(error as Error).message}`
      );
    }
  }

  async listarAgenda(): Promise<void> {
    const startDate = this.inputView.getInput(
      "Digite a data de início (DD/MM/AAAA): "
    );
    const endDate = this.inputView.getInput(
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
      this.outputView.showOutput(
        `Erro ao listar a agenda: ${(error as Error).message}`
      );
    }
  }
}

export { Controller };
