const express = require("express");
const app = express();
require("dotenv").config();
const cors = require('cors')
app.use(cors())
const port = process.env.PORT || 5000;
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const findOrCreate = require("mongoose-findorcreate");
const mongoose = require("mongoose");
const Product = require('./schemas/productSchema')
const productRouter = require('./routes/productRouter')
const userRouter = require('./routes/userRouter')
const authRouter = require('./routes/authRouter')
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Expose-Headers','Authorization');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.use("/api/products", productRouter)
app.use("/api/users", userRouter)
app.use("/api/v1/auth", authRouter)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
