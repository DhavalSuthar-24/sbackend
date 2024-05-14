import Sequelize from 'sequelize';
// import {sequelize} from '../index.js'; // Assuming you've set up sequelize instance properly
import sequelize from '../connection/database.js';
// import association from './association.js';
const Property = sequelize.define('Property', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  ownername: {
    type: Sequelize.STRING,
    allowNull: false
  },
  propertyname: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  category: {
    type: Sequelize.STRING,
    allowNull: false
  },
  purpose: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  image: {
    type: Sequelize.STRING,
    allowNull: false
  },
  image1: {
    type: Sequelize.STRING
  },
  image2: {
    type: Sequelize.STRING
  },
  price: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false
  },
  mobile: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  ownerid: {
    type: Sequelize.INTEGER
  },
  address: {
    type: Sequelize.STRING,
    defaultValue: 'Ahmedabad'
  }
}, {
  tableName: 'property', // Define table name explicitly
  timestamps: false // Disable timestamps (createdAt, updatedAt)
});


export default Property;
