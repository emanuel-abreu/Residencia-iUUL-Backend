import { DateTime } from "luxon";

class Agenda {
  #schedules;

  constructor() {
    this.#schedules = [];
  }
}

export default Agenda;
