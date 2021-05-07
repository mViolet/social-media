const Post = require('../models/Post')
const cloudinary = require('../middleware/cloudinary')

module.exports = {
    getFeed: async (req, res) => {
        // console.log(req)  //req.user?
        try {
            const posts = await Post.find()
            // const itemsLeft = await Todo.countDocuments({ userId: req.user.id, completed: false })
            // res.render('feed.ejs', { todos: todoItems, left: itemsLeft, user: req.user })
            res.render('feed.ejs', {posts: posts, user: req.user})
        } catch (err) {
            console.log(err)
        }
    },
    getMakePost: async (req,res) =>{
        try {
            // console.log(req)
            res.render('newPost.ejs')
        } catch (err) {
            console.log(err)
        }
    },
    makePost: async (req, res) => {
        try {
            const result = await cloudinary.uploader.upload(req.file.path)

            await Post.create({
                title: req.body.title,
                image: result.secure_url,
                cloudinaryID: result.public_id,
                description: req.body.description,
                likes: 0,
                user: req.user.id,
                userName: req.user.userName
            })
            console.log(`${req.user.userName} has added a post`)
            res.redirect('/feed')
        } catch (err) {
            console.log(err)
        }
    },
    getProfile: async (req, res) =>{
        try {
            const posts = await Post.find({user:req.user.id})
            // console.log(posts)
            res.render('profile.ejs', {posts: posts, user: req.user})
        } catch (err) {
            console.log(err)
        }
    },
    deletePost: async (req, res) => {
        try {
            const post = await Post.findById({_id: req.params.id})
            await cloudinary.uploader.destroy(post.cloudinaryID)
            await Post.deleteOne({_id: req.params.id})
            console.log(`${req.user.userName} has deleted a post`)
            res.redirect(req.get('referer'));
        } catch (err) {
            console.log(err)
        }
    }, 
    getPost: async (req, res) => {
        try {
            const post = await Post.findById({_id: req.params.id})
            res.render('post', {post: post, user: req.user})
        } catch (err) {
            console.log(err)
        }
    },
    addLike: async (req, res) => {
        try {
            await Post.findOneAndUpdate(
                {_id: req.params.id},
                {
                   $inc: {likes: 1},
                })
            console.log('likes +1')
            res.redirect('/feed')
        } catch (err) {
            console.log(err)
        }
    }
}