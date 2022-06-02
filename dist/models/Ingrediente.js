"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ingrediente_ = void 0;
const sequelize_1 = require("sequelize");
const Conexao_1 = require("../instances/Conexao");
exports.Ingrediente_ = Conexao_1.sequelize.define("ingrediente", {
    cd_produto: {
        primaryKey: true,
        autoIncrement: true,
        type: sequelize_1.DataTypes.NUMBER
    },
    ds_produto: {
        type: sequelize_1.DataTypes.STRING
    },
    cd_usuario: {
        type: sequelize_1.DataTypes.STRING
    },
    cd_unidade_medida: {
        type: sequelize_1.DataTypes.STRING
    },
    qt_umidade: {
        type: sequelize_1.DataTypes.NUMBER
    },
    qt_acesso: {
        type: sequelize_1.DataTypes.NUMBER
    },
    qt_kj: {
        type: sequelize_1.DataTypes.NUMBER
    },
    qt_kcal: {
        type: sequelize_1.DataTypes.NUMBER
    },
    vl_valor: {
        type: sequelize_1.DataTypes.NUMBER
    },
    qt_quantidade: {
        type: sequelize_1.DataTypes.STRING
    },
    dt_atualizacao: {
        type: sequelize_1.DataTypes.DATE
    },
    ie_status: {
        type: sequelize_1.DataTypes.BOOLEAN
    },
}, {
    tableName: 'ingrediente',
    timestamps: false
});
