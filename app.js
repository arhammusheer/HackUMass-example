const express = require("express");
const morgan = require("morgan");
const indexRouter = require("./routes/index");
const userRouter = require("./routes/user");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(morgan("dev"));
app.use("/", indexRouter);
app.use("/users", userRouter)

app.listen(PORT, () => {
  console.info(`Server started on port ${PORT}`);
});
