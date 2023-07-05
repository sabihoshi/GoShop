import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Col, Spinner, Alert, Row } from 'react-bootstrap';
import { createProduct } from '../services/productData';
import SimpleSider from '../components/Siders/SimpleSider';
import '../components/CreateSell/CreateSell.css';

interface Product {
    title: string;
    price: number;
    description: string;
    city: string;
    category: string;
    image: File | string;
}

function CreateSell() {
    let [product, setProduct] = useState<Product>({
        title: "",
        price: 0,
        description: "",
        city: "",
        category: "",
        image: ""
    });

    let [loading, setLoading] = useState(false);
    let [alertShow, setAlertShow] = useState(false);
    let [errors, setErrors] = useState([]);

    const navigate = useNavigate();

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
        e.preventDefault();
        setProduct({...product, [e.target.name]: e.target.value});
        if (e.target.files) {
            setProduct({ ...product, image: e.target.files[0] });
        }
    }

    const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        let { title, price, description, city, category, image } = product;
        let obj: Partial<Product> = { title, price, description, city, category };
        setLoading(true);
        if (typeof image == 'object') {
            getBase64(image)
                .then((data) => {
                    obj = {...obj, image: data as string};
                    createProduct(obj as Product)
                        .then(res => {
                            if (!res.error) {
                                navigate(`/categories/${category}/${res.id}/details`)
                            } else {
                                setLoading(false);
                                setErrors(res.error);
                                setAlertShow(true);
                            }
                        })
                        .catch(err => console.error('edit product err: ', err))
                })
                .catch(err => console.log('base64 error: ', err));
        }
    }

    function getBase64(file: File): Promise<string | ArrayBuffer | null> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }

    return (
        <>
            <SimpleSider />
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
                            <Form.Control type="text" placeholder="Enter title" name="title" required onChange={onChangeHandler} />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridPrice">
                            <Form.Label>Price</Form.Label>
                            <Form.Control type="number" step="0.01" placeholder="Price" name="price" required onChange={onChangeHandler} />
                        </Form.Group>
                    </Row>

                    <Form.Group controlId="formGridDescription.ControlTextarea1">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" rows={3} name="description" required onChange={onChangeHandler} />
                    </Form.Group>

                    <Row>
                        <Form.Group as={Col} controlId="formGridCity">
                            <Form.Label>City</Form.Label>
                            <Form.Control name="city" placeholder="Sofia" required onChange={onChangeHandler} />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridCategory">
                            <Form.Label>Category</Form.Label>
                            <Form.Control as="select" defaultValue="Choose..." name="category" required onChange={onChangeHandler}>
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

                        <Form.Group as={Col} controlId="formGridImage" >
                            <Form.Label>Image</Form.Label>
                            <Form.Control name="image" type="file" required onChange={onChangeHandler} />
                        </Form.Group>
                    </Row>
                    {loading ?
                        <Button className="col-lg-12" variant="dark" disabled >
                            Please wait... <Spinner animation="border" />
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