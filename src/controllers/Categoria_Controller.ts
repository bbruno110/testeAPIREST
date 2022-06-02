import { Request, Response } from "express";
import {Categoria_} from '../models/Categoria';
import { Op, QueryTypes } from 'sequelize';
import { buildCheckFunction } from "express-validator";
import { BlobOptions } from "buffer";
import { CadastroUser } from "../models/Usuarios";

/*
    cd_categoria: number;
    ds_categoria: string;
    ie_status: boolean;
*/

export const criarCategoria = async (req: Request, res: Response)=>{
    let token = req.body.token;
    const user = await CadastroUser.findOne({where:{cd_token: token}})
    let perfil = user?.cd_perfil
    if(perfil == 1)
    {
        let ds_categoria: string = req.body.ds_categoria;
        let ie_status: boolean = true;

        let novaCat = await Categoria_.create({ds_categoria: ds_categoria.toUpperCase() ,ie_status});
        res.status(201).json({cd_categoria: novaCat.cd_categoria, ds_categoria: ds_categoria.toUpperCase(),ie_status});
    }
    else
    {
        res.json({error: 'Perfil não autorizado para Criar nova Categoria!'});
    }
}
export const atualizarCat = async (req: Request, res: Response)=>{
    let cd_categoria: string = req.body.cd_categoria;
    let token = req.body.token;
    const user = await CadastroUser.findOne({where:{cd_token: token}})
    let perfil = user?.cd_perfil
    if(perfil == 1)
    {
        let buscaCat = await Categoria_.findByPk(cd_categoria);
        if(buscaCat){
            buscaCat.ds_categoria = req.body.ds_categoria.toUpperCase();
            await buscaCat.save();
            res.status(201).json({item: buscaCat});
        } else{
            res.json({error: 'Categoria não encontrado'});
        }
    }
    else
    {
        res.json({error: 'Perfil não autorizado para Atualizar Categoria!'});
    }
}
export const ListarCategoria = async (req: Request, res: Response)=>{
    let Categoria = await Categoria_.sequelize?.query("select * from categoria c where ie_status = 'True'",
    {type: QueryTypes.SELECT});
    
    res.json({Categoria});
}
export const PesquisarCategoria = async (req: Request, res: Response)=>{
    let busca = req.body.busca;
    let Categoria = await Categoria_.findAll({where:{ds_categoria:{[Op.like]: `%${busca.toUpperCase()}%`},  ie_status: true}})
    res.json({Categoria});
}
export const Inativar = async (req: Request, res: Response)=>{
    let cd_categoria: string = req.body.cd_categoria;
    let token = req.body.token;
    const user = await CadastroUser.findOne({where:{cd_token: token}})
    let perfil = user?.cd_perfil
    if(perfil == 1)
    {
        let buscaCat = await Categoria_.findByPk(cd_categoria);
        if(buscaCat){
            let bool = buscaCat.ie_status;
            if(bool == true)
            {
            buscaCat.ie_status = false;
            await buscaCat.save();
            res.status(201).json({item: buscaCat});
            }
            else
            {
                buscaCat.ie_status = true;
                await buscaCat.save();
                res.status(201).json({item: buscaCat});
            }
        }
        else{
            res.json({error: 'Categoria não encontrado'});
        }
    }
    else
    {
        res.json({error: 'Perfil não autorizado para Invativar/Ativar Categoria!'});
    }
}