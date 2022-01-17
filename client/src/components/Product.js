
import React from 'react';
import {Card} from 'react-bootstrap';
import Rating from './Rating'
import { Link } from 'react-router-dom';
const Product = ({product}) => {
    let date = new Date(product.updatedAt);
    let months = [ "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December" ];

    return (
        <Card className="ml-3">
            <div className="thumb-content">
                <a href="single.html">
                    <Card.Img variant="top" className="product-img" src={product.image} />
                </a>
            </div>
            <Card.Body >
                <Card.Title><a href="single.html">{product.name}</a></Card.Title>
                <Card.Text className="card-body-product">
                    <ul className="list-inline product-meta">
                        <li className="list-inline-item">
                            <a href="single.html"><i class="far fa-folder-open"></i>{product.category}</a>
                        </li>
                        <li className="list-inline-item">
                            <a href="category.html"><i className="fa fa-calendar"></i> {date.getDay()+1}th {months[date.getMonth()]}</a>
                        </li>
                    </ul>
                    <div className="product-ratings">
                        <Rating value={product.rating} text={`${product.numReviews} reviews`}></Rating>
                    </div>
                    <div className="price">$ {product.price}</div> 
                </Card.Text>
            </Card.Body>
        </Card>
    )
}


export default Product
