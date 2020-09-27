require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const auth = require("./routes/auth");
const post = require("./routes/post");
const user = require("./routes/user");

// MONGO DB CONNECTION
mongoose.connect(
  process.env.MONGO_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
  () => {
    console.log("DB CONNECTED");
  }
);

// MIDDLEWARES
app.use(express.json());
app.use(cors());

// ROUTES
app.use("/", auth);
app.use("/", post);
app.use("/", user);

// LISTENING
app.listen(process.env.PORT, () => {
  console.log(`Listening at port 5000`);
});
