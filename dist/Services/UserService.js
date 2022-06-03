"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Find_Name = void 0;
const Usuarios_1 = require("../models/Usuarios");
const PF_1 = require("../models/PF");
const Find_Name = (token, descricao) => __awaiter(void 0, void 0, void 0, function* () {
    const userPF = yield Usuarios_1.CadastroUser.findOne({ where: { cd_token: token } });
    const buscaPF = yield PF_1.Pessoa_Fisica.findOne({ where: { cd_cpf: userPF === null || userPF === void 0 ? void 0 : userPF.cd_usuario } });
    yield (buscaPF === null || buscaPF === void 0 ? void 0 : buscaPF.update({ nm_nome: descricao }, { where: { cd_cpf: userPF === null || userPF === void 0 ? void 0 : userPF.cd_usuario } }));
});
exports.Find_Name = Find_Name;
