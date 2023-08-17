import { InputOutputProvider } from "./View/Interface/IoutputinputProvider.js";
import { InputView } from "./View/Input/InputView.js";
import { OutputView } from "./View/Output/OutputView.js";
import { Controller } from "./Controller/controller.js";
import { PatientRepository } from "./Model/DAO/patient-repository.js";
import { AppointmentRepository } from "./Model/DAO/appointment-repository.js";

const inputView = new InputView();
const outputView = new OutputView();
const patientRepository = new PatientRepository();
const appointmentRepository = new AppointmentRepository();

const controller = new Controller(
  inputView,
  outputView,
  patientRepository,
  appointmentRepository
);

controller.run();
