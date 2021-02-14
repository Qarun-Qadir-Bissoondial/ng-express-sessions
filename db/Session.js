module.exports = (sequelize, Sequelize) => {
    return sequelize.define('Sessions', {
        sid: {
            type: Sequelize.STRING,
            primaryKey: true,
        },
        userId: {
            type: Sequelize.UUID,
            allowNull: false,
            primaryKey: true
        },
        expires: Sequelize.DATE,
        data: Sequelize.TEXT
    }, {
        freezeTableName: true,
        timestamps: false
    });
}