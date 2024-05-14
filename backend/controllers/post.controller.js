import Property from "../models/property.model.js";
import Room from "../models/room.model.js";
import Booking from "../models/booking.model.js";
// import sequelize from "../connection/database.js";
import { Sequelize } from "sequelize";

export async function addListing(req, res) {
  try {
    // Parse data sent from frontend
    const { ownername, propertyname, category, purpose, description, image, image1, image2, price, mobile, email, ownerId, address } = req.body;

    // Create a new property using Sequelize's create method
    const property = await Property.create({
      ownername,
      propertyname,
      category,
      purpose,
      description,
      image,
      image1,
      image2,
      price,
      mobile,
      email,
      ownerId,
      address
    });

    // Send a success response back to the frontend
    res.status(201).json({ message: 'Property added successfully', property });
  } catch (error) {
    // Handle errors
    console.error('Error adding property:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function getAllListings(req, res) {
  try {
    // Retrieve all properties using Sequelize's findAll method
    const properties = await Property.findAll();

    // Send the retrieved data as JSON response
    res.status(200).json(properties);
  } catch (error) {
    // Handle errors
    console.error('Error fetching listings:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}



export async function getListing(req, res) {
  const { id } = req.params;

  try {
    // Find property by ID using Sequelize's findByPk method
    const property = await Property.findByPk(id);

    // Check if data exists
    if (property) {
      res.status(200).json(property);
    } else {
      res.status(404).json({ message: 'Data not found' });
    }
  } catch (error) {
    // Handle errors
    console.error('Error retrieving data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}





export async function getAvailableRoomsByHotelId(req, res) {
  const { hotelId } = req.params;

  try {
    // Find all available rooms for a given hotel ID using Sequelize's findAll method
    const rooms = await Room.findAll({
      where: {
        hotel_id: hotelId,
        is_available: true
      }
    });

    // Send the retrieved data as JSON response
    res.status(200).json(rooms);
  } catch (error) {
    // Handle errors
    console.error('Error fetching available rooms:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function getRoomsByHotelId(req, res) {
  const { hotel_id } = req.params;

  try {
    // Find all rooms for a given hotel ID using Sequelize's findAll method
    const rooms = await Room.findAll({
      where: {
        hotel_id: hotel_id
      },
      attributes: {
        include: [
          [
            Sequelize.literal("CASE WHEN is_available THEN 'Available' ELSE 'Not Available' END"),
            "availability_status"
          ]
        ]
      }
    });

    // Send the retrieved data as JSON response
    res.status(200).json(rooms);
  } catch (error) {
    // Handle errors
    console.error('Error fetching rooms:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}


export async function getUnavailableRooms(req, res) {
  try {
    const { room_id } = req.params;

    console.log(room_id)

    // Find details of unavailable rooms with booking details for a specific room_id using Sequelize's findAll method with include option
    const rooms = await Room.findAll({
      where: {
        id: room_id,
        is_available: false
      },
      include: [{
        model: Booking,
        attributes: ['id', 'user_id', 'check_in_date', 'check_out_date', 'is_confirmed']
      }]
    });

    // Send the retrieved data as JSON response
    res.status(200).json(rooms);
  } catch (error) {
    console.log(error)
    // Handle errors
    console.error('Error fetching unavailable rooms:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function bookRoom(req, res) {
  try {
    const { user_id, bookings } = req.body;

    // Initialize an array to store the booking IDs
    const bookingIds = [];

    // Iterate over each booking
    for (const booking of bookings) {
      const { room_id, check_in_date, check_out_date, total_price, description } = booking;

      // Create a booking using Sequelize's create method
      const createdBooking = await Booking.create({
        room_id,
        user_id,
        check_in_date,
        check_out_date,
        total_price,
        is_confirmed: false,
        description
      });

      // Extract the booking ID
      const bookingId = createdBooking.id;

      // Update the is_available field in the room table to false
      await Room.update({ is_available: false }, { where: { id: room_id } });

      // Add the booking ID to the array
      bookingIds.push(bookingId);
    }

    res.status(200).json({ bookingIds });
  } catch (error) {
    console.error('Error booking room:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function getRoomDetails(req, res) {
  try {
    const { room_id } = req.params;

    // Find details of a room by its ID using Sequelize's findOne method
    const room = await Room.findOne({
      where: { id: room_id },
      attributes: ['id', 'room_number', 'room_type', 'price', 'capacity', 'is_available']
    });

    // Send the retrieved data as JSON response
    if (room) {
      res.status(200).json(room);
    } else {
      res.status(404).json({ error: 'Room not found' });
    }
  } catch (error) {
    // Handle errors
    console.error('Error fetching room details:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

