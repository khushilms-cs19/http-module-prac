const { getAllTasks, getTask, postTask, editTask, completeTask, deleteCompletedTasks, deleteTask } = require('../controllers/taskController');

const Router = require('express').Router;

const router = Router();

router.get('/', getAllTasks);

router.get('/:id', getTask);

router.post('', postTask);

router.put('/:id',editTask);

router.patch('/:id', completeTask);

router.delete('/',deleteCompletedTasks);

router.delete('/:id', deleteTask);

module.exports = {
  taskRouter: router,
};
