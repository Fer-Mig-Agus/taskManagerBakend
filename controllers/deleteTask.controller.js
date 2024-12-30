const Task = require('../model/task.model'); 
const { validationResult } = require('express-validator');


const allTasks = async (req, res) => {
    try {
        
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {id} =req.params;

        const task = await Task.findByIdAndDelete(id)
        if (!task) {
            return res.status(404).json({ status:404,error: "Task not found" });
        }

        res.status(204);
    } catch (error) {
        res.status(500).json({ status: 500, error: error.message });
    }
};

module.exports = allTasks ;
