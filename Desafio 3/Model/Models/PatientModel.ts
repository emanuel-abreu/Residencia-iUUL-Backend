import { Model, DataTypes } from "sequelize";
import { sequelize } from "../../database/connectionBD.js";

class Patient extends Model {
  public id!: number;
  public cpf!: string;
  public name!: string;
  public dateOfBirth!: Date;
}

Patient.init(
  {
    cpf: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dateOfBirth: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Patient",
  }
);

export { Patient };
