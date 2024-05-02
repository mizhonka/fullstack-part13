const Blog = require('./Blog')
const User = require('./User')
const ReadingList = require('./ReadingList')
const ReadingListEntry = require('./ReadingListEntry')

User.hasMany(Blog)
Blog.belongsTo(User)

ReadingList.belongsTo(User)
ReadingListEntry.belongsTo(ReadingList)

module.exports = { Blog, User }
