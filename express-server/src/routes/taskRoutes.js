const { getAllTasks, getTask, postTask, editTask, completeTask, deleteCompletedTasks, deleteTask } = require('../controllers/taskController');
const { bodyValidation } = require('../middlewares/taskMiddlewares');

const Router = require('express').Router;

const router = Router();

// GET /tasks
router.get('/', getAllTasks);

// GET /tasks/1
router.get('/:id', getTask);

// POST /tasks
router.post('/',bodyValidation, postTask);

// PUT /tasks/1
router.put('/:id',bodyValidation,editTask);

// PATCH /tasks/1
router.patch('/:id', completeTask);

// DELETE /tasks
router.delete('/',deleteCompletedTasks);

// DELETE /tasks/1
router.delete('/:id', deleteTask);

module.exports = {
  taskRouter: router,
};
