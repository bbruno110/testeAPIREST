"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pessoa_Fisica = void 0;
const sequelize_1 = require("sequelize");
const Conexao_1 = require("../instances/Conexao");
exports.Pessoa_Fisica = Conexao_1.sequelize.define("Pessoa_Fisica", {
    cd_cpf: {
        primaryKey: true,
        type: sequelize_1.DataTypes.STRING
    },
    nm_nome: {
        type: sequelize_1.DataTypes.STRING,
        get() {
            const raw = this.getDataValue('nm_nome');
            return raw.toUpperCase();
        }
    },
    ds_endereco: {
        type: sequelize_1.DataTypes.STRING,
        get() {
            const raw = this.getDataValue('ds_endereco');
            return raw.toUpperCase();
        }
    },
    ie_status: {
        type: sequelize_1.DataTypes.BOOLEAN
    },
    ds_telefone: {
        type: sequelize_1.DataTypes.STRING
    },
    dt_nascimento: {
        type: sequelize_1.DataTypes.DATE
    },
    dt_criacao: {
        type: sequelize_1.DataTypes.DATE
    },
    ds_cidade: {
        type: sequelize_1.DataTypes.STRING,
        get() {
            const raw = this.getDataValue('ds_cidade');
            return raw.toUpperCase();
        }
    },
    ds_estado: {
        type: sequelize_1.DataTypes.STRING,
        get() {
            const raw = this.getDataValue('ds_estado');
            return raw.toUpperCase();
        }
    },
    dt_atualizacao: {
        type: sequelize_1.DataTypes.DATE
    },
}, {
    tableName: 'pessoa_fisica',
    timestamps: false
});
