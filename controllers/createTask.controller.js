const { validationResult } = require('express-validator');
const Task = require('../model/task.model');


const createTask = async (req, res) => {
    const { title, description } = req.body;
    try {


        // Validar errores en la solicitud
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const newTask = new Task({
            title,
            description
        });

        await newTask.save();

        res.status(201).json({ status: 201, message: "The task was successfully created", data: newTask });
    } catch (error) {
        res.status(500).json({ status: 500, error: error.message });
    }
};

module.exports = createTask;