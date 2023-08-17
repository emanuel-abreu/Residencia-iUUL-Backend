import { InputView } from "../View/Input/InputView.js";
import { OutputView } from "../View/Output/OutputView.js";
import {
  IPatientRepository,
  IAppointmentRepository,
} from "../Model/Interfaces/interface-patient-repository.js";
import { Patient } from "../Model/Models/PatientModel.js";
import { Appointment } from "../Model/Models/AppointmentModel.js";

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

  // Funções específicas do menu de pacientes

  async cadastrarPaciente(): Promise<void> {
    const cpf = this.inputView.getInput("Digite o CPF do paciente: ");
    const name = this.inputView.getInput("Digite o nome do paciente: ");
    const dateOfBirth = this.inputView.getInput(
      "Digite a data de nascimento do paciente (DD/MM/AAAA): "
    );

    try {
      const newPatient = new Patient(cpf, name, dateOfBirth);
      this.patientRepository.add(newPatient);
      this.outputView.showOutput("Paciente cadastrado com sucesso!");
    } catch (error) {
      this.outputView.showOutput(
        `Erro ao cadastrar paciente: ${error.message}`
      );
    }
  }

  async excluirPaciente(): Promise<void> {
    const cpf = this.inputView.getInput(
      "Digite o CPF do paciente que deseja excluir: "
    );

    try {
      const deleted = this.patientRepository.delete(cpf);
      if (deleted) {
        this.outputView.showOutput("Paciente excluído com sucesso!");
      } else {
        this.outputView.showOutput(
          "Paciente não encontrado ou possui agendamentos futuros."
        );
      }
    } catch (error) {
      this.outputView.showOutput(`Erro ao excluir paciente: ${error.message}`);
    }
  }

  async listarPacientesOrdenadoPorCPF(): Promise<void> {
    try {
      const patients = this.patientRepository.getAllOrderedByCPF();
      this.outputView.showPatientList(patients);
    } catch (error) {
      this.outputView.showOutput(`Erro ao listar pacientes: ${error.message}`);
    }
  }

  async listarPacientesOrdenadoPorNome(): Promise<void> {
    try {
      const patients = this.patientRepository.getAllOrderedByName();
      this.outputView.showPatientList(patients);
    } catch (error) {
      this.outputView.showOutput(`Erro ao listar pacientes: ${error.message}`);
    }
  }

  // Funções específicas do menu de agenda

  async agendarConsulta(): Promise<void> {
    // Implementar a lógica para agendar uma consulta
    // Utilize this.inputView e this.outputView para interagir com a View
  }

  async cancelarAgendamento(): Promise<void> {
    // Implementar a lógica para cancelar um agendamento
    // Utilize this.inputView e this.outputView para interagir com a View
  }

  async listarAgenda(): Promise<void> {
    // Implementar a lógica para listar a agenda
    // Utilize this.appointmentRepository e this.outputView para interagir com o Model e a View
  }
}

export { Controller };
