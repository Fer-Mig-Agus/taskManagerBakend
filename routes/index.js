const { Router } = require("express");
const { body, param, query } = require('express-validator');

const routes = Router();

const createTask = require('../controllers/createTask.controller');
const allTasks = require('../controllers/allTasks.controller');
const updateTask = require('../controllers/updateTask.controller');
const deleteTask = require('../controllers/deleteTask.controller');
const detailById = require('../controllers/detailById.controller');

// CREATE NEW TASK
routes.post("/tasks", [
    body('title', 'Enter a valid title')
        .exists()
        .isLength({ min: 5 }),
    body('description', 'Enter a valid description')
        .optional()
        .isLength({ min: 10 })
], createTask)


// GET ALL TASKS AND FILTER THEY
routes.get("/tasks", [
    query('status', 'The status is not valid') 
        .optional() 
        .isIn(['completed', 'pending']).withMessage('The status must be “completed” or “pending”'),
], allTasks)


// GET TASK DETAILS ESPECIFIC
routes.get("/tasks/:id", [
    param('id', 'ID is invalid') 
        .exists().withMessage('ID is required') 
        .isMongoId().withMessage('The ID must be a valid ObjectId') 
], detailById)

// UPDATE A TASK
routes.put("/tasks/:id", [
    param('id', 'ID is invalid') 
        .exists().withMessage('ID is required') 
        .isMongoId().withMessage('The ID must be a valid ObjectId'), 
    body('title', 'Enter a valid title')
        .optional()
        .isLength({ min: 5 }),
    body('description', 'Enter a valid description')
        .optional()
        .isLength({ min: 10 }),
    body('completed', 'The completed field must be a boolean')
        .optional()
        .isBoolean(),
], updateTask)

// DELETE A TASK
routes.delete("/tasks/:id", [
    param('id', 'ID is invalid') 
        .exists().withMessage('ID is required')
        .isMongoId().withMessage('The ID must be a valid ObjectId'),
], deleteTask)

module.exports = routes;