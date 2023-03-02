const express = require('express');
const cors = require('cors');
const mongodb = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
const MongoClient = mongodb.MongoClient;
const dotenv = require('dotenv');
dotenv.config();

let app = express();
app.use(express.json());
app.use(cors());

let db


// connect to the Mongo DB
async function connect() {
    const mongo_url = process.env.MONGO_URI;
    let client = await MongoClient.connect(mongo_url, {
        "useUnifiedTopology": true
    })
    let db = client.db("motorcycle");
    console.log("database connected");
    return db;
}

// ROUTES
async function main() {
    db = await connect();
    app.get('/specification', async  (req, res) => {
        let items = await db.collection('specification').find().toArray();
        res.json(items)
        
    })

    app.post('/specification', async  (req, res) => {
        let items = await db.collection('specification').insertOne({
            Brand: req.body.Brand,
            Model: req.body.Model,
            Year: req.body.Year
        })
        res.json(items);
        
    })
    
}

main();

// START SERVER
// note: we set port to 8888 so it won't clash with React
app.listen(8888, () => {
    console.log("server has started")
})

