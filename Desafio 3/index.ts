import MainController from "./Controller/MainController.js";

MainController;

class App {
  start() {
    const controller = new MainController();
  }
}

const runproject = new App();
runproject.start();
