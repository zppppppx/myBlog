const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    author: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    keyword: [{
        type: String,
        default: ''
    }],
    description: {
        type: String,
        default: ''
    },
    content: {
        type: String,
        required: true,
    },
    // The number of the characters of the article.
    number_charac: {
        type: String,
        default: 0,
    },
    // The image of the cover page
    image_cover: {
        type: String,
        default: "https://res.cloudinary.com/dhwbsgmjw/image/upload/v1672855243/YelpCamp/dxgw7500cakfa4qs9f2c.jpg"
    },
    //The type of the article, 1 for reguler article, 2 for Technical article ...
    type: {
        type: Number,
        default: 1,
    },
    // The state of the article. 0 for draft and 1 for posted.
    state: {
        type: Number,
        default: 1,
    },
    // Whether the file state is orginal or transfered from others
    origin: {
        type: Number,
        default: 0
    },
    tags: [{
        type: Schema.Types.ObjectId,
        ref: 'Tag',
    }],
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment',
    }],
    Category: [{
        type: Schema.Types.ObjectId,
        ref: 'Category',
    }],
    like_users: [
        {
            id: { type: Schema.Types.ObjectId },
            ref: 'User'
        },
    ],
    meta: {
        views: { type: Number, default: 0 },
        likes: { type: Number, default: 0 },
        comments: { type: Number, default: 0 },
    }
})

mongoose.exports = new mongoose.model('Article', ArticleSchema);