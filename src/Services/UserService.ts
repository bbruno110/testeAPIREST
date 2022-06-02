import { CadastroUser } from '../models/Usuarios';
import { Pessoa_Fisica} from '../models/PF'
import { cpf } from 'cpf-cnpj-validator';

export const Find_Name = async (token: string, descricao: string)=>{
    const userPF = await CadastroUser.findOne({where: {cd_token:token}});
    const buscaPF = await Pessoa_Fisica.findOne({where:{cd_cpf: userPF?.cd_usuario}})
    await buscaPF?.update({nm_nome: descricao},{where:{cd_cpf:userPF?.cd_usuario}})
}