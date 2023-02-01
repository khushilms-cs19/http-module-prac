const db = require('../../database/models');

// get all the tasks 
const getAllTasks = async () => {
  const allTasks = await db.task.findAll();
  return allTasks;
};

//get a single task based on id
const getTask = async (taskId) => {
  const task = await db.task.findOne({
    where: {
      id: taskId,
    }
  });
  return task;
};

//post a task
const postTask = async (taskData) => {
  const newTask = {
    title: taskData.title,
    isCompleted: false,
  };
  const task = db.task.create(newTask);
  return task;
};

// edit single task based on id
const editTask = async (taskId, taskData) => {
  const task = await db.task.findOne({
    where: {
      id: taskId,
    }
  });
  if (!task) {
    return null;
  }
  task.title = taskData.title;
  await task.save();
  return task;
};

// set the given task to completed
const completeTask = async (taskId) => {
  const task = await db.task.findOne({
    where: {
      id: taskId,
    }
  });
  if (!task) {
    return null;
  }
  task.isCompleted = true;
  await task.save();
  return task;
};

// delete all the tasks set to completed
const deleteCompletedTasks = async () => {
  await db.task.destroy({
    where: {
      isCompleted: true,
    }
  });
  return;
};

// delete a single task based on id
const deleteTask = async (taskId) => {
  const task = await db.task.findOne({
    where: {
      id: taskId,
    }
  });
  if(!task){
    return null;
  }
  await task.destroy();
  return task;
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