const prompt = require("prompt-sync")({ sigint: true });

function validarNome(nome) {
  return nome.length >= 5;
}

function validarCPF(cpf) {
  return /^\d{11}$/.test(cpf);
}

function validarDataNascimento(dataNascimento) {
  const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
  if (!regex.test(dataNascimento)) {
    return false;
  }

  const [, dia, mes, ano] = regex.exec(dataNascimento);
  const data = new Date(`${ano}-${mes}-${dia}`);
  const dataAtual = new Date();

  return data instanceof Date &&
    !isNaN(data) &&
    data <= dataAtual &&
    dataAtual.getFullYear() - data.getFullYear() >= 18
    ? data
    : null;
}

function validarRendaMensal(rendaMensal) {
  return /^\d+(\.\d{1,2})?$/.test(rendaMensal);
}

function validarEstadoCivil(estadoCivil) {
  return /^[CSVDcsvd]$/.test(estadoCivil);
}

function validarDependentes(dependentes) {
  return /^[0-9]$|^10$/.test(dependentes);
}

function formatarCPF(cpf) {
  return cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4");
}

function formatarData(data) {
  const dia = String(data.getDate()).padStart(2, "0");
  const mes = String(data.getMonth() + 1).padStart(2, "0");
  const ano = data.getFullYear();
  return `${dia}/${mes}/${ano}`;
}

function solicitarDado(mensagem, validacao) {
  while (true) {
    const dado = prompt(mensagem);

    if (validacao(dado)) {
      return dado;
    } else {
      console.log("Dado inválido. Digite novamente.");
    }
  }
}

console.log("=== Cadastro de Cliente ===");

const nome = solicitarDado("Nome: ", validarNome);
const cpf = solicitarDado("CPF: ", validarCPF);
const dataNascimento = solicitarDado(
  "Data de Nascimento (DD/MM/AAAA): ",
  validarDataNascimento
);
const rendaMensal = solicitarDado("Renda Mensal: ", validarRendaMensal);
const estadoCivil = solicitarDado(
  "Estado Civil (C, S, V ou D): ",
  validarEstadoCivil
);
const dependentes = solicitarDado(
  "Número de Dependentes (0 a 10): ",
  validarDependentes
);

if (dataNascimento === null) {
  console.log("Data de Nascimento inválida. Cadastro cancelado.");
} else {
  const dataNascimentoFormatada = formatarData(new Date(dataNascimento));
  const cpfFormatado = formatarCPF(cpf);
  const rendaMensalFormatada = parseFloat(rendaMensal).toFixed(2);

  console.log("\n=== Dados do Cliente ===");
  console.log(`Nome: ${nome}`);
  console.log(`CPF: ${cpfFormatado}`);
  console.log(`Data de Nascimento: ${dataNascimentoFormatada}`);
  console.log(`Renda Mensal: R$ ${rendaMensalFormatada}`);
  console.log(`Estado Civil: ${estadoCivil.toUpperCase()}`);
  console.log(`Dependentes: ${dependentes}`);
}
