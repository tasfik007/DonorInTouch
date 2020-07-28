// << Importing Packages >>
const express = require('express');
const connectDB = require('./config/db');
const app = express();

// << Defining User allocated port >>
const PORT = process.env.PORT || 5000;

// << Connect to MongoDB Database >>
connectDB();

app.get('/', (req, res) => res.send('API is running!!'));

//Importing routes form route/api/ location
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));