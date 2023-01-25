const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { taskRouter } = require('./routes/taskRoutes');


const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

app.use('/tasks',taskRouter);

app.listen(PORT, ()=>{
  console.log(`Server is running at port: ${PORT}`);
});