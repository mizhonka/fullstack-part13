const { DataTypes } = require('sequelize')

module.exports = {
    up: async ({ context: queryInterface }) => {
        await queryInterface.createTable('sessions', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: { model: 'users', key: 'id' },
            },
            token: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            valid: {
                type: DataTypes.BOOLEAN,
                defaultValue: true,
            },
        })
        await queryInterface.addColumn('sessions', 'created_at', {
            type: DataTypes.DATE,
            allowNull: false,
        })
        await queryInterface.addColumn('sessions', 'updated_at', {
            type: DataTypes.DATE,
            allowNull: false,
        })
    },
}
