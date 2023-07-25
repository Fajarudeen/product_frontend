import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';



function AddProduct() {
    const navigate = useNavigate()
    const [productData, setProductData] = useState({
        productname: '',
        productdesc: '',
        price: '',
        files: null,
    });

    const handleChange = (event) => {
        const { name, value, files } = event.target;
        setProductData({
            ...productData,
            [name]: files ? files : value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const formData = new FormData();
            formData.append('productname', productData.productname);
            formData.append('productdesc', productData.productdesc);
            formData.append('price', productData.price);

            // Append multiple image files to the FormData
            if (productData.files) {
                for (let i = 0; i < productData.files.length; i++) {
                    formData.append('files', productData.files[i]);
                }
            }

            const response = await axios.post('http://localhost:5000/api/product/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
                .then((result) => (
                    toast.success(result.data.message)
                ))
            setTimeout(() => {
                navigate('/add');
            }, 5000);

            // Handle the response if needed
            console.log('Product creation successful:', response.data);

        } catch (error) {
            // Handle errors here
            toast.error(error)
            console.error('Error creating product:', error);
        }
    };

    return (

        <Form onSubmit={handleSubmit} className='p-5'>
            <ToastContainer />
            <Form.Group controlId="formGridPassword">
                <Form.Label>Product Name</Form.Label>
                <Form.Control type="text" name='productname' onChange={handleChange} required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGridAddress1">
                <Form.Label>Description</Form.Label>
                <Form.Control type='text' name='productdesc' onChange={handleChange} required />
            </Form.Group>
            <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridCity">
                    <Form.Label>Price</Form.Label>
                    <Form.Control type="number" name='price' onChange={handleChange} required />
                </Form.Group>
                <Form.Group as={Col} controlId="formFile" className="mb-3">
                    <Form.Label>Product Image</Form.Label>
                    <Form.Control type="file" name='files' multiple onChange={handleChange} required />
                </Form.Group>
            </Row>
            <Button variant="outline-secondary" type="submit">
                Submit
            </Button>
        </Form>
    );
}

export default AddProduct;
