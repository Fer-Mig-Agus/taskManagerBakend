const { validationResult } = require('express-validator');
const Task = require('../model/task.model');

const createTask = async (req, res) => {
    


    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // Eliminar duplicados (opcional, por si hay redundancias)
            const uniqueErrors = Array.from(new Set(errors.array().map(JSON.stringify))).map(JSON.parse);
            return res.status(400).json({ errors: uniqueErrors });
        }
        
        const { id } = req.params;
        const task=await Task.findById(id);

        if (!task) {
            return res.status(404).json({status:404 ,error: 'Task not found' });
        }

        res.status(201).json({ status: 201, message: "Details of the task", data: task });
    } catch (error) {
        res.status(500).json({ status: 500, error: error.message });
    }
};

module.exports = createTask;
