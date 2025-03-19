import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class VacanciesModel extends Model {
  id: number | undefined;
  title: string | undefined;
  description: string | undefined;
  location: string | undefined;
  salary: number | undefined;
  company_id: number | undefined;
}

VacanciesModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    salary: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    company_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "VacanciesModel",
    tableName: "vacancies",
  }
);

export default VacanciesModel;
