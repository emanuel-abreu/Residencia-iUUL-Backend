// import { InputOutputProvider } from "./View/Interface/IoutputinputProvider.js";
import { InputView } from "./View/Input/InputView.js";
import { OutputView } from "./View/Output/OutputView.js";
import { Controller } from "./Controller/controller.js";
import { PatientRepository } from "./Model/DAO/patient-repository.js";
import { AppointmentRepository } from "./Model/DAO/appointment-repository.js";

interface InputOutputProvider {
  getInput(prompt: string): string;
  showOutput(message: string): void;
}

class ConsoleInputOutputProvider implements InputOutputProvider {
  getInput(prompt: any) {
    return prompt; // Implemente sua lógica real de leitura de entrada aqui
  }

  showOutput(message: any) {
    console.log(message);
  }
}

const ioProvider = new ConsoleInputOutputProvider();
const inputView = new InputView();
const outputView = new OutputView(ioProvider); // Fornecer o argumento do tipo InputOutputProvider aqui
const patientRepository = new PatientRepository();
const appointmentRepository = new AppointmentRepository();

const controller = new Controller(
  inputView,
  outputView,
  patientRepository,
  appointmentRepository
);

controller.run();
