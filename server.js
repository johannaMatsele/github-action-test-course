//const app = require('express')()

const express =require("express");
const app = express();
app.use(express.json());

//Allow access cross origin
const cors = require("cors");
app.use(cors());
const corsOptions ={
    origin:'*',
    optionsSuccessStatus:200
}
app.use(cors(corsOptions));

const favLangs =['html','css','javascript','react'];


app.get('/api/get-records',(req,res)=>{
    
    res.json({lang:favLangs})
}) 
app.post('/api/create-record',(req,res)=>{
    const record = req.body.record
    console.log(record)
    favLangs.push(record)
    res.json({status:'ok'})
})

app.listen(3001,()=>{
    console.log('server started on 3001')
})