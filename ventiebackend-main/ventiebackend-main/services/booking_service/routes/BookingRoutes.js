import express from 'express';
import { purchaseTicket, getBookingsByUserId} from '../controllers/BookingController.js';
import authenticate from '../../auth_service/middlewares/auth.middlware.js';


const router = express.Router();

router.post('/purchase-ticket',authenticate, purchaseTicket);

router.get('/userBookings',authenticate, getBookingsByUserId);


export default router;
