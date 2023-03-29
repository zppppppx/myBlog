const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TagSchema = new Schema({
    tag: {
        type: String,
        required: true,
        unique: true,
    }
})

module.exports = new mongoose.model('Tag', TagSchema);