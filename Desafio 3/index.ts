import ModelController from "./Controller/ModelController.js";
import { ViewController } from "./Controller/ViewControlle.js";
import Menus from "./View/Output/menus-view.js";

class App {
  start() {
    const modelController = new ModelController();
    const menus = new Menus();
    const viewController = new ViewController(menus);
  }
}

const runproject = new App();
runproject.start();
