const express = require("express");
const mongoose = require("mongoose");
const app = express();
const profile = require("./routes/api/register");
const profile1 = require("./routes/api/profile");
const post = require("./routes/api/post");
const passport = require("passport");
const passpor = require("./config/passjwt");
// const cors=require('cors')

// app.use(cors())
app.use(passport.initialize());
passpor(passport);

mongoose
  .connect("mongodb://localhost:27017/pilot", { useNewUrlParser: true })
  .then(res => {
    console.log("connected");
  })
  .catch(err => {
    console.log(err);
  });

// app.use(cors)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", profile);
app.use("/api/profile", profile1);
app.use("/api/post", post);
const PORT = process.env.PORT || 4000;

// app.use(function(err, req, res, next) {
//     console.error(err.stack)
// })
app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
  console.log("testing");
});

// mongodb://localhost:27017/myapp\
//checkin
