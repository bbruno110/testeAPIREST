import { Request, Response } from "express";
import {cadPreparo} from '../models/modoPreparo';
import {Cadastrar_Receita, ReceIntance} from '../models/Receita';
import { recIng_ } from '../models/ingrediente_receita';
import { CadastroUser } from "../models/Usuarios";
import { Ingrediente_ } from "../models/Ingrediente";
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

export const modo_Preparo = async (req: Request, res: Response)=>{
    let ds_descricao: string = req.body.ds_descricao;
    let cd_receita: number = req.body.cd_receita;
    let novoPreparo = await  cadPreparo.create({ds_descricao, cd_receita});
    res.status(201).json({cd_preparo: novoPreparo.cd_preparo, ds_descricao, cd_receita});
}
export const Atualizar_modoPreparo = async (req: Request, res: Response) =>{
    let cd_preparo: number = req.body.cd_preparo;

    let findPrep = await cadPreparo.findByPk(cd_preparo);
    if(findPrep){
        findPrep.ds_descricao = req.body.ds_descricao;
        await findPrep.save(); 
        res.status(201).json({item: findPrep});
    }else{
        res.json({error: 'Modo de preparo não encontrado'})
    }
}
export const Criar_Receita = async (req: Request, res: Response)=>{
    let ds_descricao: string = req.body.ds_descricao;
    let dt_criacao: Date = new Date();
    let ie_status: boolean = true;
    let qt_rendimento: string = req.body.qt_rendimento;
    let token: string = req.body.token;
    const usuario = await CadastroUser.findOne({where:{cd_token: token}})
    let user = usuario?.cd_usuario
    let novaReceita = await Cadastrar_Receita.create({ds_descricao: ds_descricao.toUpperCase(), dt_criacao, ie_status, cd_usuario: user,qt_rendimento})
    res.status(201).json({cd_receita: novaReceita.cd_receita, ds_descricao, dt_criacao, ie_status, qt_rendimento});    
}
export const Criar_ING_Rec = async (req: Request, res: Response)=>{
    let cd_receita: string = req.body.cd_receita;

    let buscaRec = await Cadastrar_Receita.findByPk(cd_receita);
    if(buscaRec){
        let cd_receita: Number = req.body.cd_receita;
        let cd_ingrediente: Number = req.body.cd_ingrediente;
        let qt_quantidade: string = req.body.qt_quantidade;
        let nr_unidade_medida: string = req.body.nr_unidade_medida;
        const rec_ING = recIng_.build({
            cd_receita: cd_receita,
            cd_ingrediente: cd_ingrediente,
            qt_quantidade: qt_quantidade,
            nr_unidade_medida: nr_unidade_medida.toLowerCase()
        });
        await rec_ING.save();
        res.status(201).json({rec_ING});
    } else{
        res.json({error: 'receita não encontrada'});
    }
}
export const Listar_receitas = async (req: Request, res: Response)=>{
    let token = req.body.token;
    const usuario = await CadastroUser.findOne({where:{cd_token: token}})
    let cd_user = usuario?.cd_usuario
    const Receitas = await Cadastrar_Receita.findAll({attributes:['cd_receita',
    'ds_descricao', 'qt_quantidade', 'nr_unidade','vl_valor', 'qt_rendimento', 'qt_qnt_rendimento',
    'vl_rendimento'],where: {ie_status: true}, order:['ds_descricao']});
    res.json({Receitas});
}