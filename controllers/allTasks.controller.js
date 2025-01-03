const Task = require('../model/task.model'); 
const { validationResult } = require('express-validator');


const allTasks = async (req, res) => {
    try {
        
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { status } = req.query;
        let filter = {};
        if (status) {
            filter.completed = status === 'completed';
        }

        const tasks = await Task.find(filter)

        if(!tasks) return res.status(404).json({status:404,error:'There are no tasks loaded'})

        res.status(200).json({status:200,message:'Complete list',data:tasks});
    } catch (error) {
        res.status(500).json({ status: 500, error: error.message });
    }
};

module.exports = allTasks ;
