import express from 'express'
const router = express.Router()
import {getProduct, getProducts, deleteProduct, createProduct, updateProduct, createProductReview, getTopProducts} from '../controllers/productController.js'
import { protect } from '../middleware/authMiddleware.js'

router.route('/').get(getProducts).post(protect, createProduct)
router.route('/:id/reviews').post(protect, createProductReview)
router.get('/top', getTopProducts)

router.route('/:id').get(getProduct).delete(protect, deleteProduct).put(protect, updateProduct)

export default router