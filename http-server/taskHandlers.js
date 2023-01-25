let groceriesList = [
  {
    id: 1,
    title: 'Buy Apples',
    isCompleted: false,
  },
  {
    id: 2,
    title: 'Buy Corn Flakes',
    isCompleted: false,
  }
];

const badRequestHandler = (request, response)=>{
  response.writeHead(400, {'Content-Type': 'application/json'});
  const errorMessage = {
    message: 'Some Parameter is missing',
  };
  response.write(JSON.stringify(errorMessage));
  response.end();
};

const getAllTasks = (request, response)=>{
  response.writeHead(200,{'Content-Type': 'application/json'});
  response.write(JSON.stringify(groceriesList));
  response.end();
};

const getOneTask = (request, response, taskId) =>{
  const task = groceriesList.find((task)=>{
    return task.id === Number(taskId);
  });
  if(task){
    response.writeHead(200,{'Content-Type': 'application/json'});
    response.write(JSON.stringify(task));
    response.end();
  }else{
    response.writeHead(404, {'Content-Type': 'application/json'});
    response.end();
  }
};

const postTask = (request, response)=>{
  let data = '';
  request.on('data', (chunk)=>{
    data += chunk.toString();
  });

  request.on('end', ()=>{
    const todoItem = JSON.parse(data);
    const newTodoItem = {
      id: groceriesList.length +1,
      title: todoItem.title,
      isCompleted: false,
    };
    groceriesList.push(newTodoItem);
    response.writeHead(201,{'Content-Type': 'application/json'});
    response.write(JSON.stringify(newTodoItem));
    response.end();
  });
};

const deleteTask = (request,response,taskId) =>{
  let deletedTask = {};
  groceriesList = groceriesList.filter((task)=>{
    if(task.id === Number(taskId)){
      deletedTask = task;
      return false;
    }
    return true;
  });
  response.writeHead(200,{'Content-Type': 'application/json'});
  response.write(JSON.stringify(deletedTask));
  response.end();
};

const completeTask = (request, response,taskId)=>{
  response.writeHead(200,{'Content-Type': 'application/json'});
  let newTodoItem= {};
  groceriesList = groceriesList.map((item)=>{
    if(item.id === Number(taskId)){
      newTodoItem = {
        ...item,
        isCompleted: true,
      };
      return newTodoItem;
    }
    return item;
  });
  response.write(JSON.stringify(newTodoItem));
  response.end();
};

const editTask = (request, response, taskId)=>{
  let data = '';
  console.log(taskId);
  request.on('data', (chunk)=>{
    data+=chunk.toString();
  }).on('end', ()=>{
    if(data){

      const todoItem = JSON.parse(data);
      console.log('\tBODY:',todoItem);
      let newTodoItem = {};
      groceriesList = groceriesList.map((item)=>{
        if(item.id === Number(taskId)){
          newTodoItem = {
            ...item,
            ...todoItem,
          };
          return newTodoItem;
        }
        return item;
      });
      response.writeHead(200,{'Content-Type': 'application/json'});
      response.write(JSON.stringify(newTodoItem));
      response.end();
    }else{
      return badRequestHandler(request, response);
    }
  });
};

module.exports = {
  getAllTasks,
  getOneTask,
  postTask,
  deleteTask,
  completeTask,
  editTask,
};