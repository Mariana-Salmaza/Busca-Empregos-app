import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import ApplicationsModel from "./ApplicationsModel";
import FavoritesModel from "./FavoritesModel";
import UserModel from "./UserModel";

class VacanciesModel extends Model {
  id: number | undefined;
  title: string | undefined;
  description: string | undefined;
  location: string | undefined;
  salary: string | undefined;
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
      type: DataTypes.STRING,
      allowNull: false,
      set(value: string | number) {
        if (typeof value === "number") {
          this.setDataValue("salary", value.toString());
        } else {
          this.setDataValue("salary", value);
        }
      },
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: UserModel, key: "id" },
    },
  },
  {
    sequelize,
    modelName: "VacanciesModel",
    tableName: "vacancies",
  }
);

VacanciesModel.hasMany(ApplicationsModel, {
  foreignKey: "vacancy_id",
  as: "applications",
});
ApplicationsModel.belongsTo(VacanciesModel, {
  foreignKey: "vacancy_id",
  as: "vacancy",
});

VacanciesModel.hasMany(FavoritesModel, {
  foreignKey: "vacancy_id",
  as: "favorites",
});
FavoritesModel.belongsTo(VacanciesModel, {
  foreignKey: "vacancy_id",
  as: "vacancy",
});
VacanciesModel.belongsTo(UserModel, { foreignKey: "user_id" });

export default VacanciesModel;
