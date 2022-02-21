const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();

app.use(cors());
app.use(express.json());

const { Schema } = mongoose;
const costsSchema = new Schema({
  place: String,
  date: String,
  spent: Number
});

const Cost = mongoose.model("costs", costsSchema);

const uri = "mongodb+srv://user:user@cluster0.x2u0b.mongodb.net/costs?retryWrites=true&w=majority";
mongoose.connect(uri, { useUnifiedTopology: true });

app.get("/allCosts", (req, res) => {
  try {
    Cost.find().then((result) => {
      res.send({data: result});
    });
  } catch (error) {
    res.status(422).send('Error! Params not correct');
  };
});

app.post("/createCosts", (req, res) => {
    const cost = new Cost(req.body);
    try {
      cost.save().then(() => {
        Cost.find().then((result) => {
          res.send({data: result});
        });
      });
    } catch (error) {
      res.status(422).send('Error! Params not correct');
    }
});

app.delete("/deleteCosts", (req, res) => {
  const id = req.query._id;
  if(id) {
    Cost.deleteOne({ _id: id}).then(() => {
      Cost.find().then((result) => {
        res.send({data: result});
      });
    });
  } else res.status(422).send('Error! Params not correct');
});

app.patch("/changeCost", (req, res) => {
  const {body} = req;
  const id = req.body._id;
  if(body && id) {
    Cost.updateOne({_id: id}, body).then(() => {
      Cost.find().then((result) => {
        res.send( {data: result} );
      });
    });
  } else res.status(422).send('Error! Params not correct');
});

app.listen(8000, () => {
  console.log("listener:: 8000");
});
