import { Model, DataTypes } from "sequelize";
import { sequelize } from "../../database/connectionBD.js";

class Appointment extends Model {
  public id!: number;
  public patientId!: number;
  public date!: Date;
  public startTime!: string;
  public endTime!: string;
}

Appointment.init(
  {
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    startTime: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    endTime: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Appointment",
  }
);

export { Appointment };
