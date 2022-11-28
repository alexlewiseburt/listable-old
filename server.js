const express = require("express");
const path = require("path");
const cors = require("cors");

const {
  getList,
  getAllLists,
  createList,
  seed,
} = require("./backend/controller");

const app = express();

app.use(express.json());
app.use(cors());

// Frontend
app.use(express.static(path.join(__dirname, "public")));

// Backend
app.get("/api/lists/:id", getList);
app.get("/api/lists", getAllLists);
app.post("/api/lists", createList);
app.post("/seed", seed);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
