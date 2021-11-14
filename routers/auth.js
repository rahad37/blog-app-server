const express = require('express');
const {User} = require('../models/User');
const router = express.Router();
const bcrypt = require('bcrypt');

router.post('/register', async (req, res) => {
    try{
        let newUser = await User.findOne({username: req.body.username});
        if(newUser) return res.status(500).send('User is already register!');
        
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);
        newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashPassword
        });
        const user = await newUser.save();
        return res.status(200).send(user);
    }catch(err){
        console.log("Something is Wrong")
    }
})

router.post('/login', async (req, res) => {
    try{
        const user = await User.findOne({username: req.body.username});
        !user && res.status(500).send('User is not register');

        const validated = await bcrypt.compare(req.body.password, user.password);
        !validated && res.status(200).send('Password is Incorrect!');

        res.status(200).send(user);
    }catch(err){
        return res.status(500).send('Login is failed...')
    }
})

module.exports = router;