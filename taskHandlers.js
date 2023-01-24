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

const getAllTasks = (request, response)=>{
  response.write(JSON.stringify(groceriesList));
  response.end();
};

const postTask = (request, response)=>{
  let data = '';
  request.on('data', (chunk)=>{
    // console.log('here', chunk.toString());
    data += chunk.toString();
  });

  request.on('end', ()=>{
    console.log('json',data);
    const todoItem = JSON.parse(data);
    console.log('obj', todoItem);
    const newTodoItem = {
      id: groceriesList.length +1,
      title: todoItem.title,
    };
    groceriesList.push(newTodoItem);
    response.write(JSON.stringify(newTodoItem));
    response.end();
  });
};

const deleteTask = (request,response) =>{
  let data = '';
  request.on('data', (chunk)=>{
    data+=chunk.toString();
  });
  request.on('end', ()=>{
    const todoItem = JSON.parse(data);
    groceriesList = groceriesList.filter((item)=>item.id !== todoItem.id);
    response.write(todoItem);
    response.end();
  });
};

const completeTask = (request, response)=>{
  const taskId = request.url.split('/')[1];
  console.log(taskId);
  response.write('success');
};

const editTask = (request, response)=>{
  let data = '';
  request.on('data', (chunk)=>{
    data+=chunk.toString();
  }).on('end', ()=>{
    const todoItem = JSON.parse(data);
    console.log('\tBODY:',todoItem);
    groceriesList = groceriesList.map((item)=>{
      if(item.id === todoItem.id){
        return {
          ...item,
          title: todoItem.title,
        };
      }
      return item;
    });
    response.write(JSON.stringify(todoItem));
    response.end();
  });
};

module.exports = {
  getAllTasks,
  postTask,
  deleteTask,
  completeTask,
  editTask,
};