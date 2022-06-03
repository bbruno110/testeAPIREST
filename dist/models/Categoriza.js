"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ingrediente_Cate = void 0;
const sequelize_1 = require("sequelize");
const Conexao_1 = require("../instances/Conexao");
exports.Ingrediente_Cate = Conexao_1.sequelize.define("categoriza", {
    cd_categoria: {
        type: sequelize_1.DataTypes.NUMBER
    },
    cd_ingrediente: {
        type: sequelize_1.DataTypes.NUMBER
    },
}, {
    tableName: 'categoriza',
    timestamps: false,
});
exports.Ingrediente_Cate.removeAttribute('id');
