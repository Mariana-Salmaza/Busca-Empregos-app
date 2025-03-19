import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class FavoritesModel extends Model {
  id: number | undefined;
  user_id: number | undefined;
  vacancy_id: number | undefined;
  saved_at: Date | undefined;
}

FavoritesModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    vacancy_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    saved_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "FavoritesModel",
    tableName: "favorites",
  }
);

export default FavoritesModel;
