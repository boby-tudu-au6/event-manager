const mongoose = require("mongoose");
require('dotenv').config()
mongoose
  .connect(
    process.env.MONGODB_URI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    }
  )
  .then(() => console.log("Database connected successfully"))
  .catch(err => console.log(err.message));
