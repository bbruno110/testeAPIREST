import { timeStamp } from 'console';
import { DATEONLY } from 'sequelize';
import {Model, DataTypes, Sequelize} from 'sequelize';
import { sequelize } from '../instances/Conexao';

export interface pfInstance extends Model{
    cd_cpf: string;
    ds_cidade: string;
    ds_endereco: string;
    ds_estado: string;
    ds_telefone: string;
    dt_atualizacao: Date;
    dt_criacao: Date;
    dt_nascimento: Date;
    ie_status: boolean;
    nm_nome: string;
}

export const Pessoa_Fisica = sequelize.define<pfInstance>("Pessoa_Fisica",{
    cd_cpf:{
        primaryKey: true,
        type: DataTypes.STRING
    },
    nm_nome: {
        type: DataTypes.STRING,
        get(){
            const raw = this.getDataValue('nm_nome');
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
    ie_status: {
        type: DataTypes.BOOLEAN
    },
    ds_telefone: {
        type: DataTypes.STRING
    },
    dt_nascimento: {
        type: DataTypes.DATE
    },
    dt_criacao: {
        type: DataTypes.DATE
    },
    ds_cidade: {
        type: DataTypes.STRING,
        get(){
            const raw = this.getDataValue('ds_cidade');
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
    dt_atualizacao: {
        type: DataTypes.DATE
    },
},{
    tableName: 'pessoa_fisica',
    timestamps: false
});