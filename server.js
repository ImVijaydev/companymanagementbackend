const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const companyRoutes = require('./routes/companyRoutes');
const userRoutes = require('./routes/userRoutes');
const hostname = '0.0.0.0';

const app = express();
app.use(cors());
const port = 3000;

app.use(bodyParser.json());

app.use('/companies', companyRoutes);
app.use('/user', userRoutes);

app.listen(port, hostname, () => {
  console.log(`Server listening at http://${hostname}:${port}/`);
});