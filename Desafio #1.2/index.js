const prompt = require("prompt-sync")({ sigint: true });
const { DateTime } = require("luxon");

class Paciente {
  #nome;
  #cpf;
  #dataNascimento;

  constructor(nome, cpf, dataNascimento) {
    this.#nome = nome;
    this.#cpf = cpf;
    this.#dataNascimento = dataNascimento;
  }

  get nome() {
    return this.#nome;
  }

  get cpf() {
    return this.#cpf;
  }

  get dataNascimento() {
    return this.#dataNascimento;
  }
}

class ManterPaciente {
  #pacientes;
  #consultas;
  #agendamentoConsultas;

  constructor() {
    this.#pacientes = [];
    this.#consultas = [];
    this.#agendamentoConsultas = new AgendamentoConsultas(
      this.#pacientes,
      this.#consultas
    );
  }

  cadastrarPaciente() {
    let cpfValido = false;
    let nomeValido = false;
    let dataValida = false;
    let pacienteDuplicado = false;
    let pacienteIdadeValida = false;

    let nome;
    let cpf;
    let dataNascimento;

    do {
      cpf = prompt("Digite o CPF do paciente: ");
      cpfValido = ValidacaoUtils.validarCPF(cpf);

      if (!cpfValido) {
        console.log("CPF inválido. Digite novamente.");
      } else if (this.#pacientes.some((paciente) => paciente.cpf === cpf)) {
        console.log("Já existe um paciente com esse CPF. Digite novamente.");
      }
    } while (!cpfValido || pacienteDuplicado);

    do {
      nome = prompt("Digite o nome do paciente: ");
      nomeValido = nome.length >= 5;

      if (!nomeValido) {
        console.log("Nome inválido. Digite novamente.");
      }
    } while (!nomeValido);

    do {
      dataNascimento = prompt("Digite a data de nascimento (DD/MM/AAAA): ");
      dataValida = ValidacaoUtils.validarData(dataNascimento);

      if (!dataValida) {
        console.log("Data de nascimento inválida. Digite novamente.");
      } else {
        const idade = ValidacaoUtils.calcularIdade(dataNascimento);

        if (idade < 13) {
          console.log("O paciente deve ter 13 anos ou mais. Digite novamente.");
          pacienteIdadeValida = false;
        } else {
          pacienteIdadeValida = true;
        }
      }
    } while (!dataValida || !pacienteIdadeValida);

    const novoPaciente = new Paciente(nome, cpf, dataNascimento);
    this.#pacientes.push(novoPaciente);

    console.log("Paciente cadastrado com sucesso!");
  }

  excluirPaciente() {
    let cpf;
    let paciente;

    do {
      cpf = prompt("Digite o CPF do paciente a ser excluído: ");
      paciente = this.#pacientes.find((pac) => pac.cpf === cpf);

      if (!paciente) {
        console.log("Paciente não encontrado. Digite novamente.");
      } else {
        const consultasFuturas = this.#consultas.filter(
          (consulta) =>
            consulta.paciente.cpf === cpf && consulta.data > DateTime.now()
        );

        if (consultasFuturas.length > 0) {
          console.log(
            "O paciente possui consultas agendadas para o futuro. Não é possível excluí-lo."
          );
          paciente = null;
        }
      }
    } while (!paciente);

    const consultasPassadas = this.#consultas.filter(
      (consulta) =>
        consulta.paciente.cpf === cpf && consulta.data <= DateTime.now()
    );

    this.#pacientes = this.#pacientes.filter((pac) => pac.cpf !== cpf);
    this.#consultas = this.#consultas.filter(
      (consulta) => !consultasPassadas.includes(consulta)
    );

    console.log("Paciente excluído com sucesso!");
  }

  listarPacientesOrdenadoPorCPF() {
    this.#pacientes.sort((paciente1, paciente2) =>
      paciente1.cpf.localeCompare(paciente2.cpf)
    );

    console.log("---------------------------------------");
    console.log("CPF\t\tNome\t\tData de Nascimento\tIdade");
    console.log("---------------------------------------");

    this.#pacientes.forEach((paciente) => {
      const idade = ValidacaoUtils.calcularIdade(paciente.dataNascimento);

      console.log(
        `${paciente.cpf}\t${paciente.nome}\t${paciente.dataNascimento}\t\t${idade}`
      );

      const consultasFuturas = this.#consultas.filter(
        (consulta) =>
          consulta.paciente.cpf === paciente.cpf &&
          consulta.data > DateTime.now()
      );

      if (consultasFuturas.length > 0) {
        console.log("Agendado para:");

        consultasFuturas.forEach((consulta) => {
          console.log(consulta.data);
          console.log(`${consulta.horario} às ${consulta.horarioFim}`);
        });
      }

      console.log("---------------------------------------");
    });
  }

  listarPacientesOrdenadoPorNome() {
    this.#pacientes.sort((paciente1, paciente2) =>
      paciente1.nome.localeCompare(paciente2.nome)
    );

    console.log("---------------------------------------");
    console.log("Nome\t\tCPF\t\tData de Nascimento\tIdade");
    console.log("---------------------------------------");

    this.#pacientes.forEach((paciente) => {
      const idade = ValidacaoUtils.calcularIdade(paciente.dataNascimento);

      console.log(
        `${paciente.nome}\t${paciente.cpf}\t${paciente.dataNascimento}\t\t${idade}`
      );

      const consultasFuturas = this.#consultas.filter(
        (consulta) =>
          consulta.paciente.cpf === paciente.cpf &&
          consulta.data > DateTime.now()
      );

      if (consultasFuturas.length > 0) {
        console.log("Agendado para:");

        consultasFuturas.forEach((consulta) => {
          console.log(consulta.data);
          console.log(`${consulta.horario} às ${consulta.horarioFim}`);
        });
      }

      console.log("---------------------------------------");
    });
  }

  mostrarMenuAgenda() {
    console.log("\nMenu da Agenda");
    console.log("1 - Agendar consulta");
    console.log("2 - Cancelar agendamento");
    console.log("3 - Listar agenda");
    console.log("4 - Voltar para o menu principal");
  }

  mostrarMenuCadastroPacientes() {
    console.log("\nMenu do Cadastro de Pacientes");
    console.log("1 - Cadastrar novo paciente");
    console.log("2 - Excluir paciente");
    console.log("3 - Listar pacientes (ordenado por CPF)");
    console.log("4 - Listar pacientes (ordenado por nome)");
    console.log("5 - Voltar para o menu principal");
  }

  executar() {
    let opcao;

    do {
      console.log("\nMenu Principal");
      console.log("1 - Administração de pacientes");
      console.log("2 - Acessar agenda");
      console.log("3 - Sair");
      opcao = prompt("Digite a opção desejada: ");

      switch (opcao) {
        case "1":
          let opcaoCadastroPacientes;

          do {
            this.mostrarMenuCadastroPacientes();
            opcaoCadastroPacientes = prompt("Digite a opção desejada: ");

            switch (opcaoCadastroPacientes) {
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
          } while (opcaoCadastroPacientes !== "5");

          break;
        case "2":
          this.mostrarMenuAgenda();
          const opcaoAgenda = prompt("Digite a opção desejada: ");

          switch (opcaoAgenda) {
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
    } while (opcao !== "3");
  }

  agendarConsulta() {
    const cpf = prompt("Digite o CPF do paciente: ");
    const data = prompt("Digite a data da consulta (DD/MM/AAAA): ");
    const horaInicial = prompt("Digite a hora inicial (HHMM): ");
    const horaFinal = prompt("Digite a hora final (HHMM): ");

    this.#agendamentoConsultas.agendarConsulta(
      cpf,
      data,
      horaInicial,
      horaFinal
    );
  }

  cancelarAgendamento() {
    const cpf = prompt("Digite o CPF do paciente: ");
    const data = prompt("Digite a data da consulta (DD/MM/AAAA): ");
    const horaInicial = prompt("Digite a hora inicial (HHMM): ");

    this.#agendamentoConsultas.cancelarAgendamento(cpf, data, horaInicial);
  }

  listarAgenda() {
    const periodo = prompt("Apresentar a agenda (T)oda ou (P)eríodo: ");
    if (periodo === "T") {
      this.#agendamentoConsultas.listarAgenda();
    } else if (periodo === "P") {
      const dataInicial = prompt("Data inicial (DD/MM/AAAA): ");
      const dataFinal = prompt("Data final (DD/MM/AAAA): ");
      this.#agendamentoConsultas.listarAgendaPeriodo(dataInicial, dataFinal);
    } else {
      console.log("Opção inválida. Voltando para o menu principal.");
    }
  }
}

class AgendamentoConsultas {
  #pacientes;
  #consultas;

  constructor(pacientes, consultas) {
    this.#pacientes = pacientes;
    this.#consultas = consultas;
  }

  get pacientes() {
    return this.#pacientes;
  }

  agendarConsulta(cpfPaciente, data, horaInicial, horaFinal) {
    if (!this.validarCPFExistente(cpfPaciente)) {
      console.log("CPF não encontrado no cadastro de pacientes.");
      return;
    }

    if (!this.validarFormatoData(data)) {
      console.log("Formato de data inválido. Use o formato DD/MM/AAAA.");
      return;
    }

    if (
      !this.validarFormatoHora(horaInicial) ||
      !this.validarFormatoHora(horaFinal)
    ) {
      console.log("Formato de hora inválido. Use o formato HHMM.");
      return;
    }

    const dataConsulta = this.converterData(data);
    const horaInicialConsulta = this.converterHora(horaInicial);
    const horaFinalConsulta = this.converterHora(horaFinal);

    if (!this.validarDataHoraFuturo(dataConsulta, horaInicialConsulta)) {
      console.log("A data e hora da consulta devem ser no futuro.");
      return;
    }

    if (
      !this.validarHoraFinalMaiorQueInicial(
        horaInicialConsulta,
        horaFinalConsulta
      )
    ) {
      console.log("A hora final deve ser maior que a hora inicial.");
      return;
    }

    if (!this.validarAgendamentoUnico(cpfPaciente, dataConsulta)) {
      console.log(
        "Cada paciente só pode realizar um agendamento futuro por vez."
      );
      return;
    }

    if (
      this.verificarAgendamentoSobreposto(
        dataConsulta,
        horaInicialConsulta,
        horaFinalConsulta
      )
    ) {
      console.log("Já existe um agendamento para esse período.");
      return;
    }

    const novoAgendamento = {
      cpfPaciente,
      data: dataConsulta,
      horaInicial: horaInicialConsulta,
      horaFinal: horaFinalConsulta,
    };

    this.#consultas.push(novoAgendamento);
    console.log("Consulta agendada com sucesso!");
  }

  cancelarAgendamento(cpfPaciente, data, horaInicial) {
    if (!this.validarCPFExistente(cpfPaciente)) {
      console.log("CPF não encontrado no cadastro de pacientes.");
      return;
    }

    if (!this.validarFormatoData(data)) {
      console.log("Formato de data inválido. Use o formato DD/MM/AAAA.");
      return;
    }

    if (!this.validarFormatoHora(horaInicial)) {
      console.log("Formato de hora inválido. Use o formato HHMM.");
      return;
    }

    const dataConsulta = this.converterData(data);
    const horaInicialConsulta = this.converterHora(horaInicial);

    const consulta = this.#consultas.find(
      (consulta) =>
        consulta.cpfPaciente === cpfPaciente &&
        consulta.data === dataConsulta &&
        consulta.horaInicial === horaInicialConsulta
    );

    if (!consulta) {
      console.log("Agendamento não encontrado.");
      return;
    }

    const indiceConsulta = this.#consultas.indexOf(consulta);
    this.#consultas.splice(indiceConsulta, 1);

    console.log("Agendamento cancelado com sucesso!");
  }

  listarAgenda() {
    if (this.#consultas.length === 0) {
      console.log("Não existem consultas agendadas.");
      return;
    }

    this.#consultas.sort((consulta1, consulta2) => {
      const data1 = consulta1.data;
      const data2 = consulta2.data;
      const horaInicial1 = consulta1.horaInicial;
      const horaInicial2 = consulta2.horaInicial;

      if (data1 < data2) return -1;
      if (data1 > data2) return 1;
      if (horaInicial1 < horaInicial2) return -1;
      if (horaInicial1 > horaInicial2) return 1;
      return 0;
    });

    console.log(
      "-------------------------------------------------------------"
    );
    console.log("Data\t\tH.Ini\tH.Fim\tTempo\tNome\t\tDt.Nasc.");
    console.log(
      "-------------------------------------------------------------"
    );

    this.#consultas.forEach((consulta) => {
      const paciente = this.#pacientes.find(
        (paciente) => paciente.cpf === consulta.cpfPaciente
      );

      const tempo = this.calcularTempoConsulta(
        consulta.horaInicial,
        consulta.horaFinal
      );

      console.log(
        `${consulta.data}\t${consulta.horaInicial}\t${consulta.horaFinal}\t${tempo}\t${paciente.nome}\t${paciente.dataNascimento}`
      );
    });

    console.log(
      "-------------------------------------------------------------"
    );
  }

  listarAgendaPeriodo(dataInicial, dataFinal) {
    if (
      !this.validarFormatoData(dataInicial) ||
      !this.validarFormatoData(dataFinal)
    ) {
      console.log("Formato de data inválido. Use o formato DD/MM/AAAA.");
      return;
    }

    const dataInicialConsulta = this.converterData(dataInicial);
    const dataFinalConsulta = this.converterData(dataFinal);

    const consultasPeriodo = this.#consultas.filter(
      (consulta) =>
        consulta.data >= dataInicialConsulta &&
        consulta.data <= dataFinalConsulta
    );

    if (consultasPeriodo.length === 0) {
      console.log("Não existem consultas agendadas nesse período.");
      return;
    }

    consultasPeriodo.sort((consulta1, consulta2) => {
      const data1 = consulta1.data;
      const data2 = consulta2.data;
      const horaInicial1 = consulta1.horaInicial;
      const horaInicial2 = consulta2.horaInicial;

      if (data1 < data2) return -1;
      if (data1 > data2) return 1;
      if (horaInicial1 < horaInicial2) return -1;
      if (horaInicial1 > horaInicial2) return 1;
      return 0;
    });

    console.log(
      "-------------------------------------------------------------"
    );
    console.log("Data\t\tH.Ini\tH.Fim\tTempo\tNome\t\tDt.Nasc.");
    console.log(
      "-------------------------------------------------------------"
    );

    consultasPeriodo.forEach((consulta) => {
      const paciente = this.#pacientes.find(
        (paciente) => paciente.cpf === consulta.cpfPaciente
      );

      const tempo = this.calcularTempoConsulta(
        consulta.horaInicial,
        consulta.horaFinal
      );

      console.log(
        `${consulta.data}\t${consulta.horaInicial}\t${consulta.horaFinal}\t${tempo}\t${paciente.nome}\t${paciente.dataNascimento}`
      );
    });

    console.log(
      "-------------------------------------------------------------"
    );
  }

  validarCPFExistente(cpf) {
    return this.#pacientes.some((paciente) => paciente.cpf === cpf);
  }

  validarFormatoData(data) {
    const regexData = /^\d{2}\/\d{2}\/\d{4}$/;
    return regexData.test(data);
  }

  validarFormatoHora(hora) {
    const regexHora = /^\d{4}$/;
    return regexHora.test(hora);
  }

  validarDataHoraFuturo(data, hora) {
    const dataHoraConsulta = DateTime.fromObject({
      year: data.year,
      month: data.month,
      day: data.day,
      hour: hora.hour,
      minute: hora.minute,
    });

    return dataHoraConsulta > DateTime.now();
  }

  validarHoraFinalMaiorQueInicial(horaInicial, horaFinal) {
    const minutosInicial = horaInicial.hour * 60 + horaInicial.minute;
    const minutosFinal = horaFinal.hour * 60 + horaFinal.minute;

    return minutosFinal > minutosInicial;
  }

  validarAgendamentoUnico(cpfPaciente, data) {
    return !this.#consultas.some(
      (consulta) => consulta.cpfPaciente === cpfPaciente && consulta.data > data
    );
  }

  verificarAgendamentoSobreposto(data, horaInicial, horaFinal) {
    const dataHoraInicialConsulta = DateTime.fromObject({
      year: data.year,
      month: data.month,
      day: data.day,
      hour: horaInicial.hour,
      minute: horaInicial.minute,
    });

    const dataHoraFinalConsulta = DateTime.fromObject({
      year: data.year,
      month: data.month,
      day: data.day,
      hour: horaFinal.hour,
      minute: horaFinal.minute,
    });

    return this.#consultas.some((consulta) => {
      const consultaHoraInicial = consulta.horaInicial;
      const consultaHoraFinal = consulta.horaFinal;
      const consultaDataHoraInicial = DateTime.fromObject({
        year: consulta.data.year,
        month: consulta.data.month,
        day: consulta.data.day,
        hour: consultaHoraInicial.hour,
        minute: consultaHoraInicial.minute,
      });

      const consultaDataHoraFinal = DateTime.fromObject({
        year: consulta.data.year,
        month: consulta.data.month,
        day: consulta.data.day,
        hour: consultaHoraFinal.hour,
        minute: consultaHoraFinal.minute,
      });

      return (
        (dataHoraInicialConsulta >= consultaDataHoraInicial &&
          dataHoraInicialConsulta < consultaDataHoraFinal) ||
        (dataHoraFinalConsulta > consultaDataHoraInicial &&
          dataHoraFinalConsulta <= consultaDataHoraFinal) ||
        (consultaDataHoraInicial >= dataHoraInicialConsulta &&
          consultaDataHoraInicial < dataHoraFinalConsulta) ||
        (consultaDataHoraFinal > dataHoraInicialConsulta &&
          consultaDataHoraFinal <= dataHoraFinalConsulta)
      );
    });
  }

  converterData(data) {
    const [dia, mes, ano] = data.split("/").map(Number);
    return DateTime.fromObject({ day: dia, month: mes, year: ano });
  }

  converterHora(hora) {
    const [horaInt, minutoInt] = hora.match(/\d{2}/g).map(Number);
    return { hour: horaInt, minute: minutoInt };
  }

  calcularTempoConsulta(horaInicial, horaFinal) {
    const minutosInicial = horaInicial.hour * 60 + horaInicial.minute;
    const minutosFinal = horaFinal.hour * 60 + horaFinal.minute;

    const duracao = minutosFinal - minutosInicial;
    const horas = Math.floor(duracao / 60);
    const minutos = duracao % 60;

    return `${horas.toString().padStart(2, "0")}:${minutos
      .toString()
      .padStart(2, "0")}`;
  }
}

class ValidacaoUtils {
  static validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, "");
    if (cpf.length !== 11) return false;

    if (
      cpf === "00000000000" ||
      cpf === "11111111111" ||
      cpf === "22222222222" ||
      cpf === "33333333333" ||
      cpf === "44444444444" ||
      cpf === "55555555555" ||
      cpf === "66666666666" ||
      cpf === "77777777777" ||
      cpf === "88888888888" ||
      cpf === "99999999999"
    ) {
      return false;
    }

    let soma = 0;
    let resto;

    for (let i = 1; i <= 9; i++) {
      soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }

    resto = (soma * 10) % 11;

    if (resto === 10 || resto === 11) {
      resto = 0;
    }

    if (resto !== parseInt(cpf.substring(9, 10))) {
      return false;
    }

    soma = 0;

    for (let i = 1; i <= 10; i++) {
      soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }

    resto = (soma * 10) % 11;

    if (resto === 10 || resto === 11) {
      resto = 0;
    }

    if (resto !== parseInt(cpf.substring(10, 11))) {
      return false;
    }

    return true;
  }

  static validarData(data) {
    const regexData = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!regexData.test(data)) return false;

    const [dia, mes, ano] = data.split("/").map(Number);
    const dataObj = DateTime.fromObject({ day: dia, month: mes, year: ano });

    return (
      dataObj.isValid &&
      dataObj.day === dia &&
      dataObj.month === mes &&
      dataObj.year === ano
    );
  }

  static calcularIdade(dataNascimento) {
    const [dia, mes, ano] = dataNascimento.split("/").map(Number);
    const dataNasc = DateTime.fromObject({ day: dia, month: mes, year: ano });
    const idade = DateTime.now().diff(dataNasc, "years").years;

    return idade;
  }
}

const sistema = new ManterPaciente();
sistema.executar();
