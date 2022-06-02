import { Request, Response } from "express";
import {Nutrientes} from '../models/Nutrientes';
import { Op, QueryTypes } from 'sequelize';
import { CadastroUser } from '../models/Usuarios'
/*
    cd_unidade_medida: string;
    ds_nutriente: string;
    cd_nutriente: string;
    qt_quantidade: string;
    ie_status: boolean;
*/

export const CriarNut = async (req: Request, res: Response)=>{
    let cd_unidade_medida: string = req.body.cd_unidade_medida;
    let ds_nutriente: string = req.body.ds_nutriente;
    let ie_status: boolean = true;
    let ie_tipo: string = req.body.ie_tipo;
    let token = req.body.token;
    const user = await CadastroUser.findOne({where:{cd_token: token}})
    let perfil = user?.cd_perfil
    if(perfil == 1)
    {
        const nutriente = await Nutrientes.findOne({where: {ds_nutriente: ds_nutriente.toUpperCase() }})
        if(nutriente)
        {
            res.json({error: 'Já existe um nutriente com esse nome!'});

        }
        else
        {
            let novoNut = await Nutrientes.create({cd_unidade_medida: cd_unidade_medida.toLowerCase(), ds_nutriente: ds_nutriente.toUpperCase() ,ie_status, ie_tipo});
            res.status(201).json({cd_nutriente: novoNut.cd_nutriente,cd_unidade_medida: cd_unidade_medida.toLowerCase() ,ds_nutriente: ds_nutriente.toUpperCase(),ie_status});
        }
    }
    else{
        res.json({error: 'Perfil não autorizado para Cadastro de Nutrientes'});
    }

}

export const atualizarNut = async (req: Request, res: Response)=>{
    let cd_nutriente: string = req.body.cd_nutriente;

    let token = req.body.token;
    const user = await CadastroUser.findOne({where:{cd_token: token}})
    let perfil = user?.cd_perfil
    if(perfil == 1)
    {
        let buscaNut = await Nutrientes.findByPk(cd_nutriente);
        if(buscaNut){
            buscaNut.cd_unidade_medida = req.body.cd_unidade_medida;
            buscaNut.ds_nutriente = req.body.ds_nutriente.toUpperCase();

            await buscaNut.save();
            res.status(201).json({item: buscaNut});
        } else{
            res.json({error: 'Nutriente não encontrado'});
        }
    }
    else
    {
        res.json({error: 'Perfil não autorizado para Atualizar Nutrientes'});
    }
}

export const ListarNutriente = async (req: Request, res: Response)=>{
    let Nutriente = await Nutrientes.sequelize?.query("select * from nutriente n  where ie_status = 'True'",
    {type: QueryTypes.SELECT});
    
    res.json({Nutriente});
}
export const PesquisarNutriente = async (req: Request, res: Response)=>{
    let ds_nutriente = req.body.ds_nutriente;
    let nutriente = await Nutrientes.findAll({where:{ds_categoria:{[Op.like]: `%${ds_nutriente.toUpperCase()}%`},  ie_status: true}})
    res.json({nutriente});
}


export const Inativar = async (req: Request, res: Response)=>{
    let cd_nutriente: string = req.body.cd_nutriente;

    let token = req.body.token;
    const user = await CadastroUser.findOne({where:{cd_token: token}})
    let perfil = user?.cd_perfil
    if(perfil == 1)
    {
        let buscanut = await Nutrientes.findByPk(cd_nutriente);
        if(buscanut){
            let bool = buscanut.ie_status;
            if(bool == true)
            {
                buscanut.ie_status = false;
            await buscanut.save();
            res.status(201).json({item: buscanut});
            }
            else
            {
                buscanut.ie_status = true;
                await buscanut.save();
                res.status(201).json({item: buscanut});
            }
        }
        else{
            res.json({error: 'Nutriente não encontrado'});
        }
    }
    else {
        res.json({error: 'Perfil não autorizado para Inativar/Ativar Nutrientes'});
    }
}