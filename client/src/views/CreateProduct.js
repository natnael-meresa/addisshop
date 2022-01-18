import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createProduct } from "../actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import NavBar from "../components/NavBar";
import axios from "axios";


import {
  Row,
  Col,
  Button,
  Form,
  Container,
} from "react-bootstrap";

const CreateProduct = () => {

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productCreate = useSelector((state) => state.productCreate);
  let { loading, error, success } = productCreate;
  const navigate = useNavigate();

  useEffect(() => {

    if(success){
      success = null;
      navigate(`/search?q=${name}`);
    }
  }, [success, navigate]);

  const uploadFileHandler = async (e) => {
      const file = e.target.files[0]
      const formData = new FormData()
      formData.append('image', file)
      setUploading(true)

      try{
          const config = {
              headers: {
                  'Content-Type': 'multipart/form-data'
              }
          }
          const { data } = await axios.post('/api/upload', formData, config)
          setImage(data)
          setUploading(false)
          console.log(image)
      } catch (error){
          console.error(error)
          setUploading(false)
      }
  }

  const submitHandler = (e) => {
    e.preventDefault(); 

    dispatch(createProduct(name, price, image, brand, category, description, countInStock));


  };


  return (
    <>
      <NavBar />
      <Container>
        <FormContainer>
          <h1>Create Product</h1>
          {error && <Message variant="danger">{error}</Message>}
          {loading && <Loader />}
          <Form onSubmit={submitHandler}>
           <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="price">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="image">
                <Form.Label>Image</Form.Label>
                <Form.Control
              type="file"
              name="file"
              onChange={uploadFileHandler}
            />
                {uploading && <Loader />}
              </Form.Group>
              <Form.Group controlId="brand">
                <Form.Label>Brand</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter brand"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="category">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  type="text"
                  value={category}
                  placeholder="Enter Category"
                  onChange={(e) => setCategory(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  value={description}
                  placeholder="Enter description"
                  onChange={(e) => setDescription(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="countInStock">
                <Form.Label>Count In Stock</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter CountInStock"
                  value={countInStock}
                  onChange={(e) => setCountInStock(e.target.value)}
                ></Form.Control>
              </Form.Group>
            <Button type="submit" variant="primary" className="mb-4 mt-3">
              Create Product
            </Button>
          </Form>
        </FormContainer>
      </Container>
    </>
  );
};

export default CreateProduct;
