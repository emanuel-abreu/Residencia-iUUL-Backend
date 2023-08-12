import { inputOutputView } from "../indexView.js";

class ListPatientsView {
  private ui: inputOutputView;

  constructor(ui: inputOutputView) {
    this.ui = ui;
  }

  listPatientsView(): void {
    this.ui.showOutput("---------------------------------------");
    this.ui.showOutput("CPF\tNome\t\tData de Nascimento\tIdade");
    this.ui.showOutput("---------------------------------------");

    // fazer a consulta no Banco de colocar no template string as consultas
    this.ui.showOutput(
      `${patient.cpf} ${patient.name} \t ${patient.dateOfBirth} ${patient.age}`
    );

    // fazer a consulta no Banco de colocar no template string
    this.ui.showOutput(`\nAgendado para: ${consulta.dateOfConsultation}`);
    this.ui.showOutput(`\n${consulta.startTime} às ${consulta.endTime}`);
    this.ui.showOutput("---------------------------------------");
  }
}

export default ListPatientsView;
