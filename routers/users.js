const router = require('express').Router();
const {User} = require('../models/User');
const {Post} = require('../models/Post');
const bcrypt = require('bcrypt');

router.put('/:id', async (req, res) => {
    const id = req.params.id;
    if(req.body.userId === id){
        if(req.body.password){
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
        }
        try{
            const updatedUser = await User.findByIdAndUpdate(id, {
                $set: req.body
            }, {new: true})
            res.status(200).send({
                message: "Successfully Updated!",
                data: updatedUser
            });
        }catch(err){
            res.status(500).send('Something is wrong!')
        }
    }else{
        res.status(401).send('You can update only your account')
    }
})

// DELETE
router.delete('/:id', async(req, res) => {
    const id = req.params.id;
    if(req.body.userId === id){
        
       try{
        const user = await User.findById(id);
            try{
                await Post.deleteMany({username: req.body.username});
                await User.findByIdAndDelete(id);
                res.status(200).send('User is deleted successfully!')
            }catch(err){
                res.status(500).send('Something is wrong')
            }
       }catch(err){
           res.status(404).send('User not found!')
       }
    }else{
        res.status(401).send('You can delete only your account!')
    }

})

// GET SINGLE USER

router.get('/:id', async (req, res) => {
    const userId = req.params.id;
    try{        
        const user = await User.findById(userId);
        const {password, ...others} = user._doc;
        res.status(200).send(others);
    }catch(err){
        res.status(400).send('User is not found!')
    }
})

module.exports = router;