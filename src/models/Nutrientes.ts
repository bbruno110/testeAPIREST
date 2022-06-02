import {Model, DataTypes, Sequelize} from 'sequelize';
import { sequelize } from '../instances/Conexao';

export interface NutInstance extends Model{
    cd_unidade_medida: string;
    ds_nutriente: string;
    cd_nutriente: number;
    tx_conversao: string;
    ie_status: boolean;
    ie_tipo: string;
}

export const Nutrientes = sequelize.define<NutInstance>("nutriente",{
    cd_nutriente:{
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.NUMBER
    },
    cd_unidade_medida: {
        type: DataTypes.STRING
    },
    ie_tipo: {
        type: DataTypes.STRING
    },
    ds_nutriente: {
        type: DataTypes.STRING,
        get(){
            const raw = this.getDataValue('ds_nutriente');
            return raw.toUpperCase();
        }
    },
    ie_status: {

        type: DataTypes.BOOLEAN
    },
    tx_conversao: {
        type: DataTypes.STRING
    },
},{
    tableName: 'nutriente',
    timestamps: false
});