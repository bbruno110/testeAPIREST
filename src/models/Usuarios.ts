import {Model, DataTypes, Sequelize} from 'sequelize';
import { sequelize } from '../instances/Conexao';

export interface cadIntance extends Model{
    cd_usuario: string;
    ds_senha: string;
    ds_email: string;
    cd_perfil: number;
    ie_status: boolean;
    cd_token: string;
}

export const CadastroUser = sequelize.define<cadIntance>("usuario",{
    cd_usuario:{
        primaryKey: true,
        type: DataTypes.STRING
    },
    ds_senha: {
        type: DataTypes.STRING
    },
    ds_email: {
        type: DataTypes.STRING
    },
    ie_status: {
        type: DataTypes.BOOLEAN
    },
    cd_perfil: {
        type: DataTypes.STRING
    },
    cd_token: {
        type: DataTypes.STRING
    },
},{
    tableName: 'usuario',
    timestamps: false
});