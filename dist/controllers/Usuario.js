"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.esqueci_senha = exports.bucar_Usuario = exports.Inativar = exports.edit_user = exports.Detalhes = exports.Login = exports.Registro_user = void 0;
const cpf_cnpj_validator_1 = require("cpf-cnpj-validator");
const Usuarios_1 = require("../models/Usuarios");
const PF_1 = require("../models/PF");
const sequelize_1 = require("sequelize");
const PJ_1 = require("../models/PJ");
const express_validator_1 = require("express-validator");
const dotenv_1 = __importDefault(require("dotenv"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const Usuario_v_1 = require("../models/Usuario_v");
const Usuarioview_1 = require("../models/Usuarioview");
dotenv_1.default.config();
/*
    cd_usuario: string;
    ds_senha: string;
    ds_email: string;
    cd_perfil: number;
    ie_status: boolean;
*/
const Registro_user = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let cd_usuario = req.body.cd_usuario;
    let ds_email = req.body.ds_email;
    let ds_senha = req.body.ds_senha;
    let cd_perfil = req.body.cd_perfil;
    let ie_status = true;
    const cod_user = yield Usuarioview_1.View_usuario.findOne({ where: { cd_usuario } });
    if (!cod_user) {
        res.json({ error: 'Pessoa não cadastrada!' });
    }
    else {
        let email_user = yield Usuarios_1.CadastroUser.findOne({ where: { ds_email } });
        if (email_user) {
            res.json({ error: 'email já cadastrada!' });
        }
        else {
            const hash_senha = yield bcrypt_1.default.hashSync(ds_senha, 10);
            const playload = (Date.now() + Math.random()).toString();
            const token = yield bcrypt_1.default.hashSync(playload, 10);
            let novoUsuario = yield Usuarios_1.CadastroUser.create({ cd_usuario, ds_email, ds_senha: hash_senha, cd_token: token, cd_perfil, ie_status });
            res.status(201).json({ novoUsuario });
        }
    }
});
exports.Registro_user = Registro_user;
const Login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.json({ error: errors.mapped() });
        return;
    }
    ;
    let ds_email = req.body.ds_email;
    let ds_senha = req.body.ds_senha;
    let user = yield Usuarios_1.CadastroUser.findOne({ where: { ds_email } });
    if (!user) {
        res.json({ error: "E-mail e/ou senhas errados!" });
        return;
    }
    const match = yield bcrypt_1.default.compare(ds_senha, user === null || user === void 0 ? void 0 : user.ds_senha);
    if (!match) {
        res.json({ error: "E-mail e/ou senhas errados!" });
        return;
    }
    let cd = yield Usuarios_1.CadastroUser.findByPk(user === null || user === void 0 ? void 0 : user.cd_usuario);
    if (cd) {
        const playload = (Date.now() + Math.random()).toString();
        const token = yield bcrypt_1.default.hashSync(playload, 10);
        cd.cd_token = token;
        yield cd.save();
        res.json({ cd });
    }
});
exports.Login = Login;
const Detalhes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (errors.isEmpty()) {
        let token = req.body.token;
        const detalhes_usuario = yield Usuarios_1.CadastroUser.findOne({ where: { cd_token: token } });
        if (detalhes_usuario) {
            let cd_usuario = detalhes_usuario === null || detalhes_usuario === void 0 ? void 0 : detalhes_usuario.cd_usuario;
            const cpfvalidation = cpf_cnpj_validator_1.cpf.isValid(cd_usuario);
            if (cpfvalidation) {
                const pf = yield PF_1.Pessoa_Fisica.findOne({ where: { cd_cpf: detalhes_usuario.cd_usuario } });
                let detalhepf = {
                    cd_usuario: pf === null || pf === void 0 ? void 0 : pf.cd_cpf,
                    nm_nome: pf === null || pf === void 0 ? void 0 : pf.nm_nome,
                    ds_email: detalhes_usuario.ds_email,
                    dt_nascimento: pf === null || pf === void 0 ? void 0 : pf.dt_nascimento,
                    ds_telefone: pf === null || pf === void 0 ? void 0 : pf.ds_telefone,
                    ds_estado: pf === null || pf === void 0 ? void 0 : pf.ds_estado,
                    ds_cidade: pf === null || pf === void 0 ? void 0 : pf.ds_cidade,
                    ds_endereco: pf === null || pf === void 0 ? void 0 : pf.ds_endereco
                };
                return res.json({ user: detalhepf });
            }
            else {
                const pj = yield PJ_1.Pessoa_Juridica.findOne({ where: { cd_cnpj: detalhes_usuario.cd_usuario } });
                let detalhepj = {
                    cd_usuario: pj === null || pj === void 0 ? void 0 : pj.cd_cnpj,
                    nm_empresarial: pj === null || pj === void 0 ? void 0 : pj.nm_empresarial,
                    ds_email: detalhes_usuario.ds_email,
                    ds_telefone: pj === null || pj === void 0 ? void 0 : pj.ds_telefone,
                    ds_estado: pj === null || pj === void 0 ? void 0 : pj.ds_estado,
                    ds_cidade: pj === null || pj === void 0 ? void 0 : pj.ds_cidade,
                    ds_endereco: pj === null || pj === void 0 ? void 0 : pj.ds_endereco
                };
                return res.json({ user: detalhepj });
            }
        }
    }
    else {
        return res.json({ status: errors.mapped() });
    }
});
exports.Detalhes = Detalhes;
const edit_user = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const erros = (0, express_validator_1.validationResult)(req);
    if (!erros.isEmpty()) {
        res.json({ error: erros.mapped() });
        return;
    }
    ;
    let token = req.body.token;
    const user = yield Usuarios_1.CadastroUser.findOne({ where: { cd_token: token } });
    let usuario = user === null || user === void 0 ? void 0 : user.cd_usuario;
    let descricao = req.body.descricao;
    let ds_cidade = req.body.ds_cidade;
    let ds_endereco = req.body.ds_endereco;
    let ds_estado = req.body.ds_estado;
    let ds_telefone = req.body.ds_telefone;
    let ds_email = req.body.ds_email;
    let ds_senha = req.body.ds_senha;
    let dt_nascimento = req.body.dt_nascimento;
    const validacao = cpf_cnpj_validator_1.cpf.isValid(usuario);
    if (validacao) {
        if (descricao) {
            const pf = yield PF_1.Pessoa_Fisica.findOne({ where: { cd_cpf: usuario } });
            if (pf) {
                pf.nm_nome = descricao;
                pf.dt_atualizacao = new Date();
                yield pf.save();
            }
        }
        if (ds_cidade) {
            const pf = yield PF_1.Pessoa_Fisica.findOne({ where: { cd_cpf: usuario } });
            if (pf) {
                pf.ds_cidade = ds_cidade;
                pf.dt_atualizacao = new Date();
                yield pf.save();
            }
        }
        if (ds_endereco) {
            const pf = yield PF_1.Pessoa_Fisica.findOne({ where: { cd_cpf: usuario } });
            if (pf) {
                pf.ds_endereco = ds_endereco;
                pf.dt_atualizacao = new Date();
                yield pf.save();
            }
        }
        if (ds_estado) {
            const pf = yield PF_1.Pessoa_Fisica.findOne({ where: { cd_cpf: usuario } });
            if (pf) {
                pf.ds_estado = ds_estado;
                pf.dt_atualizacao = new Date();
                yield pf.save();
            }
        }
        if (ds_telefone) {
            const pf = yield PF_1.Pessoa_Fisica.findOne({ where: { cd_cpf: usuario } });
            if (pf) {
                pf.ds_telefone = ds_telefone;
                pf.dt_atualizacao = new Date();
                yield pf.save();
            }
        }
        if (ds_email) {
            const email = yield Usuarios_1.CadastroUser.findOne({ where: { ds_email } });
            if (email) {
                res.json({ error: "E-mail já cadastrado!" });
                return;
            }
            else {
                if (user) {
                    user.ds_email = ds_email;
                    yield user.save();
                }
            }
        }
        if (ds_senha) {
            if (user) {
                const hash_senha = yield bcrypt_1.default.hashSync(ds_senha, 10);
                user.ds_senha = hash_senha;
                yield user.save();
            }
        }
        if (dt_nascimento) {
            const pf = yield PF_1.Pessoa_Fisica.findOne({ where: { cd_cpf: usuario } });
            if (pf) {
                pf.dt_nascimento = dt_nascimento;
                pf.dt_atualizacao = new Date();
                yield pf.save();
            }
        }
    }
    const valid_cnpj = cpf_cnpj_validator_1.cnpj.isValid(usuario);
    if (valid_cnpj) {
        if (descricao) {
            const pj = yield PJ_1.Pessoa_Juridica.findOne({ where: { cd_cnpj: usuario } });
            if (pj) {
                pj.nm_empresarial = descricao;
                pj.dt_atualizacao = new Date();
                yield pj.save();
            }
        }
        if (ds_cidade) {
            const pj = yield PJ_1.Pessoa_Juridica.findOne({ where: { cd_cnpj: usuario } });
            if (pj) {
                pj.ds_cidade = ds_cidade;
                pj.dt_atualizacao = new Date();
                yield pj.save();
            }
        }
        if (ds_endereco) {
            const pj = yield PJ_1.Pessoa_Juridica.findOne({ where: { cd_cnpj: usuario } });
            if (pj) {
                pj.ds_endereco = ds_endereco;
                pj.dt_atualizacao = new Date();
                yield pj.save();
            }
        }
        if (ds_estado) {
            const pj = yield PJ_1.Pessoa_Juridica.findOne({ where: { cd_cnpj: usuario } });
            if (pj) {
                pj.ds_estado = ds_estado;
                pj.dt_atualizacao = new Date();
                yield pj.save();
            }
        }
        if (ds_telefone) {
            const pj = yield PJ_1.Pessoa_Juridica.findOne({ where: { cd_cnpj: usuario } });
            if (pj) {
                pj.ds_telefone = ds_telefone;
                pj.dt_atualizacao = new Date();
                yield pj.save();
            }
        }
        if (ds_email) {
            const email = yield Usuarios_1.CadastroUser.findOne({ where: { ds_email } });
            if (email) {
                res.json({ error: "E-mail já cadastrado!" });
                return;
            }
            else {
                if (user) {
                    user.ds_email = ds_email;
                    yield user.save();
                }
            }
        }
        if (ds_senha) {
            if (user) {
                const hash_senha = yield bcrypt_1.default.hashSync(ds_senha, 10);
                user.ds_senha = hash_senha;
                yield user.save();
            }
        }
    }
    res.json({});
});
exports.edit_user = edit_user;
const Inativar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let token = req.body.token;
    let cd_usuario = req.body.cd_usuario;
    const user = yield Usuarios_1.CadastroUser.findOne({ where: { cd_token: token } });
    let perfil = user === null || user === void 0 ? void 0 : user.cd_perfil;
    if (perfil == 1) {
        const userin = yield Usuarios_1.CadastroUser.findOne({ where: { cd_usuario } });
        if (userin) {
            let bool = userin.ie_status;
            if (bool == true) {
                userin.ie_status = false;
                yield userin.save();
                res.status(201).json({ item: userin });
            }
            else {
                userin.ie_status = true;
                yield userin.save();
                res.status(201).json({ item: userin });
            }
        }
        else {
            res.json({ error: 'Usuario não encontrado' });
        }
    }
    else {
        res.json({ error: 'Perfil não autorizado para Inativar/Ativar Usuarios' });
    }
});
exports.Inativar = Inativar;
const bucar_Usuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (errors.isEmpty()) {
        let token = req.body.token;
        const detalhes_usuario = yield Usuarios_1.CadastroUser.findOne({ where: { cd_token: token } });
        if (detalhes_usuario) {
            let descricao = req.body.descricao;
            const user = yield Usuario_v_1.Listar_usuario.findAll({ where: { descricao: { [sequelize_1.Op.like]: `%${descricao.toUpperCase()}%` }, ie_status: true } });
            res.json({ user });
        }
    }
    else {
        return res.json({ status: errors.mapped() });
    }
});
exports.bucar_Usuario = bucar_Usuario;
const esqueci_senha = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.json({ error: errors.mapped() });
        return;
    }
    ;
    let ds_email = req.body.ds_email;
    let cd_usuario = req.body.cd_usuario;
    let user = yield Usuarios_1.CadastroUser.findOne({ where: { ds_email, cd_usuario } });
    if (!user) {
        res.json({ error: "E-mail e/ou senhas errados!" });
        return;
    }
    let cd = yield Usuarios_1.CadastroUser.findByPk(user === null || user === void 0 ? void 0 : user.cd_usuario);
    if (cd) {
        const playload = (Date.now() + Math.random()).toString();
        const token = yield bcrypt_1.default.hashSync(playload, 10);
        cd.cd_token = token;
        yield cd.save();
        res.json({ token });
    }
});
exports.esqueci_senha = esqueci_senha;
