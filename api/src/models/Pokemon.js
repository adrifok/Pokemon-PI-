const {  DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("Pokemon", {
    name: {
      type: DataTypes.STRING,
      allowNull: false, //campo obligatorio
      unique:true,
      validate:{len:[1,40]},
    },
    id: {
      type: DataTypes.UUID, //generate UUIDs automatically
      defaultValue: DataTypes.UUIDV4,
      allownull:false, //campo obligatorio
      primaryKey: true, //Uniquely identifies each row/record in a database table
      
    },
    life: {
      type: DataTypes.INTEGER,
    
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
    },
  },
  {timestamps : false}
  );
};
