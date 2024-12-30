
/**  
* @swagger
* components:
*   schemas:
*     Task:
*       type: object
*       required:
*         - title
*       properties:
*         title:
*           type: string
*           description: Título de la tarea
*         description:
*           type: string
*           description: Descripción de la tarea
*         completed:
*           type: boolean
*           description: Estado de la tarea (completada o no)
*         createdAt:
*           type: string
*           format: date-time
*           description: Fecha de creación de la tarea
*/

/**
* @openapi
* /api/tasks:
*   post:
*     summary: Crear una nueva tarea
*     description: Crea una nueva tarea en el sistema.
*     tags:
*       - Task
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Task'
*     responses:
*       '200':
*         description: Tarea creada exitosamente
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Task'
*       '400':
*         description: Error de validación de los datos proporcionados
*       '500':
*         description: Error en el servidor
*/




/**
* @openapi
* /api/tasks:
*   get:
*     summary: Obtener todas las tareas
*     description: Obtiene una lista de todas las tareas en el sistema, con opción de filtrar por estado.
*     tags:
*       - Task
*     parameters:
*       - in: query
*         name: status
*         required: false
*         description: Estado de las tareas (completada o pendiente)
*         schema:
*           type: string
*           enum:
*             - completed
*             - pending
*     responses:
*       '200':
*         description: Lista de tareas obtenida exitosamente
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/Task'
*       '400':
*         description: Error en los parámetros de búsqueda
*       '500':
*         description: Error en el servidor
*/




/**
* @openapi
* /api/tasks/{id}:
*   get:
*     summary: Obtener detalles de una tarea
*     description: Obtiene los detalles de una tarea específica utilizando su ID.
*     tags:
*       - Task
*     parameters:
*       - in: path
*         name: id
*         required: true
*         description: ID de la tarea a obtener
*         schema:
*           type: string
*           format: uuid
*     responses:
*       '200':
*         description: Detalles de la tarea obtenidos exitosamente
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Task'
*       '404':
*         description: Tarea no encontrada
*       '500':
*         description: Error en el servidor
*/




/**
* @openapi
* /api/tasks/{id}:
*   put:
*     summary: Actualizar una tarea
*     description: Actualiza los datos de una tarea específica utilizando su ID.
*     tags:
*       - Task
*     parameters:
*       - in: path
*         name: id
*         required: true
*         description: ID de la tarea a actualizar
*         schema:
*           type: string
*           format: uuid
*     requestBody:
*       required: false
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Task'
*     responses:
*       '200':
*         description: Tarea actualizada exitosamente
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Task'
*       '404':
*         description: Tarea no encontrada
*       '500':
*         description: Error en el servidor
*/




/**
* @openapi
* /api/tasks/{id}:
*   delete:
*     summary: Eliminar una tarea
*     description: Elimina una tarea específica utilizando su ID.
*     tags:
*       - Task
*     parameters:
*       - in: path
*         name: id
*         required: true
*         description: ID de la tarea a eliminar
*         schema:
*           type: string
*           format: uuid
*     responses:
*       '200':
*         description: Tarea eliminada exitosamente
*       '404':
*         description: Tarea no encontrada
*       '500':
*         description: Error en el servidor
*/

