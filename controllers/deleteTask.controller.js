const Task = require('../model/task.model'); // Asegúrate de que el modelo esté bien importado
const { validationResult } = require('express-validator');


const allTasks = async (req, res) => {
    try {
        
        // Validar errores
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {id} =req.params;

        const task = await Task.findByIdAndDelete(id)
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.send('Eliminado');
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener las tareas' });
    }
};

module.exports = allTasks ;
