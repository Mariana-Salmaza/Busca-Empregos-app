import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import ApplicationsModel from "./ApplicationsModel";
import FavoritesModel from "./FavoritesModel";
import bcrypt from "bcrypt";

class UserModel extends Model {
  id: number | undefined;
  name: string | undefined;
  email: string | undefined;
  password: string | undefined;
  CPF: number | undefined;
  user_type: string | undefined;
  updatedBy: number | undefined;

  public async hashPassword() {
    this.password = await bcrypt.hash(this.password!, 10);
  }

  public async validatePassword(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password!);
  }
}

UserModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    CPF: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    user_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    updatedBy: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "UserModel",
    tableName: "users",
  }
);

// Mapeamento bidirecional: Um usuário pode ter várias candidaturas
UserModel.hasMany(ApplicationsModel, {
  foreignKey: "user_id",
  as: "applications",
});
ApplicationsModel.belongsTo(UserModel, {
  foreignKey: "user_id",
  as: "user",
});

// Mapeamento bidirecional: Um usuário pode favoritar várias vagas
UserModel.hasMany(FavoritesModel, {
  foreignKey: "user_id",
  as: "favorites",
});
FavoritesModel.belongsTo(UserModel, {
  foreignKey: "user_id",
  as: "user",
});

UserModel.beforeCreate(async (user: UserModel) => {
  await user.hashPassword();
});

UserModel.beforeUpdate(async (user: UserModel) => {
  if (user.changed("password")) {
    await user.hashPassword();
  }
});

export default UserModel;
