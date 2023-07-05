import { useState, useEffect } from 'react';
import { Col, Form, Button, Spinner, Alert, Row} from 'react-bootstrap';
import SimpleSider from '../components/Siders/SimpleSider';
import { getSpecific, editProduct } from '../services/productData';
import { useParams, useNavigate } from 'react-router-dom';

import '../components/Edit/Edit.css'

interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    city: string;
    category: string;
    image?: File | string;
}

function Edit() {
    const [product, setProduct] = useState<Product>({
        id: 0,
        title: '',
        price: 0,
        description: '',
        city: '',
        category: ''
    });
    const [loading, setLoading] = useState(false);
    const [alertShow, setAlertShow] = useState(false);
    const [error, setError] = useState(null);
    
    const { productId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
        getSpecific(Number(productId))
            .then(res => setProduct(res))
            .catch(err => console.log(err));
    }, [productId])

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) : void => {
        e.preventDefault();
        setProduct({ ...product, [e.target.name]: e.target.value });
        if (e.target.files) {
            setProduct({ ...product, image: e.target.files[0] })
        }
    }

    const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>): void => {
        //TODO: Rewrite this 
        e.preventDefault();
        let { id, title, price, description, city, category, image } = product;
        let obj: Partial<Product> = { title, price, description, city, category }
        setLoading(true);
        if (typeof image == 'object') {
            getBase64(image)
                .then((data) => {
                    obj = {...obj, image: data as string};
                    editProduct(id, obj as Product)
                        .then(res => {
                            if (!res.error) {
                                navigate(`/categories/${category}/${id}/details`)
                            } else {
                                setLoading(false);
                                setError(res.error);
                                setAlertShow(true);
                            }
                        })
                        .catch(err => console.error('edit product err: ', err))
                })
                .catch(err => console.log('base64 error: ', err));
        } else {
            editProduct(id, obj)
                .then(res => {
                    if (!res.error) {
                        navigate(`/categories/${category}/${id}/details`)
                    } else {
                        setLoading(false);
                        setError(res.error);
                        setAlertShow(true);
                    }
                })
                .catch(err => console.error('edit product err: ', err))
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
                <h1 className="heading">Edit product</h1>
                <Form onSubmit={onSubmitHandler}>
                    {alertShow &&
                        <Alert variant="danger" onClose={() => setAlertShow(false)} dismissible>
                            <p>
                                {error}
                            </p>
                        </Alert>
                    }
                    <Row>
                        <Form.Group as={Col} controlId="formGridTitle">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" placeholder="Enter title" name="title" value={product.title} onChange={onChangeHandler} required />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridPrice">
                            <Form.Label>Price</Form.Label>
                            <Form.Control type="number" step="0.01" placeholder="Price" name="price" value={product.price} onChange={onChangeHandler} required />
                        </Form.Group>
                    </Row>

                    <Form.Group controlId="formGridDescription.ControlTextarea1">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" rows={3} name="description" defaultValue={product.description} onChange={onChangeHandler} required />
                    </Form.Group>

                    <Row>
                        <Form.Group as={Col} controlId="formGridCity">
                            <Form.Label>City</Form.Label>
                            <Form.Control name="city" placeholder="Sofia" value={product.city} onChange={onChangeHandler} required />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridCategory">
                            <Form.Label>Category</Form.Label>
                            <Form.Control as="select" value={product.category} name="category" onChange={onChangeHandler} required >
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
                            <Form.Control name="image" type="file" onChange={onChangeHandler} />
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

export default Edit;