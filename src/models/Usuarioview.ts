import { timeStamp } from 'console';
import { DATEONLY } from 'sequelize';
import {Model, DataTypes, Sequelize} from 'sequelize';
import { sequelize } from '../instances/Conexao'

export interface View_Usuario_Instance extends Model{
    cd_usuario: string;
}
export const View_usuario = sequelize.define<View_Usuario_Instance>("cod_pj_pf",{
    cd_usuario:{
        type: DataTypes.STRING
    }
});
View_usuario.removeAttribute('id');
View_usuario.removeAttribute('createdAt');
View_usuario.removeAttribute('updatedAt');