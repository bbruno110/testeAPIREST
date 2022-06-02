import {Model, DataTypes, Sequelize} from 'sequelize';
import { sequelize } from '../instances/Conexao';
import { Ingrediente_ } from './Ingrediente';

export interface nut_ingredienteInstance extends Model{
    cd_produto: number;
    qt_quantidade: number;
    cd_nutriente: string;
    nr_unidade_medida:string;
}

export const Ingrediente_nutr = sequelize.define<nut_ingredienteInstance>("cd_nutriente",{
    cd_produto:{
        type: DataTypes.NUMBER
    },
    cd_nutriente: {
        type: DataTypes.STRING
    },
    qt_quantidade: {
        type: DataTypes.NUMBER
    },
    nr_unidade_medida: {
        type: DataTypes.STRING
    },
},{
    tableName: 'cd_nutriente',
    timestamps: false,
    
});
Ingrediente_nutr.removeAttribute('id');