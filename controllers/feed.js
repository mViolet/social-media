const Post = require('../models/Post')
const cloudinary = require('../middleware/cloudinary')

module.exports = {
    getFeed: async (req, res) => {
        console.log(req)  //req.user?
        try {
            const posts = await Post.find()
            // const itemsLeft = await Todo.countDocuments({ userId: req.user.id, completed: false })
            // res.render('feed.ejs', { todos: todoItems, left: itemsLeft, user: req.user })
            res.render('feed.ejs', {posts: posts})
        } catch (err) {
            console.log(err)
        }
    },
    getMakePost: async (req,res) =>{
        try {
            console.log(req)
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
    deletePost: async (req, res) => {
        try {
            console.log(req)
            res.send("post deleted?")
        } catch (err) {
            console.log(err)
        }
    }
}