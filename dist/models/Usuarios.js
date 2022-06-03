"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CadastroUser = void 0;
const sequelize_1 = require("sequelize");
const Conexao_1 = require("../instances/Conexao");
exports.CadastroUser = Conexao_1.sequelize.define("usuario", {
    cd_usuario: {
        primaryKey: true,
        type: sequelize_1.DataTypes.STRING
    },
    ds_senha: {
        type: sequelize_1.DataTypes.STRING
    },
    ds_email: {
        type: sequelize_1.DataTypes.STRING
    },
    ie_status: {
        type: sequelize_1.DataTypes.BOOLEAN
    },
    cd_perfil: {
        type: sequelize_1.DataTypes.STRING
    },
    cd_token: {
        type: sequelize_1.DataTypes.STRING
    },
}, {
    tableName: 'usuario',
    timestamps: false
});
