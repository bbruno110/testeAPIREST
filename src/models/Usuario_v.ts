import { timeStamp } from 'console';
import { DATEONLY } from 'sequelize';
import {Model, DataTypes, Sequelize} from 'sequelize';
import { sequelize } from '../instances/Conexao'

export interface Listar_Usuario_Instance extends Model{
    cd_usuario: string;
    descricao: string;
    ds_email: string;
    ie_status: boolean;
    ds_endereco: string;
    ds_estado: string;
    ds_cidade: string;
    ds_telefone: string;
}
export const Listar_usuario = sequelize.define<Listar_Usuario_Instance>("usuarios_vs",{
    cd_usuario:{
        type: DataTypes.STRING
    },
    descricao:{
        type: DataTypes.STRING
    },
    ds_email:{
        type: DataTypes.STRING
    },
    ie_status:{
        type: DataTypes.BOOLEAN
    },
    ds_endereco:{
        type: DataTypes.STRING
    },
    ds_cidade:{
        type: DataTypes.STRING
    },
    ds_telefone:{
        type: DataTypes.STRING
    }
});
Listar_usuario.removeAttribute('id');
Listar_usuario.removeAttribute('createdAt');
Listar_usuario.removeAttribute('updatedAt');