"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cadastrar_Receita = void 0;
const sequelize_1 = require("sequelize");
const Conexao_1 = require("../instances/Conexao");
exports.Cadastrar_Receita = Conexao_1.sequelize.define("receita", {
    cd_receita: {
        primaryKey: true,
        autoIncrement: true,
        type: sequelize_1.DataTypes.STRING
    },
    ds_descricao: {
        type: sequelize_1.DataTypes.STRING
    },
    cd_usuario: {
        type: sequelize_1.DataTypes.STRING
    },
    qt_rendimento: {
        type: sequelize_1.DataTypes.STRING
    },
    ie_status: {
        type: sequelize_1.DataTypes.BOOLEAN
    },
    vl_valor: {
        type: sequelize_1.DataTypes.NUMBER
    },
    vl_rendimento: {
        type: sequelize_1.DataTypes.NUMBER
    },
    qt_qnt_rendimento: {
        type: sequelize_1.DataTypes.NUMBER
    },
    qt_quantidade: {
        type: sequelize_1.DataTypes.STRING
    },
    dt_atualizacao: {
        type: sequelize_1.DataTypes.DATE
    },
    nr_unidade: {
        type: sequelize_1.DataTypes.STRING
    },
    dt_criacao: {
        type: sequelize_1.DataTypes.DATE
    }
}, {
    tableName: 'receita',
    timestamps: false
});
