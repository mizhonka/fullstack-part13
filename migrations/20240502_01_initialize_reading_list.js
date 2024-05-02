const { DataTypes } = require('sequelize')

module.exports = {
    up: async ({ context: queryInterface }) => {
        await queryInterface.createTable('entries', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            read: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
        })
        await queryInterface.addColumn('entries', 'user_id', {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: 'users', key: 'id' },
        })
        await queryInterface.addColumn('entries', 'blog_id', {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: 'blogs', key: 'id' },
        })
    },
    down: async ({ context: queryInterface }) => {
        await queryInterface.dropTable('entries')
    },
}
