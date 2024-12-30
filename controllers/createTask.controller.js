const { validationResult } = require('express-validator');
const Task = require('../model/task.model');

const createTask = async (req, res) => {
    
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const uniqueErrors = Array.from(new Set(errors.array().map(JSON.stringify))).map(JSON.parse);
            return res.status(400).json({ errors: uniqueErrors });
        }

        const { title, description } = req.body;
        
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
