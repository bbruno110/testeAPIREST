"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Listar_usuario = void 0;
const sequelize_1 = require("sequelize");
const Conexao_1 = require("../instances/Conexao");
exports.Listar_usuario = Conexao_1.sequelize.define("usuarios_vs", {
    cd_usuario: {
        type: sequelize_1.DataTypes.STRING
    },
    descricao: {
        type: sequelize_1.DataTypes.STRING
    },
    ds_email: {
        type: sequelize_1.DataTypes.STRING
    },
    ie_status: {
        type: sequelize_1.DataTypes.BOOLEAN
    },
    ds_endereco: {
        type: sequelize_1.DataTypes.STRING
    },
    ds_cidade: {
        type: sequelize_1.DataTypes.STRING
    },
    ds_telefone: {
        type: sequelize_1.DataTypes.STRING
    }
});
exports.Listar_usuario.removeAttribute('id');
exports.Listar_usuario.removeAttribute('createdAt');
exports.Listar_usuario.removeAttribute('updatedAt');
