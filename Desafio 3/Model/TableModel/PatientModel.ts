class Patient {
  #cpf: string;
  #name: string;
  #dateOfBirth: string;

  constructor(cpf: string, name: string, dateOfBirth: string) {
    this.#cpf = cpf;
    this.#name = name;
    this.#dateOfBirth = dateOfBirth;
  }

  get cpf(): string {
    return this.#cpf;
  }

  get name(): string {
    return this.#name;
  }

  get dateOfBirth(): string {
    return this.#dateOfBirth;
  }
}

export { Patient };
