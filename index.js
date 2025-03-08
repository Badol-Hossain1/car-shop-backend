require('dotenv').config();
const express = require('express')
const app = express()
const cors =  require('cors')
const port = process.env.PORT || 4000
app.use(cors())
app.use(express.json())
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');






const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@prectice.eqvb1.mongodb.net/?retryWrites=true&w=majority&appName=Prectice`;


const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const db = client.db('cars').collection('car')
    // Send a ping to confirm a successful connection
    // create user 
    app.post('/add',async(req,res)=> {
        const data = req.body
        const query =await db.insertOne(data)
        res.send(query)
        
    })
    // read data 
    app.get('/',async(req,res)=> {
        const find =await db.find().toArray()
  
        res.send(find)
    })

    // find one 

  app.get('/find/:id',async(req,res)=> {
    const id = req.params.id
   
    const filter = {_id: new ObjectId(id)}
    const result = await db.findOne(filter)
  res.send(result)
    
  })

  app.delete('/:id',async(req,res) => {
    const id = req.params.id
    const filter= {_id: new ObjectId(id)}
    const result = await db.deleteOne(filter)
    res.send(result)
  })


    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);




  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })