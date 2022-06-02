import { timeStamp } from 'console';
import { DATEONLY, DecimalDataType } from 'sequelize';
import {Model, DataTypes, Sequelize} from 'sequelize';
import { sequelize } from '../instances/Conexao';
import {Categoria_} from './Categoria'

export interface ingredienteInstance extends Model{
    cd_produto: number;
    ds_produto: string;
    cd_unidade_medida: string;
    qt_umidade: string;
    qt_acesso: string;
    qt_kj: string;
    qt_kcal: string;
    vl_valor: number;
    qt_quantidade: string;
    dt_atualizacao: Date;
    ie_status: boolean;
    cd_usuario: string;
}

export const Ingrediente_ = sequelize.define<ingredienteInstance>("ingrediente",{
    cd_produto:{
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.NUMBER
    },
    ds_produto: {
        type: DataTypes.STRING
    },
    cd_usuario: {
        type: DataTypes.STRING
    },
    cd_unidade_medida: {
        type: DataTypes.STRING
    },
    qt_umidade: {
        type: DataTypes.NUMBER
    },
    qt_acesso: {
        type: DataTypes.NUMBER
    },
    qt_kj: {
        type: DataTypes.NUMBER
    },
    qt_kcal: {
        type: DataTypes.NUMBER
    },
    vl_valor: {
        type: DataTypes.NUMBER
    },
    qt_quantidade: {
        type: DataTypes.STRING
    },
    dt_atualizacao: {
        type: DataTypes.DATE
    },

    ie_status: {
        type: DataTypes.BOOLEAN
    },
},{
    tableName: 'ingrediente',
    timestamps: false
});
