const { Router } = require("express");

const usersRouter = Router({ mergeParams: true });

const userService = require("../services/user-service");

const jwt = require("jsonwebtoken");

const { JWT_SECRET } = require("../config");
const { requireUser } = require("../middlewares/auth");

usersRouter
   .post("/", (req, res) => {
      const { username, password } = req.body;
      userService.findUserByUsername(username)
         .then((foundUser) => {
            if (foundUser) {
               res.status(400).json({ message: "Username existed" });
               return;
            }
            userService.createUser(username, password)
               .then((createdUser) => res.json(createdUser))
               .catch((error) => res.status(500).send(error));
         })
         .catch((error) => res.status(500).send(error));
   })
   .post("/authentication", (req, res) => {
      const { username, password } = req.body;
      userService.findUserByUsername(username)
         .then((foundUser) => {
            if (!foundUser) {
               res.status(400).json({ message: "Username doesn't exist" });
               return;
            }
            if (foundUser.password != password) {
               res.status(400).json({ message: "Wrong password" });
               return;
            }
            return Promise.resolve(foundUser);
         })
         .then((user) => {
            if (user) {
               const token = jwt.sign(user.toObject(), JWT_SECRET, {expiresIn: 30});
               res.send(token);
            }
         })
         .catch((error) => res.status(500).send(error));
   })
   .get("/authentication", requireUser, (req, res) => {
      res.json(req.user);
   })

module.exports = usersRouter;