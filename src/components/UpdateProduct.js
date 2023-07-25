import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';



function UpdateProduct() {

    const params = useParams()
    const navigate = useNavigate()
    const [updateProduct, setUpdateProduct] = useState([])
    const [imageFile, setImageFile] = useState(null);


    useEffect(() => {
        axios.get(`http://localhost:5000/api/product/getItems/${params.id}`)
            .then(response => {
                setUpdateProduct(response.data.productItmById);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, [params.id]);

    // Function to handle form field changes and update the state
    const handleInputChange = event => {
        const { name, value } = event.target;
        setUpdateProduct(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    // Function to handle form submit and update the data using Axios
    const handleSubmit = event => {
        event.preventDefault();
        axios
            .put(`http://localhost:5000/api/product/updateProduct/${params.id}`, updateProduct, imageFile)
            .then(response => {
                toast.success(response.data.message);
            })
            .catch(error => {
                toast.error('Error updating data:', error);
            });
        setTimeout(() => {
            navigate(`/view/${params.id}`);
        }, 5000);
    };

    const handleDiscard = event => {
        navigate(`/view/${params.id}`)
    }

    return (
        <Form className='p-5' onSubmit={handleSubmit}>
            <ToastContainer />
            <Form.Group controlId="formGridPassword">
                <Form.Label>Product Name</Form.Label>
                <Form.Control type="text" name='productname' value={updateProduct.productname || ''} onChange={handleInputChange} required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGridAddress1">
                <Form.Label>Description</Form.Label>
                <Form.Control type='text' name='productdesc' value={updateProduct.productdesc || ''} onChange={handleInputChange} required />
            </Form.Group>
            <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridCity">
                    <Form.Label>Price</Form.Label>
                    <Form.Control type="number" name='price' value={updateProduct.price || ''} onChange={handleInputChange} required />
                </Form.Group>
                <Form.Group as={Col} controlId="formFile" className="mb-3">
                    <Form.Label>Product Image</Form.Label>
                    <Form.Control type="file" name="files" required />
                </Form.Group>
            </Row>
            <Button variant="primary" type="submit">Save</Button>&nbsp;&nbsp;
            <Button variant="danger" type="reset" onClick={handleDiscard}>Discard</Button>
        </Form>
    )
}

export default UpdateProduct
