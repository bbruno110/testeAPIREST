"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const autorizacao_1 = require("../middlewares/autorizacao");
const pfcontroller = __importStar(require("../controllers/pfController"));
const cadUserController = __importStar(require("../controllers/Usuario"));
const CategoriaController = __importStar(require("../controllers/Categoria_Controller"));
const NutrienteController = __importStar(require("../controllers/Nutriente_Controller"));
const Ingredientes_Controller = __importStar(require("../controllers/Ingredientes_Controller"));
const Receita_controller = __importStar(require("../controllers/Receita"));
const uservalidator = __importStar(require("../Validator/Cadastro_user"));
const ingvalidator = __importStar(require("../Validator/Ingrediente_Validator"));
const router = (0, express_1.Router)();
router.get('/', (req, res) => { return res.json({ message: 'backend works!' }); });
router.post("/login", cadUserController.Login);
router.post("/cadastro/Pessoa", autorizacao_1.Autorizacao.private, pfcontroller.criarPessoa);
router.post("/cadastro", uservalidator.usuario, cadUserController.Registro_user);
router.post("/esqueci-senha", cadUserController.esqueci_senha);
router.get("/user/me", autorizacao_1.Autorizacao.private, cadUserController.Detalhes);
router.put("/user/me", autorizacao_1.Autorizacao.private, cadUserController.edit_user);
router.put("/user/me/In-At", autorizacao_1.Autorizacao.private, cadUserController.Inativar);
router.get("/user/busca", autorizacao_1.Autorizacao.private, cadUserController.bucar_Usuario);
router.post("/criar-ingrediente", autorizacao_1.Autorizacao.private, ingvalidator.Criar_ING, Ingredientes_Controller.NovoIngrediente);
router.post("/criar-ingrediente/Cat", autorizacao_1.Autorizacao.private, Ingredientes_Controller.Criar_CAT_ING);
router.post("/criar-ingrediente/Nut", autorizacao_1.Autorizacao.private, Ingredientes_Controller.Criar_Nut_ING);
router.get("/lista-ingrediente", autorizacao_1.Autorizacao.private, Ingredientes_Controller.ListarIngrediente);
router.delete("/delete-ingrediente", autorizacao_1.Autorizacao.private, Ingredientes_Controller.Delete_ing);
router.delete("/delete-ingrediente/nutriente", autorizacao_1.Autorizacao.private, Ingredientes_Controller.Delete_nut_ing);
router.delete("/delete-ingrediente/categoria", autorizacao_1.Autorizacao.private, Ingredientes_Controller.Delete_cat_ing);
router.post("/Cad-Nutriente", autorizacao_1.Autorizacao.private, NutrienteController.CriarNut);
router.put("/At-Nutriente", autorizacao_1.Autorizacao.private, NutrienteController.atualizarNut);
router.put("/Inativar-Nutriente", autorizacao_1.Autorizacao.private, NutrienteController.Inativar);
router.get("/Nutriente", autorizacao_1.Autorizacao.private, NutrienteController.ListarNutriente);
router.get("/busca-Nutriente", autorizacao_1.Autorizacao.private, NutrienteController.ListarNutriente);
router.post("/Cad-Categoria", autorizacao_1.Autorizacao.private, CategoriaController.criarCategoria);
router.get("/Categoria", autorizacao_1.Autorizacao.private, CategoriaController.ListarCategoria);
router.get("/busca-Categoria", autorizacao_1.Autorizacao.private, CategoriaController.PesquisarCategoria);
router.put("/Inativar-Categoria", autorizacao_1.Autorizacao.private, CategoriaController.Inativar);
router.put("/At-Categoria", autorizacao_1.Autorizacao.private, CategoriaController.atualizarCat);
router.post("/Receita", autorizacao_1.Autorizacao.private, Receita_controller.Criar_Receita);
router.get("/Receita", autorizacao_1.Autorizacao.private, Receita_controller.Listar_receitas);
router.post("/Receita/Ingrediente", autorizacao_1.Autorizacao.private, Receita_controller.Criar_ING_Rec);
router.post("/Receita/Preparo", autorizacao_1.Autorizacao.private, Receita_controller.modo_Preparo);
exports.default = router;
