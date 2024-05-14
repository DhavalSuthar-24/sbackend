import express from 'express'
import { addListing, bookRoom, getAllListings, getListing, getRoomDetails, getRoomsByHotelId, getUnavailableRooms } from '../controllers/post.controller.js'


const router = express.Router(
)

router.post("/add" ,addListing)
router.get('/getlistings',getAllListings)
router.get("/getdetails/:id",getListing);
router.get('/roomsDetails/:hotel_id',getRoomsByHotelId);
router.get('/getbookingDetail/:room_id',getUnavailableRooms);
router.post('/bookRoom',bookRoom);
router.get("/room/:room_id",getRoomDetails)






export default router