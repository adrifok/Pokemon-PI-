const {  DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("Pokemon", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id: {
      type: DataTypes.UUID, //generate UUIDs automatically
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true, //Uniquely identifies each row/record in a database table
    },
      idPoke: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
      
    },
    life: {
      type: DataTypes.INTEGER,
      allowNull: false, //campo obligatorio
    },
    force: {
      type: DataTypes.INTEGER,
    },
    defense: {
      type: DataTypes.INTEGER,
    },
    speed: {
      type: DataTypes.INTEGER,
    },
    height: {
      type: DataTypes.DECIMAL, // DECIMAL(10,2)
    },
    weight:{
      type: DataTypes.DECIMAL,
    }
  });
};
