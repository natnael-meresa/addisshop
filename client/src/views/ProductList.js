import React, { useEffect, useState } from "react";
import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Rating from '../components/Rating'
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";
import { useParams } from "react-router-dom";
import Paginate from "../components/Paginate";
import NavBar from "../components/NavBar";
import Slider, { Range } from 'rc-slider';
import {
    useSearchParams,
    Link,
    useNavigate
  } from "react-router-dom";

import { Row, Col, Container, Card, Form} from "react-bootstrap";
const ProductList = () => {
const [searchParams, setSearchParams] = useSearchParams();
const keyword  = searchParams.get("q");
const { pageNumber } = useParams() || 1;
const [price, setPrice] = useState([1, 1000])

const [category, setCategory] = useState('')
const [brand, setBrand] = useState('')
const [sort, setSort] = useState()
const [rating, setRating] = useState(0)
const navigate = useNavigate();

const categories = [
    'Electronics',
    'Cameras',
    'Laptops',
    'Books',
    'clothes/shoes',
    'Beauty/Health',
    'Sports',
    'Outdoor',
    'Home'
]

const topBrand = [
    'apple',
    'nokia',
    'samsung',
    'hp',
    'toshipa',
    'LG'
]

const dispatch = useDispatch();

const producetList = useSelector((state) => state.productList);

const { loading, error, products , page, pages} = producetList;


  useEffect(() => {
    let link = `?q=${keyword}`
    dispatch(listProducts(keyword, pageNumber, price, category,rating, brand, sort));
    if(category){
        link += `&category=${category}`
    }
    if(price){
        link += `&price[lte]=${price[1]}&price[gte]=${price[0]}`
    }
    if(rating){
        link += `&ratings[gte]=${rating}`
    }
    if(brand){
        link += `&brand=${brand}`
    }

    navigate(link)
    

  }, [dispatch, keyword, pageNumber, price, category, rating, brand, sort]);

    return (
        <>
            <NavBar />
            <Container className="pt-4">
                <Row>
                    <Col md={12}>
                        <div className="search-result bg-gray">
                            <h2>Results For {keyword}</h2>
                        </div>
                    </Col>
                </Row>

                <Row class="row">
                    <Col lg={3} md={4}>
                        <div className="category-sidebar">
                            <div class="widget category-list">
                                <h4 className="widget-header">All Category</h4>
                                <ul className="category-list">
                                    {categories.map(category => (
                                     <li key={category} onClick={() => setCategory(category)} className="category-link">{category}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="category-sidebar">
                            <div className="widget category-list">
                                <h4 className="widget-header">Price Range</h4>
                                <Range marks={{
                                    1: `$1`,
                                    1000: `$1000`
                                }}
                                min={1}
                                max={1000}
                                defaultvalue={[1, 1000]}
                                tipFormatter={value => `$${value}`}
                                tipProps={{
                                    placement: "top",
                                    visible: true
                                }}
                                value={price}
                                onChange={price => setPrice(price)}
                                
                                />
                            </div>
                        </div>
                        <div className="category-sidebar">
                            <div class="widget category-list">
                                <h4 className="widget-header">Top Brand</h4>
                                <ul className="category-list">
                                    {topBrand.map(brand => (
                                     <li key={brand} onClick={() => setBrand(brand)} className="category-link">{brand}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="category-sidebar">
                            <div className="widget category-list">
                                <h4 className="widget-header">Ratings</h4>
                                <ul className="category-list">
                                    {[5, 4, 3, 2, 1].map(star => (
                                     <li key={star} onClick={() => setRating(star)} className="category-link">
                                         <Rating value={star} text=''></Rating>
                                     </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </Col>

                    <Col lg={9} md={8}>
                        <div className="category-search-filter">
                            <Row>
                                <Col md={6} className="text-center text-md-left">
                                    <Form.Group className="mb-3" as={Row}>
                                        <Form.Label column  sm={2}>Sort</Form.Label>
                                        <Form.Select size="sm" className="sort-form" sm={10} value={sort} onChange={e => {setSort(e.target.value);}}>
                                            <option>Most Recent</option>
                                            <option value="-rating">Most Popular</option>
                                            <option value="price">Lowest Price</option>
                                            <option value="-price">Highest Price</option>
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                                
                            </Row>
                        </div>
                        <div class="product-grid-list">
                        {loading ? (
                            <Loader />
                            ) : error ? (
                            <Message variant="danger">{error}</Message>
                            ) : (
                            <>
                                <Row className="mt-5">
                                {products.length >= 1 ? (
                                    products.map((product) => (
                                        <Col key={product._id} lg={4} md={6} sm={12}>
                                            <div class="product-item bg-light">
                                                <Product product={product}></Product>
                                            </div>
                                        </Col>
                                    ))
                                ): (
                                    <div class="product-item">
                                        <h2>Sorray! we could not found what you are loking for</h2>
                                    </div>
                                )}   


                                </Row>
                            </>
                            )}
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    )
}


export default ProductList;