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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Autorizacao = void 0;
const Usuarios_1 = require("../models/Usuarios");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.Autorizacao = {
    private: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        if (!req.query.token && !req.body.token) {
            res.json({ notallowed: true });
            return;
        }
        ;
        let token = '';
        if (req.query.token) {
            token = req.query.token;
        }
        ;
        if (req.body.token) {
            token = req.body.token;
        }
        ;
        if (token == '') {
            res.json({ notallowed: true });
            return;
        }
        ;
        const user = yield Usuarios_1.CadastroUser.findOne({ where: { cd_token: token, ie_status: true } });
        if (!user) {
            res.json({ notallowed: true });
            return;
        }
        ;
        next();
    })
};
