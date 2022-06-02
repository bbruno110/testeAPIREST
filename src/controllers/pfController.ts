import { Request, Response } from "express";
import { cpf , cnpj} from 'cpf-cnpj-validator';
import {Pessoa_Fisica} from '../models/PF';
import { Pessoa_Juridica } from '../models/PJ';

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

export const criarPessoa = async (req: Request, res: Response)=>{
    let cod: string = req.body.cod;
    let descricao: string = req.body.descricao;
    const verificador = cpf.isValid(cod)
    const verificadorpj = cnpj.isValid(cod)
    if(verificador == true && verificadorpj == false)
    {
        let ds_endereco: string = req.body.ds_endereco;
        let ds_cidade: string = req.body.ds_cidade;
        let ds_estado: string = req.body.ds_estado;
        let ds_telefone: string = req.body.ds_telefone;
        let dt_nascimento: Date = req.body.dt_nascimento;
        let ie_status: boolean = true;
        let dt_criacao: Date = new Date();
        
        let busca = await Pessoa_Fisica.findOne({where:{cd_cpf: cod}});
        if(busca){
            res.json({error: 'Pessoa física já cadastrada'})
        } else{
            let novaPF = await Pessoa_Fisica.create({ds_endereco,ds_cidade,ds_estado,ds_telefone,dt_nascimento,nm_nome:descricao.toUpperCase(),
            ie_status, dt_criacao, cd_cpf: cod});
            res.status(201).json({cod: novaPF.cd_cpf , ds_endereco,ds_cidade,ds_estado,ds_telefone,dt_nascimento,nm_nome:descricao.toUpperCase(),
            ie_status, dt_criacao});
        }
    }
    else if(verificadorpj == true && verificador == false)
    {
        let ds_endereco: string = req.body.ds_endereco;
        let ds_cidade: string = req.body.ds_cidade;
        let ds_estado: string = req.body.ds_estado;
        let ds_telefone: string = req.body.ds_telefone;
        let ie_status: boolean = true;
        let dt_criacao: Date = new Date();
        
        let busca = await  Pessoa_Juridica.findOne({where:{cd_cnpj:cod}});
        if(busca){
            res.json({error: 'Pessoa Jurídica já cadastrada'})
        } else{
            let novaPJ = await Pessoa_Juridica.create({ds_endereco,ds_cidade,ds_estado,ds_telefone,nm_empresarial: descricao.toUpperCase() ,
            ie_status, dt_criacao, cd_cnpj:cod});
            res.status(201).json({cod: novaPJ.cd_cnpj , ds_endereco,ds_cidade,ds_estado,ds_telefone,nm_empresarial: descricao.toUpperCase() ,
            ie_status, dt_criacao});
        }
    }
}

export const atualizarPF = async (req: Request, res: Response)=>{
    let cd_cpf: string = req.body.cd_cpf;

    let buscaPF = await Pessoa_Fisica.findByPk(cd_cpf);
    if(buscaPF){
        buscaPF.ds_endereco = req.body.ds_endereco;
        buscaPF.ds_cidade = req.body.ds_cidade;
        buscaPF.ds_estado = req.body.ds_endereco;
        buscaPF.ds_telefone = req.body.ds_telefone;
        buscaPF.dt_nascimento = req.body.dt_nascimento;
        buscaPF.nm_nome = req.body.nm_nome;
        buscaPF.dt_atualizacao = new Date();
        await buscaPF.save();
        res.status(201).json({item: buscaPF});
    } else{
        res.json({error: 'Pessoa não encontrado'});
    }
}