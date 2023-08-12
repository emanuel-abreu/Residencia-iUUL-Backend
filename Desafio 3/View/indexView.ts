import * as readlineSync from "readline-sync";

// Impentar interface para deixar a view Desacoplada
// interface inputOutputView {
//   input: string;
//   output: string;
// }

class inputOutputView {
  getInput(prompt: string): string {
    return readlineSync.question(prompt);
  }

  showOutput(message: string): void {
    console.log(message);
  }
}

export { inputOutputView };
