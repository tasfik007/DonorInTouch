// Connect to MongoDB through mongoose
const express = require('express');
const router = express.Router();

/* 
@route      |       GET api/posts
@desc       |       test route
@access     |       public
*/
router.get('/', (req, res) => res.send('Posts route'));

// exporting the route to server.js file
module.exports = router;