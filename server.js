import express from 'express'
import mongoose from 'mongoose'
const  connection_url=`mongodb+srv://admin:00912693tinder@cluster0.0nviw.mongodb.net/tinderdb?retryWrites=true&w=majority`;
import Cards from './dbCards.js';
import Cors from 'cors';

// App config

const app=express();
const port= process.env.PORT||8080;


// middlewares
app.use(express.json());
app.use(Cors());



// db config
mongoose.connect(connection_url,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true,
});

// API ENDPOINT
app.get('/',(req,res)=>
{
    res.status(200).send('Hello Gourav');
})
app.post('/tinder/cards',(req,res)=>
{
    const dbCard= req.body;

    Cards.create(dbCard,(err,data)=>
    {
        if(err){
        res.status(500).send(err);
        }
        else{
            res.status(201).send(data);
        }
    })
})

app.get('/tinder/cards',(req,res)=>
{
    Cards.find((err,data)=>
    {
        if(err)
        {
            res.status(500).send(err);
        }
        else
        {
            res.status(200).send(data);
        }
    })
})

// listener

app.listen(port,()=> console.log(`listening on ${port}`));