"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Criar_ING = void 0;
const express_validator_1 = require("express-validator");
exports.Criar_ING = (0, express_validator_1.checkSchema)({
    ds_produto: {
        trim: true,
        isLength: {
            options: {
                min: 2
            }
        },
        errorMessage: "Precisa ter um nome"
    },
    token: {
        notEmpty: true
    }
});
