import { DataTypes, Model } from "sequelize";
import sequelize from '../config/database';

class ApplicationsModel extends Model {
    id: number | undefined
    user_id: number | undefined
    vacancy_id: number | undefined
    status: string | undefined
}

ApplicationsModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        vacancy_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        sequelize,
        modelName: 'AppicationsModel',
        tableName: 'applications'
    }
)

export default ApplicationsModel