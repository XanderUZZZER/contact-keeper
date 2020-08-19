const express = require('express');
const connectDB = require('./config/db');
const path = require('path');

const app = express();

// Connect DB
connectDB();

//Init middleware
app.use(express.json({ extended: false }));///---- watch again!!!!

// app.get('/', (req, res) =>
//   res.json({ msg: 'Welcome to tho ContactKeeper API' })
// );

// define routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production'){
  // Set static folder
  app.use(express.static('client/build'));

  // look for index.html in currFolder (__dirname)/client/build/index.html
  app.get('*', (req, res)=>res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')));
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => { console.log(`Server started on port: ${PORT}`); });