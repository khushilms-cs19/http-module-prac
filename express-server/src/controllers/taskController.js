const taskServices = require('../services/taskServices');

// get all the tasks 
const getAllTasks = async(req,res) =>{
  const allTasks = await taskServices.getAllTasks();
  return res.status(200).send(allTasks);
};

//get a single task based on id
const getTask = async(req,res)=>{
  try{
    const task = await taskServices.getTask(Number(req.params.id));
    if(!task){
      return res.status(404).send({error: 'Task not found'});
    }
    return res.status(200).send(task);
  }catch(err){
    console.log(err);
    return res.status(500).send({error: 'Something went wrong'});
  }
};

//post a task
const postTask = async (req,res)=>{
  try{
    const task = await taskServices.postTask(req.body);
    return res.status(201).send(task);
  }catch(err){
    console.log(err);
    return res.status(500).send({error: 'Something went wrong'});
  }
};

// edit single task based on id
const editTask = async(req,res)=>{
  const taskId = Number(req.params.id);
  try {
    const task = await taskServices.editTask(taskId, req.body);
    if(!task){
      return res.status(404).send({error: 'Task not found'});
    }
    return res.status(200).send(task);
  }catch(err){
    console.log(err);
    return res.status(500).send({error: 'Something went wrong'});
  }
};

// set the given task to completed
const completeTask = async(req,res)=>{
  try{
    const taskId = Number(req.params.id);
    const task = await taskServices.completeTask(taskId);
    if(!task){
      return res.status(404).send({error: 'Task not found'});
    }
    return res.status(200).send(task);
  }catch(err){
    console.log(err);
    return res.status(500).send({error: 'Something went wrong'});
  }
};

// delete all the tasks set to completed
const deleteCompletedTasks = async(req,res)=>{
  try{
    await taskServices.deleteCompletedTasks();
    return res.status(200).send({message: 'All completed tasks deleted'});
  }catch(err){
    console.log(err);
    return res.status(500).send({error: 'Something went wrong'});
  }
};

// delete a single task based on id
const deleteTask = async(req,res)=>{
  try{
    const taskId = Number(req.params.id);
    await taskServices.deleteTask(taskId);
    return res.status(200).send({message: 'Task deleted'});
  }catch(err){
    console.log(err);
    return res.status(500).send({error: 'Something went wrong'});
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