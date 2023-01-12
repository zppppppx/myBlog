const dbUrl = process.env.DB_URL || 'mongodb://127.0.0.1:27017/my-blog';
const secret = process.env.SECRET || 'thisshouldbeabettersecret'
module.exports.dbUrl = dbUrl