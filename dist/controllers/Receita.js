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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Listar_receitas = exports.Criar_ING_Rec = exports.Criar_Receita = exports.Atualizar_modoPreparo = exports.modo_Preparo = void 0;
const modoPreparo_1 = require("../models/modoPreparo");
const Receita_1 = require("../models/Receita");
const ingrediente_receita_1 = require("../models/ingrediente_receita");
const Usuarios_1 = require("../models/Usuarios");
/*
    cd_preparo: number;
    ds_descricao: string;

    cd_receita: number;
    cd_preparo: number;
    ds_descricao: string;
    vl_valor: number;
    qt_quantidade: string;
    dt_atualizacao: Date;
    cd_ingrediente: number;
    nr_unidade: string;
    dt_criacao: Date;
    ie_status: boolean;
*/
const modo_Preparo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let ds_descricao = req.body.ds_descricao;
    let cd_receita = req.body.cd_receita;
    let novoPreparo = yield modoPreparo_1.cadPreparo.create({ ds_descricao, cd_receita });
    res.status(201).json({ cd_preparo: novoPreparo.cd_preparo, ds_descricao, cd_receita });
});
exports.modo_Preparo = modo_Preparo;
const Atualizar_modoPreparo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let cd_preparo = req.body.cd_preparo;
    let findPrep = yield modoPreparo_1.cadPreparo.findByPk(cd_preparo);
    if (findPrep) {
        findPrep.ds_descricao = req.body.ds_descricao;
        yield findPrep.save();
        res.status(201).json({ item: findPrep });
    }
    else {
        res.json({ error: 'Modo de preparo não encontrado' });
    }
});
exports.Atualizar_modoPreparo = Atualizar_modoPreparo;
const Criar_Receita = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let ds_descricao = req.body.ds_descricao;
    let dt_criacao = new Date();
    let ie_status = true;
    let qt_rendimento = req.body.qt_rendimento;
    let token = req.body.token;
    const usuario = yield Usuarios_1.CadastroUser.findOne({ where: { cd_token: token } });
    let user = usuario === null || usuario === void 0 ? void 0 : usuario.cd_usuario;
    let novaReceita = yield Receita_1.Cadastrar_Receita.create({ ds_descricao: ds_descricao.toUpperCase(), dt_criacao, ie_status, cd_usuario: user, qt_rendimento });
    res.status(201).json({ cd_receita: novaReceita.cd_receita, ds_descricao, dt_criacao, ie_status, qt_rendimento });
});
exports.Criar_Receita = Criar_Receita;
const Criar_ING_Rec = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let cd_receita = req.body.cd_receita;
    let buscaRec = yield Receita_1.Cadastrar_Receita.findByPk(cd_receita);
    if (buscaRec) {
        let cd_receita = req.body.cd_receita;
        let cd_ingrediente = req.body.cd_ingrediente;
        let qt_quantidade = req.body.qt_quantidade;
        let nr_unidade_medida = req.body.nr_unidade_medida;
        const rec_ING = ingrediente_receita_1.recIng_.build({
            cd_receita: cd_receita,
            cd_ingrediente: cd_ingrediente,
            qt_quantidade: qt_quantidade,
            nr_unidade_medida: nr_unidade_medida.toLowerCase()
        });
        yield rec_ING.save();
        res.status(201).json({ rec_ING });
    }
    else {
        res.json({ error: 'receita não encontrada' });
    }
});
exports.Criar_ING_Rec = Criar_ING_Rec;
const Listar_receitas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let token = req.body.token;
    const usuario = yield Usuarios_1.CadastroUser.findOne({ where: { cd_token: token } });
    let cd_user = usuario === null || usuario === void 0 ? void 0 : usuario.cd_usuario;
    const Receitas = yield Receita_1.Cadastrar_Receita.findAll({ attributes: ['cd_receita',
            'ds_descricao', 'qt_quantidade', 'nr_unidade', 'vl_valor', 'qt_rendimento', 'qt_qnt_rendimento',
            'vl_rendimento'], where: { ie_status: true }, order: ['ds_descricao'] });
    res.json({ Receitas });
});
exports.Listar_receitas = Listar_receitas;
