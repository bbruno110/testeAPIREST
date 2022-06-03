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
exports.atualizarPJ = exports.criarPJ = void 0;
const PJ_1 = require("../models/PJ");
/*
    cd_cnpj: string;
    ds_cidade: string;
    ds_endereco: string;
    ds_estado: string;
    ds_telefone: string;
    dt_atualizacao: Date;
    dt_criacao: Date;
    ie_status: boolean;
    nm_empresarial: string;
*/
const criarPJ = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let ds_endereco = req.body.ds_endereco;
    let ds_cidade = req.body.ds_cidade;
    let ds_estado = req.body.ds_estado;
    let ds_telefone = req.body.ds_telefone;
    let nm_empresarial = req.body.nm_empresarial;
    let ie_status = true;
    let dt_criacao = new Date();
    let cd_cnpj = req.body.cd_cnpj;
    let busca = yield PJ_1.Pessoa_Juridica.findByPk(cd_cnpj);
    if (busca) {
        res.json({ error: 'Pessoa Jurídica já cadastrada' });
    }
    else {
        let novaPJ = yield PJ_1.Pessoa_Juridica.create({ ds_endereco, ds_cidade, ds_estado, ds_telefone, nm_empresarial: nm_empresarial.toUpperCase(),
            ie_status, dt_criacao, cd_cnpj });
        res.status(201).json({ cd_cnpj: novaPJ.cd_cnpj, ds_endereco, ds_cidade, ds_estado, ds_telefone, nm_empresarial: nm_empresarial.toUpperCase(),
            ie_status, dt_criacao });
    }
});
exports.criarPJ = criarPJ;
const atualizarPJ = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let cd_cnpj = req.body.cd_cnpj;
    let buscaPJ = yield PJ_1.Pessoa_Juridica.findByPk(cd_cnpj);
    if (buscaPJ) {
        buscaPJ.ds_endereco = req.body.ds_endereco;
        buscaPJ.ds_cidade = req.body.ds_cidade;
        buscaPJ.ds_estado = req.body.ds_endereco;
        buscaPJ.ds_telefone = req.body.ds_telefone;
        buscaPJ.nm_empresarial = req.body.nm_empresarial;
        buscaPJ.dt_atualizacao = new Date();
        yield buscaPJ.save();
        res.status(201).json({ item: buscaPJ });
    }
    else {
        res.json({ error: 'Pessoa Juridica não encontrado' });
    }
});
exports.atualizarPJ = atualizarPJ;
