"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Categoria_ = void 0;
const sequelize_1 = require("sequelize");
const Conexao_1 = require("../instances/Conexao");
exports.Categoria_ = Conexao_1.sequelize.define("categoria", {
    cd_categoria: {
        primaryKey: true,
        autoIncrement: true,
        type: sequelize_1.DataTypes.STRING
    },
    ds_categoria: {
        type: sequelize_1.DataTypes.STRING,
        get() {
            const raw = this.getDataValue('ds_categoria');
            return raw.toUpperCase();
        }
    },
    ie_status: {
        type: sequelize_1.DataTypes.BOOLEAN
    },
}, {
    tableName: 'categoria',
    timestamps: false
});
