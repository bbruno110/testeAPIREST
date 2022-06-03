import app from './app';
import 'dotenv/config';

const port = process.env.PORT || 3000;
app.get("/", function(req,res){
    res.send("conectando");
});

app.listen(port, ()=> console.log(`app listeninig at ${process.env.PORT}`));