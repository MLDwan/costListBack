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

app.get("/", (req, res) => {
  Cost.find().then((result) => {
    res.send({body: result});
  });
});

app.post("/createCosts", (req, res) => {
  const cost = new Cost(req.body);
  cost.save().then(() => {
    Cost.find().then((result) => {
      res.send({data: result});
    });
  });
});

<<<<<<< HEAD
=======
app.delete("/deleteCosts", (req, res) => {
  Cost.deleteOne({ _id: req.query._id }).then(() => {
    Cost.find().then((result) => {
      res.send({data: result});
    });
  });
});

>>>>>>> 7ab85b291985e8a3b8aa3e5aacf9a6684190a20e
app.listen(8000, () => {
  console.log("listener:: 8000");
});
