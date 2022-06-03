import server from './app';
import 'dotenv/config';

server.listen(process.env.PORT, ()=> console.log(`app listeninig at ${process.env.PORT}`));