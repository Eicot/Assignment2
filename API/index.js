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
  app.get('/specification', async (req, res) => {
    let items = await db.collection('specification').find().toArray();
    res.json(items)

  })

  app.get('/specification/:cycleId', async (req, res) => {
    let c = await db.collection('specification').findOne({
      _id: new ObjectId(req.params.cycleId)
    });
    res.json(c);

  })

  app.post('/specification', async (req, res) => {
    let items = await db.collection('specification').insertOne({
      Brand: req.body.Brand,
      Model: req.body.Model,
      Year: req.body.Year,
      Image: req.body.Image,
      Description: req.body.Description,
      Category: req.body.Category,
      Bore: req.body.Engine.Bore_mm,
      CoolingSystem: req.body.Engine.CoolingSystem,
      Cylinder: req.body.Engine.Cylinder,
      Displacement: req.body.Engine.Displacement,
      Gearbox: req.body.Engine.Gearbox,
      Power: req.body.Engine.Power_hp,
      Stroke: req.body.Engine.Stroke,
      Torque: req.body.Engine.Torque_Nm,
      Transmission: req.body.Engine.TransmissionType,
      Capacity: req.body.Fuel.Capacity_lts,
      Control: req.body.Fuel.Control,
      System: req.body.Fuel.System,
      Weight: req.body.Physical.DryWeight_kg,
      SeatHeight: req.body.Physical.SeatHeight_mm,
      Wheelbase: req.body.Physical.Wheelbase_mm,
      FrontBrakes: req.body.Wheel.FrontBrakes,
      FrontSuspension: req.body.Wheel.FrontSuspension,
      FrontTire: req.body.Wheel.FrontTire,
      RearBrakes: req.body.Wheel.RearBrakes,
      RearSuspension: req.body.Wheel.RearSuspension,
      RearTire: req.body.Wheel.RearTire
    })
    res.json(items);

  })

  app.patch('/specification/:id', async (req, res) => {
    let results = await db.collection('specification').updateOne({
      '_id': new ObjectId(req.params.id),
    }, {
      '$set': {
        Brand: req.body.Brand,
        Model: req.body.Model,
        Year: req.body.Year,
        Image: req.body.Image,
        Description: req.body.Description,
        Category: req.body.Category,
        Bore: req.body.Engine.Bore_mm,
        CoolingSystem: req.body.Engine.CoolingSystem,
        Cylinder: req.body.Engine.Cylinder,
        Displacement: req.body.Engine.Displacement,
        Gearbox: req.body.Engine.Gearbox,
        Power: req.body.Engine.Power_hp,
        Stroke: req.body.Engine.Stroke,
        Torque: req.body.Engine.Torque_Nm,
        Transmission: req.body.Engine.TransmissionType,
        Capacity: req.body.Fuel.Capacity_lts,
        Control: req.body.Fuel.Control,
        System: req.body.Fuel.System,
        Weight: req.body.Physical.DryWeight_kg,
        SeatHeight: req.body.Physical.SeatHeight_mm,
        Wheelbase: req.body.Physical.Wheelbase_mm,
        FrontBrakes: req.body.Wheel.FrontBrakes,
        FrontSuspension: req.body.Wheel.FrontSuspension,
        FrontTire: req.body.Wheel.FrontTire,
        RearBrakes: req.body.Wheel.RearBrakes,
        RearSuspension: req.body.Wheel.RearSuspension,
        RearTire: req.body.Wheel.RearTire
      }
    })
    res.json({
      'status': true
    })
  })

  app.delete('/specification/:id', async (req, res) => {
    let results = await db.collection('specification').deleteOne({
      '_id': new ObjectId(req.params.id)
    })
    res.json({
      'message': 'Success'
    })
  })

}

main();

// START SERVER
// note: we set port to 8888 so it won't clash with React
app.listen(8888, () => {
  console.log("server has started")
})

