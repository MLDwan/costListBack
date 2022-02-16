const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();

app.use(cors());
app.use(express.json());
// app.use("/", apiRoutes);

const { Schema } = mongoose;
const costsSchema = new Schema({
  place: String,
  spent: Number,
});

const Cost = mongoose.model("costs", costsSchema);

const uri =
  "mongodb+srv://user:user@cluster0.x2u0b.mongodb.net/costs?retryWrites=true&w=majority";
mongoose.connect(uri, { useUnifiedTopology: true });

app.get("/", (req, res) => {
  const cost = new Cost({
    place: "wqweqweqwe",
    spent: 1000,
  });
  cost.save().then((result) => {
    res.send(result);
  });
  
});

app.listen(8000, () => {
  console.log("kdkdkdk");
});
