const express = require("express");
const passport = require("passport");

const passportJWT = require("passport-jwt");
const jwtSecret = "secret-key";

const register = require("../controllers/register");
const login = require("../controllers/login");
const addTask = require("../controllers/addTask");
const deleteTask = require("../controllers/deleteTask");
const markAsDone = require("../controllers/marksAsDone");
const editTask = require("../controllers/editTask");
const getUncompletedTasks = require("../controllers/getUncompletedTasks");
const getCompletedTasks = require("../controllers/getCompletedTasks");

const { User, Task } = require("../models/user");

const router = express.Router();
const jwtExtractor = passportJWT.ExtractJwt;

const jwtOptions = {
  jwtFromRequest: jwtExtractor.fromAuthHeaderAsBearerToken(),
  secretOrKey: jwtSecret,
};

passport.use(
  new passportJWT.Strategy(jwtOptions, async (jwtPayload, done) => {
    try {
      const user = await User.findByPk(jwtPayload.id, {
        include: {
          model: Task,
        },
      });

      if (!user) {
        return done(null, false);
      }

      console.log("User:", user.toJSON());

      return done(null, user);
    } catch (error) {
      console.log("Error:", error.message);
    }
  })
);

router.post("/register", register);

router.post("/login", login);

router.post(
  "/tasks",
  passport.authenticate("jwt", { session: false }),
  addTask
);

router.delete(
  "/tasks/:taskId",
  passport.authenticate("jwt", { session: false }),
  deleteTask
);

router.patch(
  "/tasks/:taskId/done",
  passport.authenticate("jwt", { session: false }),
  markAsDone
);

router.put(
  "/tasks/:taskId",
  passport.authenticate("jwt", { session: false }),
  editTask
);

router.get(
  "/tasks",
  passport.authenticate("jwt", { session: false }),
  getUncompletedTasks
);

router.get(
  "/tasks/completed-tasks",
  passport.authenticate("jwt", { session: false }),
  getCompletedTasks
);

module.exports = router;
