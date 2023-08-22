import { InputOutputProviderImpl } from "./View/Input/InputOutputProviderImpl.js";
import { OutputView } from "./View/Output/OutputView.js";
import { Controller } from "./Controller/controller.js";
import { PatientRepository } from "./Model/DAO/patient-repository.js";
import { AppointmentRepository } from "./Model/DAO/appointment-repository.js";

const ioProvider = new InputOutputProviderImpl();
const outputView = new OutputView(ioProvider);
const patientRepository = new PatientRepository();
const appointmentRepository = new AppointmentRepository();

const controller = new Controller(
  ioProvider,
  outputView,
  patientRepository,
  appointmentRepository
);

controller.run();
