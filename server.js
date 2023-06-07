const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const companyRoutes = require('./routes/companyRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(cors());
const port = 3000;

app.use(bodyParser.json());

app.use('/companies', companyRoutes);
app.use('/user', userRoutes);

app.listen(process.env.port || port, () => {
  console.log(`Server listening on port ${port}`);
});