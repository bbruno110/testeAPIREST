import 'dotenv/config';
import express, { ErrorRequestHandler, Request, Response } from 'express';
import cors from 'cors';
import path from 'path';
import router from './routes/hike';

const server =  express();

server.use(cors())
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.get('*',(req, res)=>{
res.sendFile(path.join(__dirname, "/public"));
})
server.use(router);
export default server;