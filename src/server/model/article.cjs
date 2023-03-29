const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose)
const Schema = mongoose.Schema;
const User = require('./user.cjs')


const ArticleSchema = new Schema({
    id: {
        type: Number,
    },
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
        type: Schema.Types.ObjectId,
        required: false,
        ref: 'User'
    },
    description: {
        type: String,
        default: ''
    },
    
    markdown: {
        type: String,
        required: true,
        default: ''
    },
    html: {
        type: String,
        required: false,
        default: ''
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
    images: [{
        url: String,
        filename: String
    }],

    // The state of the article. 0 for draft and 1 for posted.
    state: {
        type: Number,
        default: 1,
    },

    tags: [{
        type: Schema.Types.ObjectId,
        ref: 'Tag',
        select: 'tag',
    }],
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment',
    }],
    categories: [{
        type: Schema.Types.ObjectId,
        ref: 'Category',
        select: 'category',
    }],
    like_users: [
        {
            id: {
                type: Schema.Types.ObjectId,
                ref: 'User'
            },

        },
    ],
    meta: {
        views: { type: Number, default: 0 },
        likes: { type: Number, default: 0 },
        comments: { type: Number, default: 0 },
    }
})


module.exports = new mongoose.model('Article', ArticleSchema);