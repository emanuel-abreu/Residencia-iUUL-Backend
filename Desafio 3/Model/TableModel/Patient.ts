import Agenda from "./Agenda.js";

class Patient {
  #agenda;
  #cpf;
  #name;
  #dateOfBirth;

  constructor(cpf: string, name: string, dateOfBirth: string) {
    this.#cpf = cpf;
    this.#name = name;
    this.#dateOfBirth = dateOfBirth;
    this.#agenda = new Agenda();
  }

  get cpf() {
    return this.#cpf;
  }

  get name() {
    return this.#name;
  }

  get dateOfBirth() {
    return this.#dateOfBirth;
  }

  get agenda() {
    return this.#agenda;
  }
}

export default Patient;
