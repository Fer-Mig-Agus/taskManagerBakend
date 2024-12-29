
const createTask = async (req, res) => {
    const { id_user } = req.query;
    const { id_task } = req.params;
    const { task, is_completed } = req.body;

    console.log("entro a la funcino: tarea:", task);
    console.log("entro con iscompleted: ", is_completed);

    try {
        // Busco todas las tareas del usuario
        const allTaskOfUser = await User.findByPk(id_user, {
            include: [{ model: Task }],
        });

        //Verifico si la tarea le pertenece al usuario
        const taskSearch = allTaskOfUser.tasks.filter((task) => task.id === id_task);

        console.log("buscó la tarea:", taskSearch);

        if (!taskSearch || taskSearch.length == 0) return res.status(404).json({ status: 404, error: "This task does not belong to the user" })

        console.log("si tiene que cambiar el contenido de la terea, entrara")
        // Verifico que la nueva tarea no exista
        if (task && allTaskOfUser.tasks.length !== 0) {
            console.log("entro para cambiar")
            let bandera = false;
            for (let i = 0; i < allTaskOfUser.tasks.length; i++) {
                if (task.toLowerCase() === allTaskOfUser.tasks[i].task.toLowerCase()) {
                    bandera = true;
                    i = allTaskOfUser.tasks.length;
                }
            }
            if (bandera) return res.status(409).json({ status: 409, error: "The task has already been added" });
        }

        console.log("paso lo del contenido")

        // Busco la tarea a actualizar
        const taskUpdate = await Task.findByPk(id_task);

        console.log("tarea encontrada de nuevo:", taskUpdate);

        taskUpdate.update({
            task,
            is_completed
        })


        await taskUpdate.save();

        console.log("cambios guardados: ", taskUpdate);

        res.status(200).json({ status: 200, message: "The task was successfully updated", data: taskUpdate });
    } catch (error) {
        res.status(500).json({ status: 500, error: error.message });
    }
};

module.exports = createTask;