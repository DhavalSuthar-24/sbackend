// associations.js
import Room from './room.model.js';
import Booking from './booking.model.js';

// Define associations
Booking.belongsTo(Room, { foreignKey: 'room_id' });
Room.hasMany(Booking, { foreignKey: 'room_id' });

export { Booking, Room };
