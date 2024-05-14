import Sequelize from 'sequelize';
import sequelize from '../connection/database.js';
import Property from './property.model.js'; // Import Property model (assuming it's in the same directory)

const Room = sequelize.define('Room', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  hotel_id: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  room_number: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  room_type: {
    type: Sequelize.STRING,
    allowNull: true
  },
  price: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false
  },
  capacity: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  is_available: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: true
  }
}, {
  tableName: 'room',
  timestamps: false
});

Room.belongsTo(Property, { foreignKey: 'hotel_id' });

export default Room;
