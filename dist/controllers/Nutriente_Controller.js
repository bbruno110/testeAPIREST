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
exports.Inativar = exports.PesquisarNutriente = exports.ListarNutriente = exports.atualizarNut = exports.CriarNut = void 0;
const Nutrientes_1 = require("../models/Nutrientes");
const sequelize_1 = require("sequelize");
const Usuarios_1 = require("../models/Usuarios");
/*
    cd_unidade_medida: string;
    ds_nutriente: string;
    cd_nutriente: string;
    qt_quantidade: string;
    ie_status: boolean;
*/
const CriarNut = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let cd_unidade_medida = req.body.cd_unidade_medida;
    let ds_nutriente = req.body.ds_nutriente;
    let ie_status = true;
    let ie_tipo = req.body.ie_tipo;
    let token = req.body.token;
    const user = yield Usuarios_1.CadastroUser.findOne({ where: { cd_token: token } });
    let perfil = user === null || user === void 0 ? void 0 : user.cd_perfil;
    if (perfil == 1) {
        const nutriente = yield Nutrientes_1.Nutrientes.findOne({ where: { ds_nutriente: ds_nutriente.toUpperCase() } });
        if (nutriente) {
            res.json({ error: 'Já existe um nutriente com esse nome!' });
        }
        else {
            let novoNut = yield Nutrientes_1.Nutrientes.create({ cd_unidade_medida: cd_unidade_medida.toLowerCase(), ds_nutriente: ds_nutriente.toUpperCase(), ie_status, ie_tipo });
            res.status(201).json({ cd_nutriente: novoNut.cd_nutriente, cd_unidade_medida: cd_unidade_medida.toLowerCase(), ds_nutriente: ds_nutriente.toUpperCase(), ie_status });
        }
    }
    else {
        res.json({ error: 'Perfil não autorizado para Cadastro de Nutrientes' });
    }
});
exports.CriarNut = CriarNut;
const atualizarNut = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let cd_nutriente = req.body.cd_nutriente;
    let token = req.body.token;
    const user = yield Usuarios_1.CadastroUser.findOne({ where: { cd_token: token } });
    let perfil = user === null || user === void 0 ? void 0 : user.cd_perfil;
    if (perfil == 1) {
        let buscaNut = yield Nutrientes_1.Nutrientes.findByPk(cd_nutriente);
        if (buscaNut) {
            buscaNut.cd_unidade_medida = req.body.cd_unidade_medida;
            buscaNut.ds_nutriente = req.body.ds_nutriente.toUpperCase();
            yield buscaNut.save();
            res.status(201).json({ item: buscaNut });
        }
        else {
            res.json({ error: 'Nutriente não encontrado' });
        }
    }
    else {
        res.json({ error: 'Perfil não autorizado para Atualizar Nutrientes' });
    }
});
exports.atualizarNut = atualizarNut;
const ListarNutriente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    let Nutriente = yield ((_a = Nutrientes_1.Nutrientes.sequelize) === null || _a === void 0 ? void 0 : _a.query("select * from nutriente n  where ie_status = 'True'", { type: sequelize_1.QueryTypes.SELECT }));
    res.json({ Nutriente });
});
exports.ListarNutriente = ListarNutriente;
const PesquisarNutriente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let ds_nutriente = req.body.ds_nutriente;
    let nutriente = yield Nutrientes_1.Nutrientes.findAll({ where: { ds_categoria: { [sequelize_1.Op.like]: `%${ds_nutriente.toUpperCase()}%` }, ie_status: true } });
    res.json({ nutriente });
});
exports.PesquisarNutriente = PesquisarNutriente;
const Inativar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let cd_nutriente = req.body.cd_nutriente;
    let token = req.body.token;
    const user = yield Usuarios_1.CadastroUser.findOne({ where: { cd_token: token } });
    let perfil = user === null || user === void 0 ? void 0 : user.cd_perfil;
    if (perfil == 1) {
        let buscanut = yield Nutrientes_1.Nutrientes.findByPk(cd_nutriente);
        if (buscanut) {
            let bool = buscanut.ie_status;
            if (bool == true) {
                buscanut.ie_status = false;
                yield buscanut.save();
                res.status(201).json({ item: buscanut });
            }
            else {
                buscanut.ie_status = true;
                yield buscanut.save();
                res.status(201).json({ item: buscanut });
            }
        }
        else {
            res.json({ error: 'Nutriente não encontrado' });
        }
    }
    else {
        res.json({ error: 'Perfil não autorizado para Inativar/Ativar Nutrientes' });
    }
});
exports.Inativar = Inativar;
