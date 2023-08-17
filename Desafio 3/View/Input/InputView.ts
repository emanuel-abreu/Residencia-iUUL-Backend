import * as readlineSync from "readline-sync";

class InputView {
  getInput(prompt: string): string {
    return readlineSync.question(prompt);
  }
}

export { InputView };
