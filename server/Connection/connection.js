const mongoose = require("mongoose");
const mongo = process.env.MONGO;

mongoose
  .connect(`${mongo}`, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(console.log("connected "));
