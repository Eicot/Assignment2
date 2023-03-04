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

    app.get('/specification/:cycleId', async  (req, res) => {
        let items = await db.collection('specification').findOne({
            _id: new ObjectId(req.params.cycleId)
        });
        res.json(items);
        
    })

    app.post('/specification', async  (req, res) => {
        let items = await db.collection('specification').insertOne({
            Brand: req.body.Brand,
            Model: req.body.Model,
            Year: req.body.Year,
            Category: req.body.Category,
            Cooling_system: req.body.Cooling_system,
            Engine_cylinder: req.body.Engine_stroke,
            Front_brakes: req.body.Front_brakes,
            Front_suspension: req.body.Front_suspension,
            Rear_brakes: req.body.Rear_brakes,
            Rear_suspension: req.body.Rear_suspension,
            Gearbox: req.body.Gearbox,
            Power_hp: req.body.Power_hp,
            Transmission_type: req.body.Transmission_type
        })
        res.json(items);
        
    })

    app.patch('/specification/:id', async (req, res) => {
        let results = await db.collection('specification').updateOne({
            '_id': new ObjectId(req.params.id),
        }, {
            '$set': {
                'Brand': req.body.Brand,
                'Model': req.body.Model
            }
        })
        res.json({
            'status': true
        })
    })
    
}

main();

// START SERVER
// note: we set port to 8888 so it won't clash with React
app.listen(8888, () => {
    console.log("server has started")
})

