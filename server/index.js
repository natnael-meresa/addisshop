import path from 'path'
import express from 'express'
import dotenv from 'dotenv';
import connectDB from './config/db.js'
import productRoutes from './routes/productRoutes.js'
import morgan from 'morgan'
dotenv.config()
connectDB()

const app =  express();
app.use(express.json())
app.use(morgan('combined'))
app.use(function(req, res, next) {
    req.headers['if-none-match'] = 'no-match-for-this';
    next();    
  });
import cors from'cors'
  app.use(cors());


import userRoutes from './routes/userRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'

app.use('/api/upload', uploadRoutes)
app.use('/api/products', productRoutes)
app.use('/api/user', userRoutes)

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, '/client/build')))

    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')))
}

const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`))