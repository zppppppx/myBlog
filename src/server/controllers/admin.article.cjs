module.exports.renderArticleForm = (req, res, next) => {
    res.send('User');
}

module.exports.createArticle = async (req, res, next) => {
    console.log(req.body);
}