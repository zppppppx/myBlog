const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    category: {
        type: String,
        required: true,
        unique: true,
    },
})

module.exports = new mongoose.model('Category', CategorySchema);