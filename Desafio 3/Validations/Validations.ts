import { DateTime } from "luxon";

class ValidationUtils {
  validateCPF(cpf: string) {
    cpf = cpf.replace(/[^\d]+/g, "");
    if (cpf.length !== 11) return false;

    if (
      cpf === "00000000000" ||
      cpf === "11111111111" ||
      cpf === "22222222222" ||
      cpf === "33333333333" ||
      cpf === "44444444444" ||
      cpf === "55555555555" ||
      cpf === "66666666666" ||
      cpf === "77777777777" ||
      cpf === "88888888888" ||
      cpf === "99999999999"
    ) {
      return false;
    }

    let sum = 0;
    let rest;

    for (let i = 1; i <= 9; i++) {
      sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }

    rest = (sum * 10) % 11;

    if (rest === 10 || rest === 11) {
      rest = 0;
    }

    if (rest !== parseInt(cpf.substring(9, 10))) {
      return false;
    }

    sum = 0;

    for (let i = 1; i <= 10; i++) {
      sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }

    rest = (sum * 10) % 11;

    if (rest === 10 || rest === 11) {
      rest = 0;
    }

    if (rest !== parseInt(cpf.substring(10, 11))) {
      return false;
    }

    return true;
  }

  validateDate(date: string) {
    const regexData = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!regexData.test(date)) return false;

    const [day, month, year] = date.split("/").map(Number);
    const dataObj = DateTime.fromObject({ day: day, month: month, year: year });

    return (
      dataObj.isValid &&
      dataObj.day === day &&
      dataObj.month === month &&
      dataObj.year === year
    );
  }

  calculateAge(dateOfBirth: string) {
    const [day, month, year] = dateOfBirth.split("/").map(Number);
    const dateBirth = DateTime.fromObject({
      day: day,
      month: month,
      year: year,
    });
    const age = DateTime.now().diff(dateBirth, "years").years;

    return age;
  }
}

export default ValidationUtils;
