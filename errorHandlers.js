const badRequestHandler = (request, response)=>{
  response.writeHead(400, {'Content-Type': 'application/json'});
  const errorMessage = {
    message: 'Some Parameter is missing',
  };
  response.write(JSON.stringify(errorMessage));
  response.end();
};

const notFoundHandler = (request, response)=>{
  response.writeHead(404, {'Content-Type': 'application/json'});
  const errorMessage = {
    message: 'Not Found',
  };
  response.write(JSON.stringify(errorMessage));
  response.end();
};

module.exports = {
  badRequestHandler,
  notFoundHandler,
};