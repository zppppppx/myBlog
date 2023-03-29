const express = require('express');
const router = express.Router();
const passport = require('passport');
const multer = require('multer')
const path = require('path')
const { v4: uuidv4 } = require('uuid');
const utils = require('../utils/helpers.cjs');
const fs = require('fs')

const storage = multer.diskStorage({
    destination: async (req, file, cb) => {
        // console.log(req.params, req.query, req.body)
        const { id } = req.query
        filepath = path.join(__dirname, `../uploadFiles/articleImages/${id}`)
        if(fs.existsSync(filepath)) {
            cb(null, filepath)
        } else {
            fs.mkdirSync(filepath, { recursive: true })
            cb(null, filepath)
        }
        
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = uuidv4()
        const fileExt = path.extname(file.originalname)
        const fileName = uniqueSuffix + fileExt
        cb(null, fileName)
    }
})
const upload = multer({storage: storage})

const parse =  multer({ storage: multer.memoryStorage() })

const admin = {
    article: require('../controllers/admin.article.cjs'),
    user: require('../controllers/admin.user.cjs')
}

router.route('/writeArticle')
    .get(admin.article.renderArticleForm)
    .post(admin.article.createArticle)
    .put(admin.article.editArticle)

router.route('/editArticle')
    .put(admin.article.editArticle)

router.route('/getArticle')
    .get(admin.article.getArticle)

router.route('/articleInfo')
    .get(admin.article.getInfo)

router.route('/uploadImage')
    // .post(parse.array('file'), admin.article.test)
    .post(upload.array('file'), admin.article.uploadImage)

router.route('/fetchImage/:filename')
    .get(admin.article.fetchImage)

router.route('/register')
    .post(admin.user.register)

router.route('/login')
    .get((req, res) => res.send('login'))
    .post(passport.authenticate('local', { failureFlash: true, keepSessionInfo: true }), admin.user.login)


module.exports = router;