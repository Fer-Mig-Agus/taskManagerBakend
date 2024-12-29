
const allTask = async (req, res) => {
    const { id_user } = req.query;
    try {
        // Busco todas las tareas del usuario
        const allTaskOfUser = await User.findByPk(id_user, {
            include: [{ model: Task }],
        });

        if(!allTaskOfUser.tasks || allTaskOfUser.tasks.length === 0) return res.status(404).json({status:404,error:"El usuario no posee tareas"});

        res.status(200).json({ status: 200, message: "User tasks", data: allTaskOfUser.tasks });
    } catch (error) {
        res.status(500).json({ status: 500, error: error.message });
    }
};

module.exports = allTask;