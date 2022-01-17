import React from "react";
import { Link } from "react-router-dom";
import { Pagination,Nav } from "react-bootstrap";

const Paginate = ({ pages, page, isAdmin = false, keyword = "" }) => {
  return (
    pages > 1 && (
      <Pagination>
        {[...Array(pages).keys()].map((x) => (
            <Nav.Link as={Link}  className="btn btn-light" to={ !isAdmin ? keyword ? `/search/${keyword}/page/${x+1}` : `/page/${x+1}` : `/dashboard/productlist/${x + 1}`}>
                 <Pagination.Item key={x+1} active={x + 1 !== page} >
            {x+1}          
            </Pagination.Item>
            </Nav.Link>

        ))}
      </Pagination>
    )
  );
};

export default Paginate;
