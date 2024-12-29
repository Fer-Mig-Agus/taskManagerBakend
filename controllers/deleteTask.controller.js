
const allTask = async (req, res) => {
    const { id_user } = req.query;
    const { id_task } = req.params;
    try {

        // Busco todas las tareas del usuario
        const allTaskOfUser = await User.findByPk(id_user, {
            include: [{ model: Task }],
        });


        //Verifico si la tarea le pertenece al usuario
        const taskSearch = allTaskOfUser.tasks.filter((task) => task.id === id_task);

        if (!taskSearch || taskSearch.length == 0) return res.status(404).json({ status: 404, error: "This task does not belong to the user" })

        const task = await Task.findByPk(id_task);

        await task.destroy();

        res.status(200).json({ status: 200, message: "The task has been eliminated" });
    } catch (error) {
        res.status(500).json({ status: 500, error: error.message });
    }
};

module.exports = allTask;