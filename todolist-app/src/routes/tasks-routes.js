const { Router } = require("express");
const { requireUser } = require("../middlewares/auth");

const tasksRouter = Router({ mergeParams: true });

const taskService = require("../services/task-service");

tasksRouter
   .post("/", requireUser, (req, res) => {
      const { title, body } = req.body;
      const userId = req.user._id;

      taskService.createTask({ title, body, userId })
         .then((task) => res.json(task))
         .catch((error) => res.status(500).send(error));
   })
   .get("/", requireUser, (req, res) => {
      const userId = req.user._id;

      taskService.getAllTasks(userId)
         .then((tasks) => {
            if (tasks.length > 0) {
               res.json(tasks);
            }
            else
               res.send("Empty list");
         })
         .catch((error) => res.status(500).send(error));
   })
   .get("/:taskId", requireUser, (req, res) => {
      const taskId = req.params.taskId;
      const userId = req.user._id;

      taskService.getTaskById(taskId, userId)
         .then((task) => {
            if (task)
               res.json(task);
            else
               res.send("Task doesn't exist");
         })
         .catch((error) => res.status(500).send(error));
   })
   .patch("/:taskId", requireUser, (req, res) => {
      const { title, body, completed } = req.body;
      const taskId = req.params.taskId;
      const userId = req.user._id;

      taskService.getTaskById(taskId, userId)
         .then((task) => {
            if (task) {
               let completedAt = task.completedAt;
               if (completed == true && task.completed == false)
                  completedAt = new Date();
               else if (completed == false)
                  completedAt = null;
               taskService.updateTask(taskId, { title, body, completed, completedAt })
                  .then((updatedTask) => res.json(updatedTask))
                  .catch((error) => res.status(500).send(error));
            }
            else {
               res.send("Task doesn't exist");
            }
         })
         .catch((error) => res.status(500).send(error));
   })
   .delete("/:taskId", requireUser, (req, res) => {
      const taskId = req.params.taskId;
      const userId = req.user._id;
      taskService.getTaskById(taskId, userId)
         .then((task) => {
            if (task) {
               taskService.deleteTaskById(taskId)
                  .then(() => res.json(task))
                  .catch((error) => res.status(500).send(error));
            }
            else {
               res.send("Task doesn't exist");
            }
         })
         .catch((error) => res.status.send(error));
   });

module.exports = tasksRouter;