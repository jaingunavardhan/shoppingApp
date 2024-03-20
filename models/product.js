//Importing the Sequelize Class
const Sequelize = require('sequelize');

//Importing the sequelize instance we created for database
const sequelize = require('../util/database.js');

//Defining/Creating a Table with its Column Specifications
//sequelize_instance.define(Table_Name,  Column_Names as Objects with datatype & constarints)
const Product = sequelize.define( 'product', {
    id:{    //Columns Name & In Sub_Object are consraints and Datatype                             
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    title:{ //Columns Name & In Sub_Object are consraints and Datatype
        type: Sequelize.STRING,
        allowNull: false
    },
    imageURL:{  //Columns Name & In Sub_Object are consraints and Datatype
        type: Sequelize.STRING,
        allowNull: false
    },
    description:{   //Columns Name & In Sub_Object are consraints and Datatype
        type: Sequelize.STRING,
        allowNull: false
    },
    price:{     //Columns Name & In Sub_Object are consraints and Datatype   
        type: Sequelize.DOUBLE,
        allowNull: false
    }
})

//Exporting the created table so that it can be executed
module.exports = Product;