const taskServices = require('../services/taskServices');
const { HTTPError } = require('../utils/errors');



// get all the tasks 
/** 
 * @param {Request} req
 * @param {Response} res
*/
const getAllTasks = async (req, res) => {
  try {
    const allTasks = await taskServices.getAllTasks();
    res.status(200).json(allTasks);
  } catch (err) {
    res.status(500).json({
      error: 'Something went wrong.',
    });
  }
};

//get a single task based on id
/** 
 * @param {Request} req
 * @param {Response} res
*/
const getTask = async (req, res) => {
  try {
    const task = await taskServices.getTask(Number(req.params.id));
    if (!task) {
      throw new HTTPError('Task not found', 404);
    }
    res.status(200).json(task);
  } catch (err) {
    if (err instanceof HTTPError) {
      res.status(err.code).json({ message: err.message });
    }
    else {
      console.log(err);
      res.status(500).json({ error: 'Something went wrong' });
    }
  }
};

//post a task
/** 
 * @param {Request} req
 * @param {Response} res
*/
const postTask = async (req, res) => {
  try {
    const task = await taskServices.postTask(req.body);
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};

// edit single task based on id
/** 
 * @param {Request} req
 * @param {Response} res
*/
const editTask = async (req, res) => {
  try {
    const taskId = Number(req.params.id);
    const task = await taskServices.editTask(taskId, req.body);
    if (!task) {
      throw new HTTPError('Task not found', 404);
    }
    res.status(200).json(task);
  } catch (err) {
    if (err instanceof HTTPError) {
      res.status(err.code).json({ error: err.message });
    } else {
      res.status(500).json({ error: 'Something went wrong' });
    }
  }
};

// set the given task to completed
/** 
 * @param {Request} req
 * @param {Response} res
*/
const completeTask = async (req, res) => {
  try {
    const taskId = Number(req.params.id);
    const task = await taskServices.completeTask(taskId);
    if (!task) {
      throw new HTTPError('Task not found', 404);
    }
    res.status(200).json(task);
  } catch (err) {
    if (err instanceof HTTPError) {
      res.status(err.code).json({ error: err.message });
    } else {
      res.status(500).json({ error: 'Something went wrong' });
    }
  }
};

// delete all the tasks set to completed
/** 
 * @param {Request} req
 * @param {Response} res
*/
const deleteCompletedTasks = async (req, res) => {
  try {
    await taskServices.deleteCompletedTasks();
    res.status(200).json({ message: 'All completed tasks deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};

// delete a single task based on id
/** 
 * @param {Request} req
 * @param {Response} res
*/
const deleteTask = async (req, res) => {
  try {
    const taskId = Number(req.params.id);
    const task = await taskServices.deleteTask(taskId);
    console.log(task);
    if (!task) {
      throw new HTTPError('Task not found', 404);
    }
    res.status(200).json({ message: 'Task deleted' });
  } catch (err) {
    if (err instanceof HTTPError) {
      res.status(err.code).json({ error: err.message });
    } else {
      res.status(500).json({ error: 'Something went wrong' });
    }
  }
};

module.exports = {
  getAllTasks,
  getTask,
  postTask,
  completeTask,
  deleteCompletedTasks,
  editTask,
  deleteTask,
};