class Menus {
  showMainMenu() {
    console.log("\nMenu Principal");
    console.log("1 - Administração de pacientes");
    console.log("2 - Acessar agenda");
    console.log("3 - Sair");
  }

  showAgendaMenu() {
    console.log("\nMenu da Agenda");
    console.log("1 - Agendar consulta");
    console.log("2 - Cancelar agendamento");
    console.log("3 - Listar agenda");
    console.log("4 - Voltar para o menu principal");
  }

  showPatientRegistrationMenu() {
    console.log("\nMenu do Cadastro de Pacientes");
    console.log("1 - Cadastrar novo paciente");
    console.log("2 - Excluir paciente");
    console.log("3 - Listar pacientes (ordenado por CPF)");
    console.log("4 - Listar pacientes (ordenado por nome)");
    console.log("5 - Voltar para o menu principal");
  }
}

export default Menus;
