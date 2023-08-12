import * as readlineSync from "readline-sync";

import Menus from "../View/Output/menus-view.js";

class ViewController {
  private view: Menus;

  constructor(view: Menus) {
    this.view = view;
  }

  getInput(prompt: string): string {
    return readlineSync.question(prompt);
  }

  execute(): void {
    //   getInput fica na pasta de Inputs (usa o readline question)
    const option = this.view.getInput("Escolha uma opção: ");

    do {
      this.view.showMainMenu();

      switch (option) {
        case "1":
          let optionPatientRegistry;

          do {
            this.view.showPatientRegistrationMenu();
            const optionPatientRegistry = getInput("Digite a opção desejada: ");

            switch (optionPatientRegistry) {
              case "1":
                this.cadastrarPaciente();
                break;
              case "2":
                this.excluirPaciente();
                break;
              case "3":
                this.listarPacientesOrdenadoPorCPF();
                break;
              case "4":
                this.listarPacientesOrdenadoPorNome();
                break;
              case "5":
                break;
              default:
                console.log("Opção inválida. Digite novamente.");
                break;
            }
          } while (optionPatientRegistry !== "5");

          break;
        case "2":
          this.view.showAgendaMenu();
          const agendaOption = getInput("Digite a opção desejada: ");

          switch (agendaOption) {
            case "1":
              this.agendarConsulta();
              break;
            case "2":
              this.cancelarAgendamento();
              break;
            case "3":
              this.listarAgenda();
              break;
            case "4":
              break;
            default:
              console.log("Opção inválida. Digite novamente.");
              break;
          }
          break;
        case "3":
          console.log("Encerrando o programa...");
          break;
        default:
          console.log("Opção inválida. Digite novamente.");
          break;
      }
    } while (option !== "3");
  }
}

export { ViewController };
