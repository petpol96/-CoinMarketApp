const express = require('express');
const app= express();
const coins =require('./routes/coins')
const port= 3000

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/v1/coins',coins)

const start = async()=>{
    try{
        app.listen(port,console.log('Server Listening'))
    }
    catch(error){

    }
}

start()