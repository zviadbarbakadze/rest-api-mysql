const express = require("express");
const passport = require("passport");

const router = require("./routes/route");
const sequelize = require("./db");
const app = express();
const PORT = 3500;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use("/api", router);

sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to database:", error);
  });
