import { channel } from "diagnostics_channel";
import { checkSchema } from "express-validator";

export const usuario = checkSchema({
    ds_email: {
        isEmail: true,
        normalizeEmail: true,
        errorMessage: "E-mail inválido."
    },
    ds_senha:{
        isLength:{ options: {min: 5} },
        errorMessage: "Senha precisa ter pelo menos 5 caracteres."
    }
})

export const pf = checkSchema({
    nm_nome:{
        isLength:{options:{min: 3}},
        errorMessage: "Senha precisa ter pelo menos 3 caracteres."
    },
    dt_nascimento:{
        isDate: true
    }
})