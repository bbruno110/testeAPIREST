import {Model, DataTypes, Sequelize} from 'sequelize';
import { sequelize } from '../instances/Conexao';


export interface receita_ingrediente extends Model{
    cd_receita: number;
    cd_ingrediente: number;
    qt_quantidade: string;
    nr_unidade_medida: string;
}

export const recIng_ = sequelize.define<receita_ingrediente>("ingrediente_receita",{
    cd_receita:{
        type: DataTypes.NUMBER
    },
    cd_ingrediente: {
        type: DataTypes.NUMBER
    },
    qt_quantidade: {
        type: DataTypes.STRING
    },
    nr_unidade_medida: {
        type: DataTypes.STRING
    },
},{
    tableName: 'ingrediente_receita',
    timestamps: false,
    
});
recIng_.removeAttribute('id');