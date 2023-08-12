import { inputOutputView } from "../indexView.js";

class MenusView {
  private ui: inputOutputView;

  constructor(ui: inputOutputView) {
    this.ui = ui;
  }

  showMainMenu() {
    this.ui.showOutput("\nMenu Principal");
    this.ui.showOutput("1 - Administração de pacientes");
    this.ui.showOutput("2 - Acessar agenda");
    this.ui.showOutput("3 - Sair");
  }

  showAgendaMenu() {
    this.ui.showOutput("\nMenu da Agenda");
    this.ui.showOutput("1 - Agendar consulta");
    this.ui.showOutput("2 - Cancelar agendamento");
    this.ui.showOutput("3 - Listar agenda");
    this.ui.showOutput("4 - Voltar para o menu principal");
  }

  showPatientRegistrationMenu() {
    this.ui.showOutput("\nMenu do Cadastro de Pacientes");
    this.ui.showOutput("1 - Cadastrar novo paciente");
    this.ui.showOutput("2 - Excluir paciente");
    this.ui.showOutput("3 - Listar pacientes (ordenado por CPF)");
    this.ui.showOutput("4 - Listar pacientes (ordenado por nome)");
    this.ui.showOutput("5 - Voltar para o menu principal");
  }
}

export default MenusView;
