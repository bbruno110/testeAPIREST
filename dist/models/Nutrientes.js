"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Nutrientes = void 0;
const sequelize_1 = require("sequelize");
const Conexao_1 = require("../instances/Conexao");
exports.Nutrientes = Conexao_1.sequelize.define("nutriente", {
    cd_nutriente: {
        primaryKey: true,
        autoIncrement: true,
        type: sequelize_1.DataTypes.NUMBER
    },
    cd_unidade_medida: {
        type: sequelize_1.DataTypes.STRING
    },
    ie_tipo: {
        type: sequelize_1.DataTypes.STRING
    },
    ds_nutriente: {
        type: sequelize_1.DataTypes.STRING,
        get() {
            const raw = this.getDataValue('ds_nutriente');
            return raw.toUpperCase();
        }
    },
    ie_status: {
        type: sequelize_1.DataTypes.BOOLEAN
    },
    tx_conversao: {
        type: sequelize_1.DataTypes.STRING
    },
}, {
    tableName: 'nutriente',
    timestamps: false
});
