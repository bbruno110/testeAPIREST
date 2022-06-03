"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cadPreparo = void 0;
const sequelize_1 = require("sequelize");
const Conexao_1 = require("../instances/Conexao");
exports.cadPreparo = Conexao_1.sequelize.define("modo_preparo", {
    cd_preparo: {
        primaryKey: true,
        autoIncrement: true,
        type: sequelize_1.DataTypes.NUMBER
    },
    cd_receita: {
        type: sequelize_1.DataTypes.NUMBER
    },
    ds_descricao: {
        type: sequelize_1.DataTypes.STRING
    }
}, {
    tableName: 'modo_preparo',
    timestamps: false
});
