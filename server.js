const express = require('express');
const bodyParser = require('body-parser');
const mainRoute = require('./routes/mainRoute');
const balanceRoute = require('./routes/balanceRoute');


const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api', mainRoute);
app.use('/api', balanceRoute);
// Starting the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});