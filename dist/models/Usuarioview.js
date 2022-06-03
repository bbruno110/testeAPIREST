"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.View_usuario = void 0;
const sequelize_1 = require("sequelize");
const Conexao_1 = require("../instances/Conexao");
exports.View_usuario = Conexao_1.sequelize.define("cod_pj_pf", {
    cd_usuario: {
        type: sequelize_1.DataTypes.STRING
    }
});
exports.View_usuario.removeAttribute('id');
exports.View_usuario.removeAttribute('createdAt');
exports.View_usuario.removeAttribute('updatedAt');
