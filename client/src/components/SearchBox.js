import React, {useState} from 'react'
import {Form, Button, FormControl} from 'react-bootstrap'
import { useNavigate } from "react-router-dom";
const SearchBox = () => {
    const [keyword, setKeyword] = useState('')
    const navigate = useNavigate()
    const searchHandler = (e) => {
        e.preventDefault()
        if(keyword.trim()){
            navigate(`/search/?q=${keyword}`)
        }else {
            navigate('/')
        }
    }
    return (
        <Form onSubmit={searchHandler} className="d-flex searchbox" inline >
            <FormControl id="search-box" type='search' name='q' onChange={(e) => setKeyword(e.target.value)} placeholder='Search Products...' className='input-box me-2 mr-sm ml-sm-5' aria-label="Search">
            </FormControl>
            <Button type="submit" className="btn btn-primary" variant="outline-success">
                <i class="fas fa-search fa-sm"></i>
            </Button>
        </Form>
    )
}

export default SearchBox