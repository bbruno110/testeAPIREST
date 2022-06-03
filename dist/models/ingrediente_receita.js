"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recIng_ = void 0;
const sequelize_1 = require("sequelize");
const Conexao_1 = require("../instances/Conexao");
exports.recIng_ = Conexao_1.sequelize.define("ingrediente_receita", {
    cd_receita: {
        type: sequelize_1.DataTypes.NUMBER
    },
    cd_ingrediente: {
        type: sequelize_1.DataTypes.NUMBER
    },
    qt_quantidade: {
        type: sequelize_1.DataTypes.STRING
    },
    nr_unidade_medida: {
        type: sequelize_1.DataTypes.STRING
    },
}, {
    tableName: 'ingrediente_receita',
    timestamps: false,
});
exports.recIng_.removeAttribute('id');
