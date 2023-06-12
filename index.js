
const express = require('express');
const cors = require('cors');
const app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');
const port  = 3000;


app.use(cors())
app.use(express.json())


// mongo Db connection




const uri = "mongodb+srv://ict_department:D7jAKNW4OpfxQS40@cluster0.cs80kn3.mongodb.net/?retryWrites=true&w=majority";

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

    //create a database

    const database = client.db("ict_department");
    const teachers = database.collection("teachers");

    const notice = database.collection("notice")

   //*****************Teacher Collection*****************//
    
    app.get("/teachers" , async(req,res)=>{
      const query = {};
      const cursor = teachers.find(query);
      const result = await cursor.toArray();
      res.send(result);
    })
  

    app.post("/teacher" , async(req,res)=>{
          const new_teacher  = req.body;
          const result  = await teachers.insertOne(new_teacher)
          res.send(result)
           
    })


   //*********** Teacher DB Collection **********//
  //*********** Notice  DB Collection **********//

  app.get("/notices" , async(req,res)=>{
    const query = {};
    const cursor = notice.find(query);
    const result = await cursor.toArray();
    res.send(result)
  })

  app.post("/notice" , async(req,res)=>{
    const new_notice = req.body;
    const result  = await notice.insertOne(new_notice)
    res.send(result)
     
})

  //*********** Notice  DB Collection **********//

    
  } finally {
    // Ensures that the client will close when you finish/error
    
  }
}
run().catch(console.dir);






//

app.get("/" , (req, res) =>{
    res.send("Hello world")
})


app.listen(port, ()=>{
    console.log(`server is running port: ${port}`)
})

//D7jAKNW4OpfxQS40 //ict_department