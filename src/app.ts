import 'dotenv/config';
import express, { ErrorRequestHandler, Request, Response } from 'express';
import cors from 'cors';
import path from 'path';
import router from './routes/rota'


const server =  express();

server.use(cors());
server.use(express.static(path.join(__dirname, "/public")));
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

server.use(router);
server.use((req:Request, res:Response)=>{
    res.status(404);
    res.json({error: 'Endpoint não encontrado.'});
});
export default server;