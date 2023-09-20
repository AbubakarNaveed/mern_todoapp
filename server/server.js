const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");

const port = process.env.PORT;

const app = express();
app.use(cors());
app.use(express.json());

require("./Connection/connection");
app.listen(port, console.log(`Server running on port : ${port}`));

app.use("/", require("./Routes/Routes"));
