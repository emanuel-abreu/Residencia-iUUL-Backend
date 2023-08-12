import { inputOutputView } from "../indexView.js";

class PatientRegistrationView {
  private ui: inputOutputView;

  constructor(ui: inputOutputView) {
    this.ui = ui;
  }

  addPatientView(): void {
    const cpf = this.ui.getInput("Digite o CPF do paciente: ");
    const name = this.ui.getInput("Digite o nome do paciente: ");
    const dateOfBirth = this.ui.getInput(
      "Digite a data de nascimento do paciente: "
    );
  }
}

export default PatientRegistrationView;
