import express from 'express';
import {
  createEvent, getAllEvents, getUserEvents, getEventById, deleteEvent, updateEvent
} from '../controllers/eventController.js';
import authenticate from '../../auth_service/middlewares/auth.middlware.js';
import multer from 'multer';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/create', authenticate, upload.single('poster'), createEvent);
router.get('/all-events', getAllEvents);
router.get('/eventById/:id', authenticate, getEventById);
router.get('/userEvents', authenticate, getUserEvents);
router.put('/update/:id', authenticate, upload.single('poster'), updateEvent);
router.delete('/delete/:id', authenticate, deleteEvent);

export default router;
