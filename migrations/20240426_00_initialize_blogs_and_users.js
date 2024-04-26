const { DataTypes } = require('sequelize')

module.exports = {
    up: async ({ context: queryInterface }) => {
        await queryInterface.createTable('blogs', {
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
        })
        await queryInterface.createTable('users', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            username: {
                type: DataTypes.TEXT,
                allowNull: false,
                validate: {
                    isEmail: true,
                },
            },
            name: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
        })
        await queryInterface.addColumn('blogs', 'user_id', {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: 'users', key: 'id' },
        })
        await queryInterface.addColumn('blogs', 'created_at', {
            type: DataTypes.DATE,
            allowNull: false,
        })
        await queryInterface.addColumn('blogs', 'updated_at', {
            type: DataTypes.DATE,
            allowNull: false,
        })
        await queryInterface.addColumn('users', 'created_at', {
            type: DataTypes.DATE,
            allowNull: false,
        })
        await queryInterface.addColumn('users', 'updated_at', {
            type: DataTypes.DATE,
            allowNull: false,
        })
    },
    down: async ({ context: queryInterface }) => {
        await queryInterface.dropTable('blogs')
        await queryInterface.dropTable('users')
    },
}
