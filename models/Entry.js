const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../util/db')

class Entry extends Model {}
Entry.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
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
        modelName: 'entry',
    },
)

module.exports = Entry
