const router = require('express').Router();
const {Post} = require('../models/Post');

// CREATE POST
router.post('/', async (req, res) => {
        const newPost = new Post(req.body);
    try{
        const savedPost = await newPost.save();
        res.status(200).send(savedPost);
    }catch(err){
        res.status(500).send('Something is Wrong')
    }
})

// UPDATE POST
router.put('/:id', async (req, res) => {
    const id = req.params.id;
    try{
        const post = await Post.findById(id);
        if(post.username === req.body.username){
            try{
                const updatedPost = await Post.findByIdAndUpdate(id, {$set: req.body}, {new: true})
                res.status(200).send({
                    message: 'Post is updated successfully',
                    data: updatedPost
                })
            }catch(err){
                res.status(500).send('You can update only your post')
            }
        }else{
            res.status(5000).send('User is not Correct!')
        }

    }catch(err){
        res.status(500).send('Something is wrong here!')
    }
})

// DELETE POST
router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    try{
        const post = await Post.findById(id);
        if(post.username === req.body.username){
            try{
                const deletePost = await Post.findByIdAndDelete(id);
                res.status(200).send('Post is deleted successfully')
            }catch(err){
                res.status(500).send('You can delete only your post')
            }
        }else{
            res.status(5000).send('Something is wrong here!')
        }

    }catch(err){
        res.status(500).send('User is not Correct!')
    }
})

// GET POST
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    try{
        const post = await Post.findById(id);
        res.status(200).send(post);
    }catch(err){
        res.status(500).send('Something is wrong here!')
    }
})

// GET ALL POST
router.get('/', async (req, res) => {
    const username = req.query.user;
    const catName = req.query.cat;
    try{
        let posts;
        if(username){
            posts = await Post.find({username:username})
        }else if(catName){
            posts = await Post.find({categories: {
                $in: [catName]
            }})
        }else{
            posts = await Post.find()
        }
        res.status(200).send(posts);
    }catch(err){
        res.status(500).send('Something is wrong!')
    }
})

module.exports = router;