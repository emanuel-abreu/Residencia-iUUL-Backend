import { inputOutputView } from "../indexView.js";

class ExclusionPatientView {
  private ui: inputOutputView;

  constructor(ui: inputOutputView) {
    this.ui = ui;
  }

  exclusionPatientView(): void {
    const cpf = this.ui.getInput("Digite o CPF do paciente: ");
  }
}

export default ExclusionPatientView;
