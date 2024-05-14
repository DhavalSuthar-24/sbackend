import Sequelize from 'sequelize';
import sequelize from '../connection/database.js';
import User from './user.model.js'; // Import User model
import Room from './room.model.js'; // Import Room model (after definition)

const Booking = sequelize.define('Booking', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  room_id: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  user_id: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  check_in_date: {
    type: Sequelize.DATE,
    allowNull: false
  },
  check_out_date: {
    type: Sequelize.DATE,
    allowNull: false
  },
  total_price: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false
  },
  is_confirmed: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: true
  }
}, {
  tableName: 'booking',
  timestamps: false
});

Room.hasMany(Booking, { foreignKey: 'room_id' });
Booking.belongsTo(Room, { foreignKey: 'room_id' });
Booking.belongsTo(User, { foreignKey: 'user_id' });

export default Booking;
