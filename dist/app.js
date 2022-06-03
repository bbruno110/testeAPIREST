"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const hike_1 = __importDefault(require("./routes/hike"));
const server = (0, express_1.default)();
server.use((0, cors_1.default)());
server.use(express_1.default.json());
server.use(hike_1.default);
server.use(express_1.default.urlencoded({ extended: true }));
server.use(express_1.default.static(path_1.default.join(__dirname, "/public")));
exports.default = server;
