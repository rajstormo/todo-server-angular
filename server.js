const express = require("express");
const mongoose = require("mongoose")
const app = express();
const cors = require("cors");
require('dotenv').config()

const connectDB = require("./config/dbConfig");
const todoRoutes = require("./routes/todo/todo");
const PORT = process.env.PORT;

// db connection
connectDB();

app.use(cors());
app.use(express.urlencoded({extended:false}));
app.use(express.json());

//routes
app.use('', todoRoutes);

app.get('/', (req, res) => {
  return res.send("working");
})

mongoose.connection.once('open', () => {
  console.log("db connected");
  app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
  })
})


