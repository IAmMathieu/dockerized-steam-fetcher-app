require("dotenv").config();
const express = require("express");
const cors = require("cors");

const PORT = process.env.PORT || 1337;

const app = express();
const router = require("./app/router/router");

const corsOptions = {
  origin: "*",
  methods: "GET, HEAD, POST, PATCH, DELETE, OPTIONS",
  credentials: false,
  preflightContinue: false,
  allowedHeaders: "Content-Type, Authorization, X-Requested-With",
};

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors(corsOptions));
app.use(router);

app.listen(PORT, () => {
  console.log(`Server listening on: http://localhost:${PORT}`);
});
