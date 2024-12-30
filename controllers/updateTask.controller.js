const { validationResult } = require('express-validator');
const Task = require('../model/task.model');

const updateTask = async (req, res) => {



    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const uniqueErrors = Array.from(new Set(errors.array().map(JSON.stringify))).map(JSON.parse);
            return res.status(400).json({ errors: uniqueErrors });
        }

        const { title, description, completed } = req.body;
        const { id } = req.params;

        const updateFields = {}; 
        if (title !== undefined) updateFields.title = title;
        if (description !== undefined) updateFields.description = description;
        if (completed !== undefined) updateFields.completed = completed;

        const updatedTask = await Task.findByIdAndUpdate(id, updateFields, {
            new: true, 
            runValidators: true,
        });

        if (!updatedTask) {
            return res.status(404).json({status:404, error: "Task not found" });
        }

        res.status(200).json({ message: "Task updated successfully", data: updatedTask });
    } catch (error) {
        res.status(500).json({ status: 500, error: error.message });
    }
};

module.exports = updateTask;
