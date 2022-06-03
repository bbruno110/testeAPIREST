import 'dotenv/config';
import express, { ErrorRequestHandler, Request, Response } from 'express';
import cors from 'cors';
import { cpf , cnpj} from 'cpf-cnpj-validator';
import { validationResult } from 'express-validator';
import {CadastroUser} from './models/Usuarios';
import {Pessoa_Fisica} from './models/PF';
import {Pessoa_Juridica} from './models/PJ';
import path from 'path';
import router from './routes/rota'


const server =  express();

server.use(cors());
server.use(express.static(path.join(__dirname, "/public")));
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

router.post("/login", async (req:Request, res:Response)=>{
    const errors = validationResult(req);
    if(errors.isEmpty())
    {
        let token: string = req.body.token;
        const detalhes_usuario = await CadastroUser.findOne({where:{cd_token: token}});
        if(detalhes_usuario)
        {
            let cd_usuario = detalhes_usuario?.cd_usuario as string
            const cpfvalidation = cpf.isValid(cd_usuario)
            if(cpfvalidation)
            {
                const pf = await Pessoa_Fisica.findOne({where:{cd_cpf:detalhes_usuario.cd_usuario}})
                let detalhepf ={
                    cd_usuario : pf?.cd_cpf,
                    nm_nome: pf?.nm_nome ,
                    ds_email: detalhes_usuario.ds_email,
                    dt_nascimento: pf?.dt_nascimento,
                    ds_telefone: pf?.ds_telefone,
                    ds_estado: pf?.ds_estado,
                    ds_cidade: pf?.ds_cidade,
                    ds_endereco: pf?.ds_endereco
                }
                return res.json({user: detalhepf})
            }
            else
            {
                const pj = await Pessoa_Juridica.findOne({where:{cd_cnpj:detalhes_usuario.cd_usuario}})
                let detalhepj ={
                    cd_usuario : pj?.cd_cnpj,
                    nm_empresarial: pj?.nm_empresarial ,
                    ds_email: detalhes_usuario.ds_email,
                    ds_telefone: pj?.ds_telefone,
                    ds_estado: pj?.ds_estado,
                    ds_cidade: pj?.ds_cidade,
                    ds_endereco: pj?.ds_endereco
                }
                return res.json({user: detalhepj})
            }
        }
    }
    else 
    {
        return res.json({status: errors.mapped()})
    }
    
})

server.use(router);
server.use((req:Request, res:Response)=>{
    res.status(404);
    res.json({error: 'Endpoint não encontrado.'});
});
export default server;