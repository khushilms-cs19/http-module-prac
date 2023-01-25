let tasksList = [
  {
    id: 1, 
    title: 'Buy apples',
    isCompleted: false,
  },
  {
    id: 2,
    title: 'Laundry',
    isCompleted: false,
  }
];

const getAllTasks = (req,res) =>{
  res.status(200).send(tasksList);
};

const getTask = (req,res)=>{
  const task = tasksList.find((item)=>item.id === Number(req.params.id));
  if(!task){
    return res.status(404).send({error: 'Task not found'});
  }
  return res.status(200).send(task);
};


const postTask = (req,res)=>{
  const task = {
    id: tasksList.length +1,
    title: req.body.title,
    isCompleted: false,
  };
  tasksList.push(task);
  return res.status(201).send(task);
};

const editTask = (req,res)=>{
  const taskId = Number(req.params.id);
  const task = tasksList.find((item)=>item.id === taskId);
  if(!task){
    return res.status(404).send({error: 'Task not found'});
  }
  task.title = req.body.title;
  tasksList = tasksList.map((item)=>{
    if(item.id ===taskId){
      return task;
    }
    return item;
  });
  return res.status(200).send(task);
};


const completeTask = (req,res)=>{
  const taskId = Number(req.params.id);
  const task = tasksList.find((item)=>item.id === taskId);
  if(!task){
    return res.status(404).send({error: 'Task not found'});
  }
  task.isCompleted = true;
  tasksList = tasksList.map((item)=>{
    if(item.id === taskId){
      return task;
    }
    return item;
  });
  return res.status(200).send(task);
};

const deleteCompletedTasks = (req,res)=>{
  tasksList = tasksList.filter((task)=>!task.isCompleted);
  return res.status(200).send(tasksList);
};

const deleteTask = (req,res)=>{
  const taskId = Number(req.params.id);
  const task = tasksList.find((item)=>item.id === taskId);
  if(!task){
    return res.status(404).send({error: 'Task not found'});
  }
  tasksList = tasksList.filter((item)=>item.id!==taskId);
  return res.status(200).send(task);
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