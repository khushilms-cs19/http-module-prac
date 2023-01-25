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
  response.setHeader('Content-Type', 'json');
  const route = request.url.split('?')[0];
  let todoItem ;
  let searchQuery;
  if(request.url.includes('?')){
    searchQuery = request.url.split('?')[1].split('=');
    todoItem = searchQuery[1];
  }
  console.log(`${request.method} ${route} -- ${todoItem}`);
  switch (route) {
  case '/tasks':
    switch(request.method){
    case 'GET':
      response.write(JSON.stringify(groceriesList));
      response.end();
      break;
    case 'POST':
      groceriesList.push({id:groceriesList.length+1, title: todoItem});
      response.write(JSON.stringify(groceriesList));
      response.end();
      break;
    case 'DELETE':
      groceriesList = groceriesList.filter((item)=>item.id !== Number(todoItem));
      response.write(JSON.stringify(groceriesList));
      response.end();
      break;
    case 'PUT':
      groceriesList = groceriesList.map((item)=>{
        if(item.id === todoItem){
          return {
            id: item.id,
            title: 'New change',
          };
        }
        return item;
      });
      response.write(JSON.stringify(groceriesList));
      break;
    default:
      response.write('<h1>Hello World</h1>');
      response.end();
      break;
    }
  }});

server.listen(PORT, () => {
  console.log(`The server is running at port: ${PORT}`);
});