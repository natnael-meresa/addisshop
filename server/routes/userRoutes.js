import express from 'express'
const router = express.Router()
import { authUser, registerUser,updateUserProfile, getUserProfile, getUsers, deleteUser, getUserById, updateUser } from '../controllers/userController.js'
import { protect, } from '../middleware/authMiddleware.js'

router.post('/login', authUser)
router.route('/').post(registerUser).get(protect,getUsers)
router.route('/profile').get(protect, getUserProfile)
router.route('/profile').put(protect, updateUserProfile)

router.route('/:id').delete(protect, deleteUser).get(protect, getUserById).put(protect, updateUser)



export default router