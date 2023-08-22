import * as readlineSync from "readline-sync";

class InputOutputProviderImpl {
  getInput(prompt: string): string {
    return readlineSync.question(prompt);
  }

  showOutput(message: string): void {
    console.log(message);
  }
}

export { InputOutputProviderImpl };
