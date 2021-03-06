import asyncHandler from 'express-async-handler'
import Product from '../models/product.js'
import SEARCHFeatures from '../utils/searchFeatures.js'

const getProducts = asyncHandler(async (req, res) => {
    // const pageSize = 10
    // const page = Number(req.query.pageNumber) || 1
    // const keyword = req.query.keyword ? {
    //     name: {
    //         $regex: req.query.keyword,
    //         $options: 'i'
    //     }
    //     }: {}
    //     console.log(keyword)
    // const count = await Product.countDocuments({...keyword})
    // const products = await Product.find({ ...keyword}).limit(pageSize).skip(pageSize * (page - 1))
    console.log('her is the reqest !@##################################')
    const resPerPage = 4;
    const productCount = await Product.countDocuments();
    const searchFeatures = new SEARCHFeatures(Product.find(), req.query).search().filter().pagination(resPerPage).sort(req.query.sort)

    const products = await searchFeatures.query;

    // res.json({products, page, pages: Math.ceil(count / pageSize)})
    console.dir(products)

    res.status(200).json({
        success:true,
        products
    })
})

const getProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)

    if (product){
        res.json(product)
    }else {
        res.status(404)
        throw new Error('Product not found')
    }
})

const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)

    if (product){
        await product.remove()
        res.json({message: 'Product Deleted'})
    }else {
        res.status(404)
        throw new Error('Product not found')
    }
})

const createProduct = asyncHandler(async (req, res) => {
    console.dir(req.body)
    const product = new Product({
        name: req.body.name,
        price: req.body.price,
        user: req.user._id,
        image: req.body.image,
        brand: req.body.brand,
        category: req.body.category,
        numReviews: 0,
        description: req.body.description,
        countInStock: req.body.countInStock
    })

    const createdProduct = await product.save()
    res.status(201).json(createdProduct)
})

const updateProduct = asyncHandler(async (req, res) => {
    const {name, price, description, image, brand, category, countInStock} = req.body

    const product = await Product.findById(req.params.id)

    if(product) {
        product.name = name
        product.price = price
        product.description = description
        product.image = image
        product.brand = brand
        product.category = category
        product.countInStock = countInStock
        
        
    const updatedProduct = await product.save()
    res.json(updatedProduct)
    }else {
        res.status(404)
        throw new Error('Product not found')
    }
})

const createProductReview = asyncHandler(async (req, res) => {
    const { rating, comment } = req.body

    const product = await Product.findById(req.params.id)

    if(product) {

        const alreadyReviewed = products.reviews.find(r => r.user.toString() === req.user._id.toString())

        if(alreadyReviewed) {
            res.status(404)
            throw new Error('Product already reviewed')
        }
        const review = {
            name: req.user.name,
            rating: Number(rating),
            comment,
            user: req.user._id
        }
        product.reviews.push(review)
        product.numReviews = product.reviews.length

        product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length

        
        
     await product.save()
    res.status(201).json({ message: 'Review added'})
    }else {
        res.status(404)
        throw new Error('Product not found')
    }
})

const getTopProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({}).sort({ rating: -1}).limit(9)
    console.dir(products)
    res.header('Cache-Control', 'no-cache, no-store, must-revalidate')
    res.json(products)
})

export {
    getProducts,
    getProduct,
    deleteProduct,
    createProduct,
    updateProduct,
    createProductReview,
    getTopProducts
}