import React, { useEffect } from "react";
import Product from "../components/Product";
import NavBar from '../components/NavBar';
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import { listTopProducts } from "../actions/productActions";
import { Container, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";


const Home = () => {
    const { pageNumber } = useParams() || 1;
    const dispatch = useDispatch();

    const productTopRated = useSelector(state => state.productTopRated)
    const { loading, error, products } = productTopRated

    useEffect(() => {
        dispatch(listTopProducts(pageNumber));
        console.dir(products)

    }, [dispatch, pageNumber]);
    return(
        <>
            <NavBar />
            <section class="hero-area bg-1 text-center overly">
                <div class="container">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="content-block">
                                <h1>Buy &amp; Sell Near You </h1>
                                <p>Join the millions who buy and sell from each other <br /> everyday in local communities around the world</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Container>
                <div className='mt-3'>
                </div>
                <h1>Latest Products</h1>
                {loading ? (
                <Loader />
                ) : error ? (
                <Message variant="danger">{error}</Message>
                ) : (
                <>
                <Row>
                    {products.map((product) => (
                    <Col key={product._id} sm="12" md="6" lg="4" xl="3">
                        <Product product={product}></Product>
                    </Col>
                    ))}
                </Row>
                </>
                )}
            </Container>
           
        </>
    )
}

export default Home;