import { inputOutputView } from "../indexView.js";

class CancellationConsultationView {
  private ui: inputOutputView;

  constructor(ui: inputOutputView) {
    this.ui = ui;
  }

  exclusionAppointmentView(): void {
    const cpf = this.ui.getInput("Digite o CPF do paciente: ");
    const dateOfConsultation = this.ui.getInput(
      "Digite o data da consulta marcada: "
    );
    const startTime = this.ui.getInput(
      "Digite a hora inicial da consulta marcada: "
    );
  }
}

export default CancellationConsultationView;
