import express from 'express';
import { createPost, getAllPosts, getPostById, getPostsByUser, likePost, commentOnPost, deletePost, getCommentsByPostId, getLikesByPostId } from '../controllers/post.Controller.js';
import authenticate from '../../auth_service/middlewares/auth.middlware.js';
import multer from 'multer';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });


router.post('/', authenticate, upload.single('image'), createPost);
router.get('/', getAllPosts);
router.post('/:id/like', authenticate, likePost);
router.post('/:id/comment', authenticate, commentOnPost);
router.delete('/:id', authenticate, deletePost);
router.get('/:id/comment', getCommentsByPostId);
router.get('/:id/like' , getLikesByPostId);
router.get('/userposts', authenticate, getPostsByUser );
router.get('/specific-post/:id', getPostById);


export default router;