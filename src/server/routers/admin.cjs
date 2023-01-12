const express = require('express');
const router = express.Router();
const admin = {
    article: require('../controllers/admin.article.cjs'),
} 

router.route('/writeArticle')
    .get(admin.article.renderArticleForm)
    .post(admin.article.createArticle)

module.exports = router;