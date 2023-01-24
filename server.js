/* eslint-disable no-case-declarations */
const http = require('http');
const PORT = 3000;

let groceriesList = [
  {
    id: 1,
    title: 'Buy Apples',
  },
  {
    id: 2,
    title: 'Buy Corn Flakes',
  }
];


const server = http.createServer((request, response) => {
  // response.setHeader('Content-Type', 'application/json');
  switch (request.url) {
  case '/tasks':
    switch(request.method){
    case 'GET': {
      response.write(JSON.stringify(groceriesList));
      response.end();
      break;
    }
    case 'POST':{
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
      break;
    }
    case 'DELETE':{
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
      break;
    }
    case 'PUT':{
      let data = '';
      request.on('data', (chunk)=>{
        data+=chunk.toString();
      }).on('end', ()=>{
        const todoItem = JSON.parse(data);
        console.log('\tBODY:',todoItem);
        groceriesList = groceriesList.map((item)=>{
          if(item.id === todoItem.id){
            return {
              id: item.id,
              title: todoItem.title,
            };
          }
          return item;
        });
        response.write(JSON.stringify(todoItem));
        response.end();
      });
      break;
    }
    default:
      response.write('<h1>Hello World</h1>');
      response.end();
      break;
    }
  }});

server.listen(PORT, () => {
  console.log(`The server is running at port: ${PORT}`);
});