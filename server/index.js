const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const redis = require('redis');
const keys = require('./keys');

//express app setup

const app = express();

//middelware setup
app.use(bodyParser.json());
app.use(cors())



//postgress client setup.. sql type  db
const {Pool} = require('pg');
const pgClient = new Pool({
    user:keys.pgUser,
    host:keys.pgHost,
    database:keys.pgDatabase,
    password:keys.pgPassword,
    port:keys.pgPort

})

pgClient.on('errror',()=>{console.log('Lost Pg connection.!')});

pgClient
.query("CREATE TABLE IF NOT EXISTS  values (number INT)")
.catch(err =>console.log(err))



//redis client setup 
const redisClient = redis.createClient({
    host:keys.redisHost,
    port:keys.redisPort,
    retry_strategy:()=> 1000
})

const redisPublisher = redisClient.duplicate();



//express route handler 

app.get('/',(req,res)=>{
    res.send('it"s works ');
})


app.get('/values/all',async(req,res)=>{

const values = await pgClient.query("SELECT * FROM values");
res.send(values.rows);


})


app.get('/values/current',async (req,res)=>{
    redisClient.hgetall('values',(err,values)=>{
        res.send(values);
    })
})


app.post("/values",async (req,res)=>{
    const {index}= req.body;
    if(parseInt(index) > 40){
        res.status(422).send("value too high");
    }

    redisClient.hset('values',index,'Not set yet!');
    redisPublisher.publish('insert',index);
    pgClient.query("INSERT INTO values (number) VALUES($1)",[index]);
   res.send({working:true})
})


app.listen(5000,()=>{
    console.log('LISTENING ....')
})








