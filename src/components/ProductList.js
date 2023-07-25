import React, { useEffect, useState } from 'react'
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import ProductCard from './ProductCard';
import { Row } from 'react-bootstrap';
import { Form } from 'react-bootstrap';


function ProductList() {

  const [searchTerm, setSearchTerm] = useState('');

  const [productList, setProductList] = useState([]);

  useEffect(() => {
    // Check the value of searchTerm
    // console.log('Search term:', searchTerm); 
    axios
      .get('http://localhost:5000/api/product/getItems', { params: { search: searchTerm } })
      .then((response) => {
        // Check the response received from the backend
        // console.log('Response:', response.data.productItms);
        setProductList(response.data.productItms);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [searchTerm]);

  return (
    <Row>
      <Form.Control
        type="search"
        placeholder="Search for products"
        className="ms-4 mt-2"
        aria-label="Search"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {
        productList.map(item => (
          <Col sm={12} md={6} lg={4} xl={3} ><ProductCard product={item} /></Col>
        ))
      }
    </Row>
  )
}

export default ProductList