import {Model, DataTypes, Sequelize } from 'sequelize';
import { sequelize } from '../instances/Conexao';

export interface mdPreparoInstance extends Model{
    cd_preparo: number;
    ds_descricao: string;
    cd_receita: number;
}

export const cadPreparo = sequelize.define<mdPreparoInstance>("modo_preparo",{
    cd_preparo: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.NUMBER
    },
    cd_receita: {
        type: DataTypes.NUMBER
    },
    ds_descricao: {
        type: DataTypes.STRING
    }
},{
    tableName: 'modo_preparo',
    timestamps: false
})