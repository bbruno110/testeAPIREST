import { Request, Response, NextFunction } from "express"
import { CadastroUser } from '../models/Usuarios'
import JWT from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const Autorizacao = 
{
    private: async (req: Request, res: Response, next: NextFunction)=>{
        if(!req.query.token && !req.body.token)
        {
            res.json({notallowed: true});
            return;
        };
        let token = '';
        if(req.query.token)
        {
            token = req.query.token as string;
        };
        if(req.body.token)
        {
            token = req.body.token as string;
        };
        if(token == '')
        {
            res.json({ notallowed: true});
            return;
        };
        const user = await CadastroUser.findOne({where:{cd_token: token, ie_status: true}})
        if(!user)
        {
            res.json({ notallowed: true});
            return;
        };
        next();
    }
}