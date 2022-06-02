"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ingrediente_nutr = void 0;
const sequelize_1 = require("sequelize");
const Conexao_1 = require("../instances/Conexao");
exports.Ingrediente_nutr = Conexao_1.sequelize.define("cd_nutriente", {
    cd_produto: {
        type: sequelize_1.DataTypes.NUMBER
    },
    cd_nutriente: {
        type: sequelize_1.DataTypes.STRING
    },
    qt_quantidade: {
        type: sequelize_1.DataTypes.NUMBER
    },
    nr_unidade_medida: {
        type: sequelize_1.DataTypes.STRING
    },
}, {
    tableName: 'cd_nutriente',
    timestamps: false,
});
exports.Ingrediente_nutr.removeAttribute('id');
