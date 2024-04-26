const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../util/db')

class Blog extends Model {}
Blog.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        author: {
            type: DataTypes.TEXT,
        },
        url: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        title: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        likes: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        year: {
            type: DataTypes.INTEGER,
            validate: {
                isInt: true,
                isNew(value) {
                    if (parseInt(value) < 1991) {
                        throw new Error('Year must be 1991 or later')
                    }
                },
                isPresent(value) {
                    const currentYear = new Date().getFullYear()
                    if (parseInt(value) > currentYear) {
                        throw new Error(
                            'Year cannot be greater than the current year',
                        )
                    }
                },
            },
        },
    },
    {
        sequelize,
        underscored: true,
        timestamps: true,
        modelName: 'blog',
    },
)

module.exports = Blog
