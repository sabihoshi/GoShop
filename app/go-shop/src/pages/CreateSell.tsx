import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Alert, Button, Col, Form, Row, Spinner} from 'react-bootstrap';
import {createProduct} from '../services/productData';
import SimpleSider from '../components/Siders/SimpleSider';
import '../components/CreateSell/CreateSell.css';
import {getDummyProduct, Product} from "../types";

function CreateSell() {
    let [product, setProduct] = useState<Product>(getDummyProduct());
    let [loading, setLoading] = useState(false);
    let [alertShow, setAlertShow] = useState(false);
    let [errors, setErrors] = useState([]);

    const navigate = useNavigate();

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
        e.preventDefault();
        setProduct({...product, [e.target.name]: e.target.value});
        if (e.target.files) {
            setProduct({...product, imageFile: e.target.files[0]});
        }
    }

    const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        setLoading(true);
        createProduct(product)
            .then(res => {
                if (!res.error) {
                    navigate(`/categories/${product.category}/${res.id}/details`)
                } else {
                    setLoading(false);
                    setErrors(res.error);
                    setAlertShow(true);
                }
            })
            .catch(err => console.error('edit product err: ', err))
    }

    return (
        <>
            <SimpleSider/>
            <div className='container'>
                <h1 className="heading">Add a Product</h1>
                <Form onSubmit={onSubmitHandler}>
                    {alertShow &&
                        <Alert variant="danger" onClose={() => setAlertShow(false)} dismissible>
                            <p>
                                {errors}
                            </p>
                        </Alert>
                    }
                    <Row>
                        <Form.Group as={Col} controlId="formGridTitle">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" placeholder="Enter title" name="title" required
                                          onChange={onChangeHandler}/>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridPrice">
                            <Form.Label>Price</Form.Label>
                            <Form.Control type="number" step="0.01" placeholder="Price" name="price" required
                                          onChange={onChangeHandler}/>
                        </Form.Group>
                    </Row>

                    <Form.Group controlId="formGridDescription.ControlTextarea1">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" rows={3} name="description" required onChange={onChangeHandler}/>
                    </Form.Group>

                    <Row>
                        <Form.Group as={Col} controlId="formGridCity">
                            <Form.Label>City</Form.Label>
                            <Form.Control name="city" placeholder="Sofia" required onChange={onChangeHandler}/>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridCategory">
                            <Form.Label>Category</Form.Label>
                            <Form.Control as="select" defaultValue="Choose..." name="category" required
                                          onChange={onChangeHandler}>
                                <option>Choose...</option>
                                <option>properties</option>
                                <option>auto</option>
                                <option>electronics</option>
                                <option>clothes</option>
                                <option>toys</option>
                                <option>home</option>
                                <option>garden</option>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridImage">
                            <Form.Label>Image</Form.Label>
                            <Form.Control name="image" type="file" required onChange={onChangeHandler}/>
                        </Form.Group>
                    </Row>
                    {loading ?
                        <Button className="col-lg-12" variant="dark" disabled>
                            Please wait... <Spinner animation="border"/>
                        </Button>
                        :
                        <Button className="col-lg-12" variant="dark" type="submit">Add product</Button>
                    }
                </Form>
            </div>
        </>
    )
}

export default CreateSell;