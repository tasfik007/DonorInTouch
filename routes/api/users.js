// << Connect to MongoDB through mongoose >>
const express = require('express');
const router = express.Router();

/* 
@route      |       GET api/users
@desc       |       test route
@access     |       public
*/
router.get('/', (req, res) => res.send('User route'));

// exporting the route to server.js file
module.exports = router;