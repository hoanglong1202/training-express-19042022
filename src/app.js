const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 5010;

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

app.use("/api", routes);

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true });

app.listen(PORT, () => console.log(`Server listen on ${PORT}`));
