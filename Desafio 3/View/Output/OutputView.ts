import { InputOutputProvider } from "../Interface/IoutputinputProvider.js";

class OutputView {
  private ioProvider: InputOutputProvider;

  constructor(ioProvider: InputOutputProvider) {
    this.ioProvider = ioProvider;
  }

  showOutput(message: string): void {
    console.log(message);
  }

  calendarListinView(): void {
    this.ioProvider.showOutput(`Data inicial: ${agenda.dateOfConsultation}`);
    this.ioProvider.showOutput(`Data final: ${agenda.dateOfConsultation}\n`);

    this.ioProvider.showOutput(
      "========================================================"
    );
    this.ioProvider.showOutput("\tData\tH.Ini  H.Fim  Tempo  Nome\t\tDt.Nasc.");
    this.ioProvider.showOutput(
      "========================================================"
    );

    // Imprimir a quantidade de pacientes necessaria
    // fazer a consulta no Banco de colocar no template string as consultas
    this.ioProvider.showOutput(
      `${agenda.dateOfConsultation} ${agenda.startTime}  ${agenda.endTime} ${agenda.time} ${agenda.name} ${agenda.dateOfBirth}`
    );

    this.ioProvider.showOutput(
      "========================================================"
    );
  }

  listPatientsView(): void {
    this.ioProvider.showOutput("---------------------------------------");
    this.ioProvider.showOutput("CPF\tNome\t\tData de Nascimento\tIdade");
    this.ioProvider.showOutput("---------------------------------------");

    // fazer a consulta no Banco de colocar no template string as consultas
    this.ioProvider.showOutput(
      `${patient.cpf} ${patient.name} \t ${patient.dateOfBirth} ${patient.age}`
    );

    // fazer a consulta no Banco de colocar no template string
    this.ioProvider.showOutput(
      `\nAgendado para: ${consulta.dateOfConsultation}`
    );
    this.ioProvider.showOutput(
      `\n${consulta.startTime} às ${consulta.endTime}`
    );
    this.ioProvider.showOutput("---------------------------------------");
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
