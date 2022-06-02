import { Request, Response } from "express";
import {Ingrediente_} from '../models/Ingrediente';
import {Ingrediente_nutr} from '../models/cd_nutriente';
import {Ingrediente_Cate} from '../models/Categoriza';
import { Nutrientes } from "../models/Nutrientes";
import { Op, or, QueryTypes } from 'sequelize';
import { CadastroUser } from "../models/Usuarios";
import { Categoria_ } from "../models/Categoria";

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

export const NovoIngrediente = async (req: Request, res: Response)=>{
    let ds_produto: string = req.body.ds_produto;
    let cd_unidade_medida: string = req.body.cd_unidade_medida;
    let qt_umidade: string = req.body.qt_umidade;
    let qt_kj: Number = req.body.qt_kj;
    let qt_kcal: Number = req.body.qt_kcal;
    let vl_valor: Number = req.body.vl_valor;
    let qt_quantidade: string = req.body.qt_quantidade;
    let ie_status: boolean = true;
    let token: string = req.body.token;
    const usuario = await CadastroUser.findOne({where:{cd_token: token}})
    let user = usuario?.cd_usuario
    let dt_atualizacao: Date = new Date();
    let novoIng = await Ingrediente_.create({ds_produto: ds_produto.toUpperCase() ,cd_usuario: user,cd_unidade_medida: cd_unidade_medida.toLowerCase() ,qt_umidade,qt_kj, qt_kcal, vl_valor, qt_quantidade, ie_status, dt_atualizacao});
    res.status(201).json({novoIng});
}
export const Criar_Nut_ING = async (req: Request, res: Response)=>{
    let cd_ingrediente: string = req.body.cd_ingrediente;
    let buscaIng = await Ingrediente_.findByPk(cd_ingrediente);
    if(buscaIng){
        let cd_produto: string = req.body.cd_ingrediente;
        let cd_nutriente: string = req.body.cd_nutriente;
        let qt_quantidade: Number = req.body.qt_quantidade;
        const nutt = await Nutrientes.findOne({where:{cd_nutriente}})
        const nut_ing = Ingrediente_nutr.build({
            cd_produto: cd_produto.toUpperCase(),
            cd_nutriente: cd_nutriente,
            qt_quantidade: qt_quantidade,
            nr_unidade_medida: nutt?.cd_unidade_medida
        });
        await nut_ing.save();
        res.status(201).json({nut_ing});
    } else{
        res.json({error: 'Nutriente não encontrado'});
    }
}
export const Criar_CAT_ING = async (req: Request, res: Response)=>{
    
    let cd_ingrediente: string = req.body.cd_ingrediente;
    let buscaIng = await Ingrediente_.findByPk(cd_ingrediente);
    if(buscaIng){
        let cd_ingrediente: number = req.body.cd_ingrediente;
        let cd_categoria: number = req.body.cd_categoria;
        const catt = await Categoria_.findByPk(cd_categoria)
        if(catt)
        {
            const cd_cat = await Ingrediente_Cate.findOne({where:{cd_ingrediente, cd_categoria}})
            if(cd_cat)
            {
                res.json({error: 'Categoria já cadastrada nesse ingrediente'});
            }
            else
            {
                const cat_ing = Ingrediente_Cate.build({
                    cd_ingrediente: cd_ingrediente,
                    cd_categoria: cd_categoria
                });
                await cat_ing.save();
                res.status(201).json({cat_ing});
            }
        }
        else
        {
            res.json({error: 'Categoria não encontrado'});
        }
    } else{
        res.json({error: 'Ingrediente não encontrado'});
    }
}
export const Delete_ing = async (req: Request, res: Response)=>{
    let token: string = req.body.token;
    const info_user = await CadastroUser.findOne({where:{cd_token:token}})
    let perfil = info_user?.cd_perfil
    let id = info_user?.cd_usuario
    let cd_ingrediente = req.body.cd_ingrediente;
    const ing = await Ingrediente_.findOne({where:{cd_produto:cd_ingrediente}})
    let id_ing = ing?.cd_usuario
    if(ing)
    {
        if(id == id_ing || perfil == 1)
        {
            await Ingrediente_.destroy({where:{cd_produto:cd_ingrediente}});
            res.json({});
        }
        else
        {
            res.json({error: 'Você não tem permissão/ou criou este ingrediente!'});
        }
    }
    else
    {
        res.json({error: 'Ingrediente não encontrado!'});
    }
}
export const Delete_cat_ing = async (req: Request, res: Response)=>{
    let token: string = req.body.token;
    const info_user = await CadastroUser.findOne({where:{cd_token:token}})
    let perfil = info_user?.cd_perfil
    let id = info_user?.cd_usuario
    let cd_ingrediente = req.body.cd_ingrediente;
    let cd_categoria = req.body.cd_categoria;
    const ing = await Ingrediente_.findOne({where:{cd_produto:cd_ingrediente}})
    let id_ing = ing?.cd_usuario
    if(ing)
    {
        if(id == id_ing || perfil == 1)
        {
            await Ingrediente_Cate.destroy({where:{cd_ingrediente, cd_categoria}});
            res.json({});
        }
        else
        {
            res.json({error: 'Você não tem permissão/ou criou esta categoria do ingrediente!'});
        }
    }
    else
    {
        res.json({error: 'Ingrediente não encontrado!'});
    }
}
export const Delete_nut_ing = async (req: Request, res: Response)=>{
    let token: string = req.body.token;
    const info_user = await CadastroUser.findOne({where:{cd_token:token}})
    let perfil = info_user?.cd_perfil
    let id = info_user?.cd_usuario
    let cd_ingrediente = req.body.cd_ingrediente;
    let cd_nutriente = req.body.cd_nutriente;
    const ing = await Ingrediente_.findOne({where:{cd_produto:cd_ingrediente}})
    let id_ing = ing?.cd_usuario
    if(ing)
    {
        if(id == id_ing || perfil == 1)
        {
            await Ingrediente_nutr.destroy({where:{cd_produto:cd_ingrediente, cd_nutriente}});
            res.json({});
        }
        else
        {
            res.json({error: 'Você não tem permissão/ou criou este nutrienta do ingrediente!'});
        }
    }
    else
    {
        res.json({error: 'Ingrediente não encontrado!'});
    }
}
export const ListarIngrediente = async (req: Request, res: Response)=>{
    let Ingredientes = await Ingrediente_.sequelize?.query("select * from listar_produtos lp ",
    {type: QueryTypes.SELECT});
    
    res.json({Ingredientes});
}