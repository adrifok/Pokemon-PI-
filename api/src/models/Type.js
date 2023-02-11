const { DataTypes, NUMBER } = require('sequelize');

module.exports = sequelize => {
    sequelize.define('types', {
        idTypes: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            unique: true,
            //an attempt to insert a name that already exists there will throw an Error
        }
    });
}
