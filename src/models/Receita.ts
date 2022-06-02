import {Model, DataTypes, Sequelize} from 'sequelize';
import { sequelize } from '../instances/Conexao';

export interface ReceIntance extends Model{
    cd_receita: number;
    ds_descricao: string;
    vl_valor: number;
    cd_usuario: string;
    qt_quantidade: string;
    dt_atualizacao: Date;
    nr_unidade: string;
    dt_criacao: Date;
    ie_status: boolean;
    qt_rendimento: string;
    vl_rendimento: string;
    qt_qnt_rendimento: string;
}

export const Cadastrar_Receita = sequelize.define<ReceIntance>("receita",{
    cd_receita:{
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.STRING
    },
    ds_descricao: {
        type: DataTypes.STRING
    },
    cd_usuario: {
        type: DataTypes.STRING
    },
    qt_rendimento: {
        type: DataTypes.STRING
    },
    ie_status: {
        type: DataTypes.BOOLEAN
    },
    vl_valor: {
        type: DataTypes.NUMBER
    },
    vl_rendimento: {
        type: DataTypes.NUMBER
    },    
    qt_qnt_rendimento: {
        type: DataTypes.NUMBER
    },
    qt_quantidade: {
        type: DataTypes.STRING
    },
    dt_atualizacao: {
        type: DataTypes.DATE
    },
    nr_unidade: {
        type: DataTypes.STRING
    },
    dt_criacao: {
        type: DataTypes.DATE
    }
},{
    tableName: 'receita',
    timestamps: false
});