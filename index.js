const express = require("express");
const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");
const port = 3000;

dotenv.config();

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello from backend");
});

//mongoDb connection

const uri = process.env.MONGO_STRING;
if (!uri) {
  console.log("Mongodb connection string is missing!");
}

const client = new MongoClient(uri);

async function connectDb() {
  try {
    await client.connect();
    const database = client.db("backend_demo");
    console.log("Connected to mongoDB");
  } catch (error) {
    console.error("Error connecting to mongodb database:", error);
  }
}

connectDb();

app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
