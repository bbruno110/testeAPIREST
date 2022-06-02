import { checkSchema } from "express-validator";

export const Criar_ING = checkSchema({
    ds_produto: {
        trim: true,
        isLength:{
            options:{
                min: 2
            }
        },
        errorMessage: "Precisa ter um nome"
    },
    token:{
        notEmpty: true
    }
})
