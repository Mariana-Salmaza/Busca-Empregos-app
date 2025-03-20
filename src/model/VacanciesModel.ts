import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import ApplicationsModel from "./ApplicationsModel";
import FavoritesModel from "./FavoritesModel";
import UsersModel from "./UserModel";

class VacanciesModel extends Model {
  id: number | undefined;
  title: string | undefined;
  description: string | undefined;
  location: string | undefined;
  salary: number | undefined;
  user_id: number | undefined;
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
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: UsersModel, key: "id" },
    },
  },
  {
    sequelize,
    modelName: "VacanciesModel",
    tableName: "vacancies",
  }
);

// Uma vaga pode ter várias candidaturas
VacanciesModel.hasMany(ApplicationsModel, {
  foreignKey: "vacancy_id",
  as: "applications",
});
ApplicationsModel.belongsTo(VacanciesModel, {
  foreignKey: "vacancy_id",
  as: "vacancy",
});

// Uma vaga pode ser favoritada por vários usuários
VacanciesModel.hasMany(FavoritesModel, {
  foreignKey: "vacancy_id",
  as: "favorites",
});
FavoritesModel.belongsTo(VacanciesModel, {
  foreignKey: "vacancy_id",
  as: "vacancy",
});

export default VacanciesModel;
