// Connect to MongoDB through mongoose
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

/* 
@route      |       GET api/auth
@desc       |       get auth user route
@access     |       public
*/
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);

    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');

    }
});


/* 
@route      |       POST api/auth
@desc       |       Authenticate User & Get JWT
@access     |       Public
*/
router.post('/', [
    check('email', 'Please include a valid email')
        .isEmail(),
    check('password', 'Password is required!').exists()
],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        try {
            //see if user exists
            let user = await User.findOne({ email });

            if (!user) {
                return res.status(400).json({ errors: [{ msg: 'Invalid Credentials!' }] });
            }
            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(400).json({ errors: [{ msg: 'Invalid Credentials!' }] });
            }


            //return jsonwebtoken
            const payload = {
                user: {
                    id: user.id
                }
            };
            jwt.sign(payload,
                config.get('jwtSecret'),
                { expiresIn: 360000 },
                (err, token) => {
                    if (err) throw err;
                    res.json({ token });
                }
            );
            //res.send('User registered!!');

        } catch (err) {
            console.log(err.message);
            res.status(500).send('Server error!');

        }

    });

// exporting the route to server.js file
module.exports = router;