interface InputOutputProvider {
  getInput(prompt: string): string;
  showOutput(message: string): void;
}

export { InputOutputProvider };
