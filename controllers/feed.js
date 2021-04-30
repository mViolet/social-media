// const Post = require('../models/Post')

module.exports = {
    getFeed: async (req, res) => {
        console.log(req)  //req.user?
        try {
            // const posts = await Post.find({ userId: req.user.id })
            // const itemsLeft = await Todo.countDocuments({ userId: req.user.id, completed: false })
            // res.render('feed.ejs', { todos: todoItems, left: itemsLeft, user: req.user })
            res.render('feed.ejs')
        } catch (err) {
            console.log(err)
        }
    },
    makePost: async (req, res) => {
        try {
            console.log(req)
            res.send("post made?")
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