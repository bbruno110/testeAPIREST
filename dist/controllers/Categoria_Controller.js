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
exports.Inativar = exports.PesquisarCategoria = exports.ListarCategoria = exports.atualizarCat = exports.criarCategoria = void 0;
const Categoria_1 = require("../models/Categoria");
const sequelize_1 = require("sequelize");
const Usuarios_1 = require("../models/Usuarios");
/*
    cd_categoria: number;
    ds_categoria: string;
    ie_status: boolean;
*/
const criarCategoria = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let token = req.body.token;
    const user = yield Usuarios_1.CadastroUser.findOne({ where: { cd_token: token } });
    let perfil = user === null || user === void 0 ? void 0 : user.cd_perfil;
    if (perfil == 1) {
        let ds_categoria = req.body.ds_categoria;
        let ie_status = true;
        let novaCat = yield Categoria_1.Categoria_.create({ ds_categoria: ds_categoria.toUpperCase(), ie_status });
        res.status(201).json({ cd_categoria: novaCat.cd_categoria, ds_categoria: ds_categoria.toUpperCase(), ie_status });
    }
    else {
        res.json({ error: 'Perfil não autorizado para Criar nova Categoria!' });
    }
});
exports.criarCategoria = criarCategoria;
const atualizarCat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let cd_categoria = req.body.cd_categoria;
    let token = req.body.token;
    const user = yield Usuarios_1.CadastroUser.findOne({ where: { cd_token: token } });
    let perfil = user === null || user === void 0 ? void 0 : user.cd_perfil;
    if (perfil == 1) {
        let buscaCat = yield Categoria_1.Categoria_.findByPk(cd_categoria);
        if (buscaCat) {
            buscaCat.ds_categoria = req.body.ds_categoria.toUpperCase();
            yield buscaCat.save();
            res.status(201).json({ item: buscaCat });
        }
        else {
            res.json({ error: 'Categoria não encontrado' });
        }
    }
    else {
        res.json({ error: 'Perfil não autorizado para Atualizar Categoria!' });
    }
});
exports.atualizarCat = atualizarCat;
const ListarCategoria = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    let Categoria = yield ((_a = Categoria_1.Categoria_.sequelize) === null || _a === void 0 ? void 0 : _a.query("select * from categoria c where ie_status = 'True'", { type: sequelize_1.QueryTypes.SELECT }));
    res.json({ Categoria });
});
exports.ListarCategoria = ListarCategoria;
const PesquisarCategoria = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let busca = req.body.busca;
    let Categoria = yield Categoria_1.Categoria_.findAll({ where: { ds_categoria: { [sequelize_1.Op.like]: `%${busca.toUpperCase()}%` }, ie_status: true } });
    res.json({ Categoria });
});
exports.PesquisarCategoria = PesquisarCategoria;
const Inativar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let cd_categoria = req.body.cd_categoria;
    let token = req.body.token;
    const user = yield Usuarios_1.CadastroUser.findOne({ where: { cd_token: token } });
    let perfil = user === null || user === void 0 ? void 0 : user.cd_perfil;
    if (perfil == 1) {
        let buscaCat = yield Categoria_1.Categoria_.findByPk(cd_categoria);
        if (buscaCat) {
            let bool = buscaCat.ie_status;
            if (bool == true) {
                buscaCat.ie_status = false;
                yield buscaCat.save();
                res.status(201).json({ item: buscaCat });
            }
            else {
                buscaCat.ie_status = true;
                yield buscaCat.save();
                res.status(201).json({ item: buscaCat });
            }
        }
        else {
            res.json({ error: 'Categoria não encontrado' });
        }
    }
    else {
        res.json({ error: 'Perfil não autorizado para Invativar/Ativar Categoria!' });
    }
});
exports.Inativar = Inativar;
