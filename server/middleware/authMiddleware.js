import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../models/user.js'

const protect = asyncHandler(async (req, res, next) => {
    let token

    console.log(req.headers.authorization)

    if ( req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1]

            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            const user = await User.findById(decoded.id).select('-password')
            req.user = user
            console.log('after user')
            next()
        } catch(err){
            console.log('inside err')
            console.error(err)
            res.status(401)
            throw new Error('Not authorized, token failed')
        }
    }

    if(!token) {
        console.log('inside !token')
        console.log(token)
        res.status(404);
        throw new Error('Not authorized, no token')

    }


})

const isAdmin = (req, res, next) => {
    if(req.user && req.user.isAdmin) {
        next()
    }else {
        res.status(401)
        throw new Error('Not Authorized')
    }
}

export { protect, isAdmin }