const keys = require('./keys');
const redis = require('redis');


const redisClient =  redis.createClient({
    host:keys.redisHost,
    port:keys.redisPort,
    retry_strategy:()=> 1000
})

const subsciption = redisClient.duplicate();


function fib (n){
if(n < 2) return n;
return fib(n-1)+ fib(n-2);
}

subsciption.on('message',(channel,message)=>{
    redisClient.hset('values',message,parseInt(fib(message)));
})

subsciption.subscribe('insert');