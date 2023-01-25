const express = require('express');
// const bodyParser = require('body-parser');
const cors = require('cors');

// Routers
const { taskRouter } = require('./routes/taskRoutes');

// Constants
const PORT = 3000;

// Initialize app
const app = express();

// Pre-requisites 
app.use(express.json());
app.use(cors());


// Server routes
app.use('/tasks',taskRouter);


// Server running
app.listen(PORT, ()=>{
  console.log(`Server is running at port: ${PORT}`);
});