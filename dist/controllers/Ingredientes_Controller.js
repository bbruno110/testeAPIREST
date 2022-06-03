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
exports.ListarIngrediente = exports.Delete_nut_ing = exports.Delete_cat_ing = exports.Delete_ing = exports.Criar_CAT_ING = exports.Criar_Nut_ING = exports.NovoIngrediente = void 0;
const Ingrediente_1 = require("../models/Ingrediente");
const cd_nutriente_1 = require("../models/cd_nutriente");
const Categoriza_1 = require("../models/Categoriza");
const Nutrientes_1 = require("../models/Nutrientes");
const sequelize_1 = require("sequelize");
const Usuarios_1 = require("../models/Usuarios");
const Categoria_1 = require("../models/Categoria");
/*
    cd_produto: number;
    ds_produto: string;
    cd_unidade_medida: string;
    qt_umidade: string;
    qt_acesso: string;
    qt_kj: string;
    qt_kcal: string;
    vl_valor: number;
    qt_quantidade: string;
    dt_atualização: Date;
    ie_status: boolean;

    cd_produto: number;
    qt_quantidade: string;
    cd_nutriente: string;
*/
const NovoIngrediente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let ds_produto = req.body.ds_produto;
    let cd_unidade_medida = req.body.cd_unidade_medida;
    let qt_umidade = req.body.qt_umidade;
    let qt_kj = req.body.qt_kj;
    let qt_kcal = req.body.qt_kcal;
    let vl_valor = req.body.vl_valor;
    let qt_quantidade = req.body.qt_quantidade;
    let ie_status = true;
    let token = req.body.token;
    const usuario = yield Usuarios_1.CadastroUser.findOne({ where: { cd_token: token } });
    let user = usuario === null || usuario === void 0 ? void 0 : usuario.cd_usuario;
    let dt_atualizacao = new Date();
    let novoIng = yield Ingrediente_1.Ingrediente_.create({ ds_produto: ds_produto.toUpperCase(), cd_usuario: user, cd_unidade_medida: cd_unidade_medida.toLowerCase(), qt_umidade, qt_kj, qt_kcal, vl_valor, qt_quantidade, ie_status, dt_atualizacao });
    res.status(201).json({ novoIng });
});
exports.NovoIngrediente = NovoIngrediente;
const Criar_Nut_ING = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let cd_ingrediente = req.body.cd_ingrediente;
    let buscaIng = yield Ingrediente_1.Ingrediente_.findByPk(cd_ingrediente);
    if (buscaIng) {
        let cd_produto = req.body.cd_ingrediente;
        let cd_nutriente = req.body.cd_nutriente;
        let qt_quantidade = req.body.qt_quantidade;
        const nutt = yield Nutrientes_1.Nutrientes.findOne({ where: { cd_nutriente } });
        const nut_ing = cd_nutriente_1.Ingrediente_nutr.build({
            cd_produto: cd_produto.toUpperCase(),
            cd_nutriente: cd_nutriente,
            qt_quantidade: qt_quantidade,
            nr_unidade_medida: nutt === null || nutt === void 0 ? void 0 : nutt.cd_unidade_medida
        });
        yield nut_ing.save();
        res.status(201).json({ nut_ing });
    }
    else {
        res.json({ error: 'Nutriente não encontrado' });
    }
});
exports.Criar_Nut_ING = Criar_Nut_ING;
const Criar_CAT_ING = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let cd_ingrediente = req.body.cd_ingrediente;
    let buscaIng = yield Ingrediente_1.Ingrediente_.findByPk(cd_ingrediente);
    if (buscaIng) {
        let cd_ingrediente = req.body.cd_ingrediente;
        let cd_categoria = req.body.cd_categoria;
        const catt = yield Categoria_1.Categoria_.findByPk(cd_categoria);
        if (catt) {
            const cd_cat = yield Categoriza_1.Ingrediente_Cate.findOne({ where: { cd_ingrediente, cd_categoria } });
            if (cd_cat) {
                res.json({ error: 'Categoria já cadastrada nesse ingrediente' });
            }
            else {
                const cat_ing = Categoriza_1.Ingrediente_Cate.build({
                    cd_ingrediente: cd_ingrediente,
                    cd_categoria: cd_categoria
                });
                yield cat_ing.save();
                res.status(201).json({ cat_ing });
            }
        }
        else {
            res.json({ error: 'Categoria não encontrado' });
        }
    }
    else {
        res.json({ error: 'Ingrediente não encontrado' });
    }
});
exports.Criar_CAT_ING = Criar_CAT_ING;
const Delete_ing = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let token = req.body.token;
    const info_user = yield Usuarios_1.CadastroUser.findOne({ where: { cd_token: token } });
    let perfil = info_user === null || info_user === void 0 ? void 0 : info_user.cd_perfil;
    let id = info_user === null || info_user === void 0 ? void 0 : info_user.cd_usuario;
    let cd_ingrediente = req.body.cd_ingrediente;
    const ing = yield Ingrediente_1.Ingrediente_.findOne({ where: { cd_produto: cd_ingrediente } });
    let id_ing = ing === null || ing === void 0 ? void 0 : ing.cd_usuario;
    if (ing) {
        if (id == id_ing || perfil == 1) {
            yield Ingrediente_1.Ingrediente_.destroy({ where: { cd_produto: cd_ingrediente } });
            res.json({});
        }
        else {
            res.json({ error: 'Você não tem permissão/ou criou este ingrediente!' });
        }
    }
    else {
        res.json({ error: 'Ingrediente não encontrado!' });
    }
});
exports.Delete_ing = Delete_ing;
const Delete_cat_ing = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let token = req.body.token;
    const info_user = yield Usuarios_1.CadastroUser.findOne({ where: { cd_token: token } });
    let perfil = info_user === null || info_user === void 0 ? void 0 : info_user.cd_perfil;
    let id = info_user === null || info_user === void 0 ? void 0 : info_user.cd_usuario;
    let cd_ingrediente = req.body.cd_ingrediente;
    let cd_categoria = req.body.cd_categoria;
    const ing = yield Ingrediente_1.Ingrediente_.findOne({ where: { cd_produto: cd_ingrediente } });
    let id_ing = ing === null || ing === void 0 ? void 0 : ing.cd_usuario;
    if (ing) {
        if (id == id_ing || perfil == 1) {
            yield Categoriza_1.Ingrediente_Cate.destroy({ where: { cd_ingrediente, cd_categoria } });
            res.json({});
        }
        else {
            res.json({ error: 'Você não tem permissão/ou criou esta categoria do ingrediente!' });
        }
    }
    else {
        res.json({ error: 'Ingrediente não encontrado!' });
    }
});
exports.Delete_cat_ing = Delete_cat_ing;
const Delete_nut_ing = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let token = req.body.token;
    const info_user = yield Usuarios_1.CadastroUser.findOne({ where: { cd_token: token } });
    let perfil = info_user === null || info_user === void 0 ? void 0 : info_user.cd_perfil;
    let id = info_user === null || info_user === void 0 ? void 0 : info_user.cd_usuario;
    let cd_ingrediente = req.body.cd_ingrediente;
    let cd_nutriente = req.body.cd_nutriente;
    const ing = yield Ingrediente_1.Ingrediente_.findOne({ where: { cd_produto: cd_ingrediente } });
    let id_ing = ing === null || ing === void 0 ? void 0 : ing.cd_usuario;
    if (ing) {
        if (id == id_ing || perfil == 1) {
            yield cd_nutriente_1.Ingrediente_nutr.destroy({ where: { cd_produto: cd_ingrediente, cd_nutriente } });
            res.json({});
        }
        else {
            res.json({ error: 'Você não tem permissão/ou criou este nutrienta do ingrediente!' });
        }
    }
    else {
        res.json({ error: 'Ingrediente não encontrado!' });
    }
});
exports.Delete_nut_ing = Delete_nut_ing;
const ListarIngrediente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    let Ingredientes = yield ((_a = Ingrediente_1.Ingrediente_.sequelize) === null || _a === void 0 ? void 0 : _a.query("select * from listar_produtos lp ", { type: sequelize_1.QueryTypes.SELECT }));
    res.json({ Ingredientes });
});
exports.ListarIngrediente = ListarIngrediente;
