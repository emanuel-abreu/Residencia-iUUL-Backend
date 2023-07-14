const prompt = require("prompt-sync")({ sigint: true });

class Cliente {
  constructor(
    nome,
    cpf,
    dataNascimento,
    rendaMensal,
    estadoCivil,
    dependentes
  ) {
    this.nome = nome;
    this.cpf = cpf;
    this.dataNascimento = dataNascimento;
    this.rendaMensal = rendaMensal;
    this.estadoCivil = estadoCivil;
    this.dependentes = dependentes;
  }

  validarNome() {
    return this.nome.length >= 5;
  }

  validarCPF() {
    return /^\d{11}$/.test(this.cpf);
  }

  validarDataNascimento() {
    const regex = /^(\d{2}) ?\/ ?(\d{2}) ?\/ ?(\d{4})$/;
    if (!regex.test(this.dataNascimento)) {
      return false;
    }

    const [, dia, mes, ano] = regex.exec(this.dataNascimento);
    const data = new Date(`${ano}-${mes}-${dia}`);
    const dataAtual = new Date();

    return (
      data instanceof Date &&
      !isNaN(data) &&
      data <= dataAtual &&
      dataAtual.getFullYear() - data.getFullYear() >= 18
    );
  }

  validarRendaMensal() {
    return /^\d+(\.\d{1,2})?$/.test(this.rendaMensal);
  }

  validarEstadoCivil() {
    return /^[CSVDcsvd]$/.test(this.estadoCivil);
  }

  validarDependentes() {
    return /^[0-9]$|^10$/.test(this.dependentes);
  }

  formatarCPF() {
    return this.cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4");
  }

  formatarData(data) {
    const dia = String(data.getDate()).padStart(2, "0");
    const mes = String(data.getMonth() + 1).padStart(2, "0");
    const ano = data.getFullYear();
    return `${dia}/${mes}/${ano}`;
  }

  formatarDataNascimento() {
    const dataSemEspacos = this.dataNascimento.replace(/\s/g, "");
    const data = new Date(dataSemEspacos);
    return this.formatarData(data);
  }

  solicitarDado(mensagem, validacao) {
    while (true) {
      const dado = prompt(mensagem);

      if (validacao.call(this)) {
        return dado;
      } else {
        console.log("Dado inválido. Digite novamente.");
      }
    }
  }

  cadastrarCliente() {
    console.log("=== Cadastro de Cliente ===");

    this.nome = this.solicitarDado("Nome: ", this.validarNome);
    this.cpf = this.solicitarDado("CPF: ", this.validarCPF);
    this.dataNascimento = this.solicitarDado(
      "Data de Nascimento (DD/MM/AAAA): ",
      this.validarDataNascimento
    );
    this.rendaMensal = this.solicitarDado(
      "Renda Mensal: ",
      this.validarRendaMensal
    );
    this.estadoCivil = this.solicitarDado(
      "Estado Civil (C, S, V ou D): ",
      this.validarEstadoCivil
    );
    this.dependentes = this.solicitarDado(
      "Número de Dependentes (0 a 10): ",
      this.validarDependentes
    );

    if (!this.validarDataNascimento()) {
      console.log("Data de Nascimento inválida. Cadastro cancelado.");
    } else {
      const dataNascimentoFormatada = this.formatarDataNascimento();
      const cpfFormatado = this.formatarCPF();
      const rendaMensalFormatada = parseFloat(this.rendaMensal).toFixed(2);

      console.log("\n=== Dados do Cliente ===");
      console.log(`Nome: ${this.nome}`);
      console.log(`CPF: ${cpfFormatado}`);
      console.log(`Data de Nascimento: ${dataNascimentoFormatada}`);
      console.log(`Renda Mensal: R$ ${rendaMensalFormatada}`);
      console.log(`Estado Civil: ${this.estadoCivil.toUpperCase()}`);
      console.log(`Dependentes: ${this.dependentes}`);
    }
  }
}

const cliente = new Cliente();
cliente.cadastrarCliente();
