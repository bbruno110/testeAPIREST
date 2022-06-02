import { timeStamp } from 'console';
import { DATEONLY } from 'sequelize';
import {Model, DataTypes, Sequelize} from 'sequelize';
import { sequelize } from '../instances/Conexao';

export interface CategoriaInstance extends Model{
    cd_categoria: number;
    ds_categoria: string;
    ie_status: boolean;

}

export const Categoria_ = sequelize.define<CategoriaInstance>("categoria",{
    cd_categoria:{
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.STRING
    },
    ds_categoria: {
        type: DataTypes.STRING,
        get(){
            const raw = this.getDataValue('ds_categoria');
            return raw.toUpperCase();
        }
    },
    ie_status: {
        type: DataTypes.BOOLEAN
    },
},{
    tableName: 'categoria',
    timestamps: false
});