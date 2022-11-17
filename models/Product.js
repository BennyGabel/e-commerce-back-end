// import important parts of sequelize library
const { INTEGER } = require('sequelize');
const { Model, DataTypes } = require('sequelize');
// import our database connection from config.js
const sequelize = require('../config/connection');

// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model {}

// set up fields and rules for Product model
Product.init(
  {
    // define columns
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },    

    product_name: {
      type: DataTypes.STRING,
      allowNull: false
    },   

    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        // isDecimal is a sequelize's function 
        isDecimal: true
      }

      // Don't need validation
      // isDecimal(value) {     // num % 1 != 0  ?
      //   switch (value ) {
      //     // case ((value-INTEGER(value))=0):
      //     case (value!=parseInt(value)):
      //     // Accept
      //       break
      //     case ((value-INTEGER(value))!=0):
      //       // Accept
      //       break
      //     default:
      //       throw new Error('Only decimal values are allowed!');
      //   }
      // }    
    },

    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 10,
      validate: {
        isNumeric: true
      }
      // Dont need  validation
      // isNumeric(value) {     // num % 1 != 0  ?
      //   if ((typeof value) == 'number') {
      //     // Accept
      //   } else {
      //     throw new Error('Only numbers are allowed!');
      //   }
      // }    
    },
    
    category_id:{
      type: DataTypes.INTEGER,
      allowNull:true,
      references: {
        model: 'category',
        key: 'id'
      }

    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product',
  }
);

module.exports = Product;
