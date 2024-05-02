const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../util/db')

class ReadingListEntry extends Model {}
ReadingListEntry.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        blogId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: 'blogs', key: 'id' },
        },
        readingListId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: 'readingList', key: 'id' },
        },
        read: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    },
    {
        sequelize,
        underscored: true,
        timestamps: false,
        modelName: 'readingListEntry',
    },
)

module.exports = ReadingListEntry
