const Blog = require('./Blog')
const User = require('./User')
const Entry = require('./Entry')

User.hasMany(Blog)
Blog.belongsTo(User)

User.belongsToMany(Blog, { through: Entry, as: 'readings' })
Blog.belongsToMany(User, { through: Entry })

User.hasMany(Entry)
Entry.belongsTo(User)

Blog.hasMany(Entry)
Entry.belongsTo(Blog)

module.exports = { Blog, User, Entry }
