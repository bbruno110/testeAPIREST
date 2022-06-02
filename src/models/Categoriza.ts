import {Model, DataTypes, Sequelize} from 'sequelize';
import { sequelize } from '../instances/Conexao';
import { Ingrediente_ } from './Ingrediente';

export interface CAt_ingredienteInstance extends Model{
    cd_ingrediente: number;
    cd_categoria: number;
}

export const Ingrediente_Cate = sequelize.define<CAt_ingredienteInstance>("categoriza",{
    cd_categoria:{
        type: DataTypes.NUMBER
    },
    cd_ingrediente: {
        type: DataTypes.NUMBER
    },
},{
    tableName: 'categoriza',
    timestamps: false,
    
});
Ingrediente_Cate.removeAttribute('id');