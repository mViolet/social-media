const express = require('express')
const router = express.Router()
const upload = require('../middleware/multer')
const feedController = require('../controllers/feed')
const authController = require('../controllers/auth')
const { ensureAuth, ensureGuest } = require('../middleware/auth')

router.get('/', ensureAuth, feedController.getFeed)
// router.get('/', feedController.getFeed) // see feed without auth

//some routes for future use
router.get('/newPost', feedController.getMakePost)
router.post('/makePost', upload.single('file'), feedController.makePost)
router.delete('/deletePost', feedController.deletePost)
router.post('/logout', authController.logout)

module.exports = router