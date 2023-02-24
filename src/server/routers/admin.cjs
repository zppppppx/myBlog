const express = require('express');
const router = express.Router();
const passport = require('passport');

const admin = {
    article: require('../controllers/admin.article.cjs'),
    user: require('../controllers/admin.user.cjs')
}

router.route('/writeArticle')
    .get(admin.article.renderArticleForm)
    .post(admin.article.createArticle)

router.route('/register')
    .post(admin.user.register)

router.route('/login')
    .get((req, res) => res.send('login'))
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/admin/login', keepSessionInfo: true }), admin.user.login)


module.exports = router;