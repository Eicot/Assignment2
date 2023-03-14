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
      ColorOptions: req.body.ColorOptions,
      Engine: {
        Bore_mm: req.body.Bore,
        CoolingSystem: req.body.CoolingSystem,
        Cylinder: req.body.Cylinder,
        Displacement_ccm: req.body.Displacement,
        Gearbox: req.body.Gearbox,
        Power_hp: req.body.Power,
        Stroke: req.body.Stroke,
        Torque_Nm: req.body.Torque,
        TransmissionType: req.body.Transmission,
      },
      Fuel: {
        Capacity_lts: req.body.Capacity,
        Control: req.body.Control,
        System: req.body.System,
      },
      Physical: {
        DryWeight_kg: req.body.Weight,
        SeatHeight_mm: req.body.SeatHeight,
        Wheelbase_mm: req.body.Wheelbase,
      },
      Wheel: {
        FrontBrakes: req.body.FrontBrakes,
        FrontSuspension: req.body.FrontSuspension,
        FrontTire: req.body.FrontTire,
        RearBrakes: req.body.RearBrakes,
        RearSuspension: req.body.RearSuspension,
        RearTire: req.body.RearTire
      }

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
        ColorOptions: req.body.ColorOptions,
        'Engine.Bore_mm': req.body.Bore,
        'Engine.CoolingSystem': req.body.CoolingSystem,
        'Engine.Cylinder': req.body.Cylinder,
        'Engine.Displacement_ccm': req.body.Displacement,
        'Engine.Gearbox': req.body.Gearbox,
        'Engine.Power_hp': req.body.Power,
        'Engine.Stroke': req.body.Stroke,
        'Engine.Torque_Nm': req.body.Torque,
        'Engine.TransmissionType': req.body.Transmission,
        'Fuel.Capacity_lts': req.body.Capacity,
        'Fuel.Control': req.body.Control,
        'Fuel.System': req.body.System,
        'Physical.DryWeight_kg': req.body.Weight,
        'Physical.SeatHeight_mm': req.body.SeatHeight,
        'Physical.Wheelbase_mm': req.body.Wheelbase,
        'Wheel.FrontBrakes': req.body.FrontBrakes,
        'Wheel.FrontSuspension': req.body.FrontSuspension,
        'Wheel.FrontTire': req.body.FrontTire,
        'Wheel.RearBrakes': req.body.RearBrakes,
        'Wheel.RearSuspension': req.body.RearSuspension,
        'Wheel.RearTire': req.body.RearTire
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

