const express =require('express')
const cors=require('cors')
require('dotenv').config()
const app =express()
const port=process.env.PORT ||3000
const { MongoClient, ServerApiVersion } = require('mongodb');
console.log(process.env.DB_USER);



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.8n6fjbk.mongodb.net/?retryWrites=true&w=majority&appName=cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();

    const  coffeesCollection=client.db('coffeeDB').collection('coffees')

    app.post('/coffees',async(req,res)=>{
        const newCoffee=req.body
        console.log(newCoffee);
        const result=await coffeesCollection.insertOne(newCoffee)
        res.send(result)
    })
    
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    
    // await client.close();
  }
}
run().catch(console.dir);



app.use(cors())
app.use(express.json())

app.get('/',(req,res)=>{
    res.send('coffee server loading')
})
app.listen(port,()=>{
    console.log(`coffee server is running on port ${port}`)
    
})