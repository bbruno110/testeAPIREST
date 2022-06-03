"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pf = exports.usuario = void 0;
const express_validator_1 = require("express-validator");
exports.usuario = (0, express_validator_1.checkSchema)({
    ds_email: {
        isEmail: true,
        normalizeEmail: true,
        errorMessage: "E-mail inválido."
    },
    ds_senha: {
        isLength: { options: { min: 5 } },
        errorMessage: "Senha precisa ter pelo menos 5 caracteres."
    }
});
exports.pf = (0, express_validator_1.checkSchema)({
    nm_nome: {
        isLength: { options: { min: 3 } },
        errorMessage: "Senha precisa ter pelo menos 3 caracteres."
    },
    dt_nascimento: {
        isDate: true
    }
});
