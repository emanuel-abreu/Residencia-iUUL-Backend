const prompt = require("prompt-sync")({ sigint: true });

class Aluno {
  #matricula;
  #nome;
  #notaP1;
  #notaP2;

  constructor(matricula, nome) {
    this.#matricula = matricula;
    this.#nome = nome;
    this.#notaP1 = undefined;
    this.#notaP2 = undefined;
  }

  get matricula() {
    return this.#matricula;
  }

  get nome() {
    return this.#nome;
  }

  get notaP1() {
    return this.#notaP1;
  }

  get notaP2() {
    return this.#notaP2;
  }

  setNotaP1(nota) {
    this.#notaP1 = nota;
  }

  setNotaP2(nota) {
    this.#notaP2 = nota;
  }

  calcularNotaFinal() {
    if (this.#notaP1 !== undefined && this.#notaP2 !== undefined) {
      return ((this.#notaP1 + this.#notaP2) / 2).toFixed(1);
    } else if (this.#notaP1 !== undefined) {
      return (this.#notaP1 / 2).toFixed(1);
    } else if (this.#notaP2 !== undefined) {
      return (this.#notaP2 / 2).toFixed(1);
    } else {
      return "0.0";
    }
  }
}

class Turma extends Aluno {
  #alunos;

  constructor() {
    super("", "");
    this.#alunos = [];
  }

  inserirAluno(aluno) {
    const matriculaExistente = this.#alunos.some(
      (alunoExistente) => alunoExistente.matricula === aluno.matricula
    );

    if (matriculaExistente) {
      throw new Error("Já existe um aluno com essa matrícula na turma.");
    }

    this.#alunos.push(aluno);
  }

  removerAluno(matricula) {
    const index = this.#alunos.findIndex(
      (aluno) => aluno.matricula === matricula
    );

    if (index === -1) {
      throw new Error("Não existe aluno com essa matrícula na turma.");
    }

    this.#alunos.splice(index, 1);
  }

  lancarNota(matricula, prova, nota) {
    const aluno = this.#alunos.find((aluno) => aluno.matricula === matricula);

    if (!aluno) {
      throw new Error("Não existe aluno com essa matrícula na turma.");
    }

    if (prova === "P1") {
      aluno.setNotaP1(nota);
    } else if (prova === "P2") {
      aluno.setNotaP2(nota);
    } else {
      throw new Error("Prova inválida.");
    }
  }

  imprimirListaAlunos() {
    console.log("---------------------------------------");
    console.log("Matrícula Nome        P1  P2  NF");
    console.log("---------------------------------------");

    for (const aluno of this.#alunos.sort((a, b) =>
      a.nome.localeCompare(b.nome)
    )) {
      const matricula = aluno.matricula;
      const nome = aluno.nome;
      const notaP1 = aluno.notaP1 !== undefined ? aluno.notaP1.toFixed(1) : "-";
      const notaP2 = aluno.notaP2 !== undefined ? aluno.notaP2.toFixed(1) : "-";
      const notaFinal = aluno.calcularNotaFinal();

      console.log(`${matricula} ${nome}  ${notaP1}  ${notaP2}  ${notaFinal}`);
    }

    console.log("---------------------------------------");
  }
}

const turma = new Turma();

while (true) {
  console.log("1 - Inserir aluno");
  console.log("2 - Remover aluno");
  console.log("3 - Lançar nota");
  console.log("4 - Imprimir lista de alunos");
  console.log("0 - Sair");
  const opcao = prompt("Digite a opção desejada: ");

  switch (opcao) {
    case "1":
      const matricula = prompt("Digite a matrícula do aluno: ");
      const nome = prompt("Digite o nome do aluno: ");

      const aluno = new Aluno(matricula, nome);

      try {
        turma.inserirAluno(aluno);
        console.log("Aluno(a) inserido(a) com sucesso.");
      } catch (error) {
        console.log("Erro ao inserir aluno:", error.message);
      }
      break;

    case "2":
      const matriculaRemover = prompt(
        "Digite a matrícula do aluno a ser removido: "
      );

      try {
        turma.removerAluno(matriculaRemover);
        console.log("Aluno removido com sucesso.");
      } catch (error) {
        console.log("Erro ao remover aluno:", error.message);
      }
      break;

    case "3":
      const matriculaLancarNota = prompt("Digite a matrícula do aluno: ");
      const prova = prompt("Digite a prova (P1 ou P2): ").toUpperCase();
      const nota = Number(prompt("Digite a nota: "));

      try {
        turma.lancarNota(matriculaLancarNota, prova, nota);
        console.log("Nota lançada com sucesso.");
      } catch (error) {
        console.log("Erro ao lançar nota:", error.message);
      }
      break;

    case "4":
      turma.imprimirListaAlunos();
      break;

    case "0":
      return;

    default:
      console.log("Opção inválida. Digite novamente.");
  }

  console.log();
}
