import { inputOutputView } from "../indexView.js";

class AppointmentSchedulingView {
  private ui: inputOutputView;

  constructor(ui: inputOutputView) {
    this.ui = ui;
  }

  addAppointmentView(): void {
    const cpf = this.ui.getInput("Digite o CPF do paciente: ");
    // validar antes de perguntar os outros campos

    const dateOfConsultation = this.ui.getInput("Digite o data da consulta: ");
    const startTime = this.ui.getInput("Digite a hora inicial da consulta: ");
    const endTime = this.ui.getInput("Digite a hora final da consulta: ");
  }
}

export default AppointmentSchedulingView;
