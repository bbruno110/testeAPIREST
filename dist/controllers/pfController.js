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
exports.atualizarPF = exports.criarPessoa = void 0;
const cpf_cnpj_validator_1 = require("cpf-cnpj-validator");
const PF_1 = require("../models/PF");
const PJ_1 = require("../models/PJ");
/*
    ds_endereco: string;
    ds_cidade: string;
    ds_estado: string;
    ds_telefone: number;
    nm_nome: string;
    ie_status: boolean;
    dt_nascimento: Date;
    dt_criacao: Date;
    dt_atualizacao: Date;
    cd_cpf: number;
*/
const criarPessoa = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let cod = req.body.cod;
    let descricao = req.body.descricao;
    const verificador = cpf_cnpj_validator_1.cpf.isValid(cod);
    const verificadorpj = cpf_cnpj_validator_1.cnpj.isValid(cod);
    if (verificador == true && verificadorpj == false) {
        let ds_endereco = req.body.ds_endereco;
        let ds_cidade = req.body.ds_cidade;
        let ds_estado = req.body.ds_estado;
        let ds_telefone = req.body.ds_telefone;
        let dt_nascimento = req.body.dt_nascimento;
        let ie_status = true;
        let dt_criacao = new Date();
        let busca = yield PF_1.Pessoa_Fisica.findOne({ where: { cd_cpf: cod } });
        if (busca) {
            res.json({ error: 'Pessoa física já cadastrada' });
        }
        else {
            let novaPF = yield PF_1.Pessoa_Fisica.create({ ds_endereco, ds_cidade, ds_estado, ds_telefone, dt_nascimento, nm_nome: descricao.toUpperCase(),
                ie_status, dt_criacao, cd_cpf: cod });
            res.status(201).json({ cod: novaPF.cd_cpf, ds_endereco, ds_cidade, ds_estado, ds_telefone, dt_nascimento, nm_nome: descricao.toUpperCase(),
                ie_status, dt_criacao });
        }
    }
    else if (verificadorpj == true && verificador == false) {
        let ds_endereco = req.body.ds_endereco;
        let ds_cidade = req.body.ds_cidade;
        let ds_estado = req.body.ds_estado;
        let ds_telefone = req.body.ds_telefone;
        let ie_status = true;
        let dt_criacao = new Date();
        let busca = yield PJ_1.Pessoa_Juridica.findOne({ where: { cd_cnpj: cod } });
        if (busca) {
            res.json({ error: 'Pessoa Jurídica já cadastrada' });
        }
        else {
            let novaPJ = yield PJ_1.Pessoa_Juridica.create({ ds_endereco, ds_cidade, ds_estado, ds_telefone, nm_empresarial: descricao.toUpperCase(),
                ie_status, dt_criacao, cd_cnpj: cod });
            res.status(201).json({ cod: novaPJ.cd_cnpj, ds_endereco, ds_cidade, ds_estado, ds_telefone, nm_empresarial: descricao.toUpperCase(),
                ie_status, dt_criacao });
        }
    }
});
exports.criarPessoa = criarPessoa;
const atualizarPF = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let cd_cpf = req.body.cd_cpf;
    let buscaPF = yield PF_1.Pessoa_Fisica.findByPk(cd_cpf);
    if (buscaPF) {
        buscaPF.ds_endereco = req.body.ds_endereco;
        buscaPF.ds_cidade = req.body.ds_cidade;
        buscaPF.ds_estado = req.body.ds_endereco;
        buscaPF.ds_telefone = req.body.ds_telefone;
        buscaPF.dt_nascimento = req.body.dt_nascimento;
        buscaPF.nm_nome = req.body.nm_nome;
        buscaPF.dt_atualizacao = new Date();
        yield buscaPF.save();
        res.status(201).json({ item: buscaPF });
    }
    else {
        res.json({ error: 'Pessoa não encontrado' });
    }
});
exports.atualizarPF = atualizarPF;
