import { timeStamp } from 'console';
import { DATEONLY } from 'sequelize';
import {Model, DataTypes, Sequelize} from 'sequelize';
import { sequelize } from '../instances/Conexao';

export interface pjInstance extends Model{
    cd_cnpj: string;
    ds_cidade: string;
    ds_endereco: string;
    ds_estado: string;
    ds_telefone: string;
    dt_atualizacao: Date;
    dt_criacao: Date;
    ie_status: boolean;
    nm_empresarial: string;

}

export const Pessoa_Juridica = sequelize.define<pjInstance>("pessoa_juridica",{
    cd_cnpj:{
        primaryKey: true,
        type: DataTypes.STRING
    },
    ds_cidade: {
        type: DataTypes.STRING,
        get(){
            const raw = this.getDataValue('ds_cidade');
            return raw.toUpperCase();
        }
    },
    nm_empresarial: {
        type: DataTypes.STRING,
        get(){
            const raw = this.getDataValue('nm_empresarial');
            return raw.toUpperCase();
        }
    },
    ds_endereco: {
        type: DataTypes.STRING,
        get(){
            const raw = this.getDataValue('ds_endereco');
            return raw.toUpperCase();
        }
    },
    ds_estado: {
        type: DataTypes.STRING,
        get(){
            const raw = this.getDataValue('ds_estado');
            return raw.toUpperCase();
        }
    },
    ds_telefone: {
        type: DataTypes.STRING
    },
    dt_atualizacao: {
        type: DataTypes.DATE
    },
    dt_criacao: {
        type: DataTypes.DATE
    },
    ie_status: {

        type: DataTypes.BOOLEAN
    },
},{
    tableName: 'pessoa_juridica',
    timestamps: false
});