/* eslint-disable no-case-declarations */
const http = require('http');
const { getAllTasks, postTask, deleteTask, editTask, completeTask, getOneTask } = require('./taskHandlers');
const {badRequestHandler, notFoundHandler} = require('./errorHandlers');
const PORT = 3000;


const server = http.createServer((request, response) => {
  // response.setHeader('Content-Type', 'application/json');
  const nestedRoutes = request.url.split('/');
  switch (nestedRoutes[1]) {
  case 'tasks':
    switch(request.method){
    case 'GET': 
      if(nestedRoutes[2]){
        return getOneTask(request,response, nestedRoutes[2]);
      }
      return getAllTasks(request, response);
    case 'POST': return postTask(request,response);
    case 'DELETE': return deleteTask(request,response, nestedRoutes[2]);
    case 'PUT': 
      if(nestedRoutes[2]){
        return editTask(request,response, nestedRoutes[2]);
      }
      return badRequestHandler(request, response);
    case 'PATCH': 
      if(nestedRoutes[2]){
        return completeTask(request,response, nestedRoutes[2]);
      }
      return badRequestHandler(request, response);
    default:
      return badRequestHandler(request, response);
    }
  default: return notFoundHandler(request, response);
  }

});

server.listen(PORT, () => {
  console.log(`The server is running at port: ${PORT}`);
});