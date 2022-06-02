import { Request, Response } from "express";
import { Pessoa_Juridica } from '../models/PJ';

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

export const criarPJ = async (req: Request, res: Response)=>{
    let ds_endereco: string = req.body.ds_endereco;
    let ds_cidade: string = req.body.ds_cidade;
    let ds_estado: string = req.body.ds_estado;
    let ds_telefone: string = req.body.ds_telefone;
    let nm_empresarial: string = req.body.nm_empresarial;
    let ie_status: boolean = true;
    let dt_criacao: Date = new Date();
    let cd_cnpj: string = req.body.cd_cnpj;
    
    let busca = await  Pessoa_Juridica.findByPk(cd_cnpj);
    if(busca){
        res.json({error: 'Pessoa Jurídica já cadastrada'})
    } else{
        let novaPJ = await Pessoa_Juridica.create({ds_endereco,ds_cidade,ds_estado,ds_telefone,nm_empresarial: nm_empresarial.toUpperCase() ,
        ie_status, dt_criacao, cd_cnpj});
        res.status(201).json({cd_cnpj: novaPJ.cd_cnpj , ds_endereco,ds_cidade,ds_estado,ds_telefone,nm_empresarial: nm_empresarial.toUpperCase() ,
        ie_status, dt_criacao});
    }
}

export const atualizarPJ = async (req: Request, res: Response)=>{
    let cd_cnpj: string = req.body.cd_cnpj;

    let buscaPJ = await Pessoa_Juridica.findByPk(cd_cnpj);
    if(buscaPJ){
        buscaPJ.ds_endereco = req.body.ds_endereco;
        buscaPJ.ds_cidade = req.body.ds_cidade;
        buscaPJ.ds_estado = req.body.ds_endereco;
        buscaPJ.ds_telefone = req.body.ds_telefone;
        buscaPJ.nm_empresarial = req.body.nm_empresarial;
        buscaPJ.dt_atualizacao = new Date();
        await buscaPJ.save();
        res.status(201).json({item: buscaPJ});
    } else{
        res.json({error: 'Pessoa Juridica não encontrado'});
    }
}