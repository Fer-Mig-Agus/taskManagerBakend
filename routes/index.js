const { Router } = require("express");
const { body } = require('express-validator');

const routes = Router();

const createTask=require('../controllers/createTask.controller');
const allTasks=require('../controllers/allTasks.controller');
const updateTask=require('../controllers/updateTask.controller');
const deleteTask=require('../controllers/deleteTask.controller');

// CREATE NEW TASK
routes.post("/tasks",[
    body('title', 'Ingrese un título válido')
        .exists()
        .isLength({ min: 5 }),
    body('description', 'Ingrese una descripción válida')
        .optional()
        .isLength({ min: 10 })
],  createTask)


// GET ALL TASKS AND FILTER THEY
routes.get("/tasks",allTasks )


// GET TASK DETAILS ESPECIFIC
routes.get("/tasks/:id", (req,res)=>{
    res.send('hello world')
} )

// UPDATE A TASK
routes.put("/tasks/:id", updateTask)

// DELETE A TASK
routes.delete("/tasks/:id", deleteTask )

module.exports = routes;