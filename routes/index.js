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
    body('title', 'Ingrese un título válido')
        .exists()
        .isLength({ min: 5 }),
    body('description', 'Ingrese una descripción válida')
        .optional()
        .isLength({ min: 10 })
], createTask)


// GET ALL TASKS AND FILTER THEY
routes.get("/tasks", [
    query('status', 'El estado no es válido') // Mensaje de error
        .optional() // El parámetro es opcional
        .isIn(['completed', 'pending']).withMessage('El estado debe ser "completed" o "pending"'),
], allTasks)


// GET TASK DETAILS ESPECIFIC
routes.get("/tasks/:id", [
    param('id', 'El ID no es válido') // Mensaje de error
        .exists().withMessage('El ID es obligatorio') // Validación de existencia
        .isMongoId().withMessage('El ID debe ser un ObjectId válido') // Validación de formato
], detailById)

// UPDATE A TASK
routes.put("/tasks/:id", [
    param('id', 'El ID no es válido') // Mensaje de error
        .exists().withMessage('El ID es obligatorio') // Validación de existencia
        .isMongoId().withMessage('El ID debe ser un ObjectId válido'), // Validación de formato
    body('title', 'Ingrese un título válido')
        .optional()
        .isLength({ min: 5 }),
    body('description', 'Ingrese una descripción válida')
        .optional()
        .isLength({ min: 10 }),
    body('completed', 'El campo completed debe ser un booleano')
        .optional()
        .isBoolean(),
], updateTask)

// DELETE A TASK
routes.delete("/tasks/:id", [
    param('id', 'El ID no es válido') // Mensaje de error
        .exists().withMessage('El ID es obligatorio') // Validación de existencia
        .isMongoId().withMessage('El ID debe ser un ObjectId válido'),
], deleteTask)

module.exports = routes;