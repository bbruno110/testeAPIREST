"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pessoa_Juridica = void 0;
const sequelize_1 = require("sequelize");
const Conexao_1 = require("../instances/Conexao");
exports.Pessoa_Juridica = Conexao_1.sequelize.define("pessoa_juridica", {
    cd_cnpj: {
        primaryKey: true,
        type: sequelize_1.DataTypes.STRING
    },
    ds_cidade: {
        type: sequelize_1.DataTypes.STRING,
        get() {
            const raw = this.getDataValue('ds_cidade');
            return raw.toUpperCase();
        }
    },
    nm_empresarial: {
        type: sequelize_1.DataTypes.STRING,
        get() {
            const raw = this.getDataValue('nm_empresarial');
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
    ds_estado: {
        type: sequelize_1.DataTypes.STRING,
        get() {
            const raw = this.getDataValue('ds_estado');
            return raw.toUpperCase();
        }
    },
    ds_telefone: {
        type: sequelize_1.DataTypes.STRING
    },
    dt_atualizacao: {
        type: sequelize_1.DataTypes.DATE
    },
    dt_criacao: {
        type: sequelize_1.DataTypes.DATE
    },
    ie_status: {
        type: sequelize_1.DataTypes.BOOLEAN
    },
}, {
    tableName: 'pessoa_juridica',
    timestamps: false
});
