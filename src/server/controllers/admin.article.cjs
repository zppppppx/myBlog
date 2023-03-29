const Article = require('../model/article.cjs')
const Tag = require('../model/tag.cjs')
const Category = require('../model/category.cjs')
const path = require('path')

module.exports.renderArticleForm = (req, res, next) => {
    res.send('User');
}

module.exports.createArticle = async (req, res, next) => {
    // console.log(req.body.article);
    try {
        let { tags, categories, ...article_info } = req.body.article
        console.log(tags, categories)
        // console.log(article_info)
        const article = new Article(req.body.article)
        const tagIds = await makeTags(tags)
        const categoryIds = await makeCategories(categories)
        article.tags = tagIds
        article.categories = categoryIds
        console.log(article)
        await article.save()
        res.send({ _id: article._id.toString() })
    }
    catch (e) {
        res.writeHead(400, "VALIDATION", { "Error-Code": "VALIDATION" })
        // res.write("VAILIDATION")
        res.send()
    }
}

module.exports.editArticle = async (req, res, next) => {
    try {
        let { tags, categories, ...article_info } = req.body.article
        // console.log(req.body.article)
        // console.log(tags, categories)
        const tagIds = await makeTags(tags)
        const categoryIds = await makeCategories(categories)
        const article = await Article.findByIdAndUpdate(req.body._id, { ...article_info })
        article.tags = tagIds
        article.categories = categoryIds
        await article.save()

        res.send({ _id: article._id.toString() })
    }
    catch(e) {
        res.writeHead(400, "VALIDATION", { "Error-Code": "VALIDATION" })
        res.send()
    }
}

module.exports.uploadImage = async (req, res, next) => {
    // console.log(req.body, req.files, req.params, req.query)
    // res.send('finished')
    filenames = req.files.map(item => item.filename)
    res.send(filenames)
}


module.exports.getArticle = async (req, res, next) => {
    const { id } = req.query
    let article = await Article.findOne({id: id}).populate({
        path: 'tags',
        select: 'tag'
    }).populate({
        path: 'categories',
        select: 'category'
    })
    
    // const tags = [...article.tags.map(item => item.tag)]
    // const categories= [...article.categories.map(item => item.category)]
    // console.log(tags, categories)
    // article.tags = tags
    // article.categories = categories

    console.log(article)
    res.send(article)
}

module.exports.getInfo = async (req, res, next) => {
    data = {}
    data.id = null
    data.tags = []
    data.categories = []


    const article = await Article.findOne({}, null, {
        sort: {
            id: -1
        },
        
    })

    data.id = article ? article.id+1 : 1

    const tags = await Tag.find({})
    if(tags) {
        data.tags = [...tags.map(item => item.tag)]
    }

    const categories = await Category.find({})
    if(categories) {
        data.categories = [...categories.map(item => item.category)]
    }

    res.send(data)
}

module.exports.fetchImage = async (req, res, next) => {
    // console.log(req.params)
    const {filename} = req.params
    const { id } = req.query
    filepath = path.join(__dirname, `../uploadFiles/articleImages/${id}/${filename}`)
    res.sendFile(filepath)
}

const makeTags = async (tags) => {
    let tagIds = []

    for (let eachTag of tags) {
        let tag = await Tag.findOne({ tag: eachTag })
        if (!tag) {
            tag = new Tag({ tag: eachTag })
            await tag.save()
        }
        tagIds.push(tag._id)
    }

    return tagIds
}

const makeCategories = async (categories) => {
    let categoryIds = []

    for (let eachCategory of categories) {
        let category = await Category.findOne({ category: eachCategory })
        if (!category) {
            category = new Category({ category: eachCategory })
            await category.save()
        }
        categoryIds.push(category._id)
    }

    return categoryIds
}

