const express = require("express");
const morgan = require("morgan");
const indexRouter = require("./routes/index");
const userRouter = require("./routes/user");

const app = express(); // create an instance of express
const PORT = process.env.PORT || 3000; // process.env.PORT imports the port from the environment variables

app.use(morgan("dev")); // log every request to the console
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use("/", indexRouter); // home API
app.use("/users", userRouter); // user API

app.listen(PORT, () => { // listen on port 3000 or the port specified in the environment variables
  console.log(`Server started on port ${PORT}`); 
});
