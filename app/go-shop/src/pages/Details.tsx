import {useEffect, useState} from 'react';
import {Col, Row, Spinner} from 'react-bootstrap';
import SimpleSider from '../components/Siders/SimpleSider';
import Breadcrumb from '../components/Details/Breadcrumb'
import ProductInfo from '../components/Details/ProductInfo/ProductInfo';
import Aside from '../components/Details/Aside/Aside';
import {getSpecific} from '../services/productData'
import {useParams} from 'react-router-dom';

import '../components/Details/ProductInfo/ProductInfo.css';
import '../components/Details/Aside/Aside.css';
import {Category, Product, User} from "../types";
import {getLoggedInUser} from "../services/userData";

function Details() {
    let {id: productId} = useParams();
    let [product, setProduct] = useState<Product>();
    let [category, setCategory] = useState<Category>();
    let [seller, setSeller] = useState<User>();
    let [user, setUser] = useState<User>();
    let [loading, setLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0)
        getSpecific(Number(productId!))
            .then(res => {
                setProduct(res.product);
                setCategory(res.category);
                setSeller(res.seller);
            })
            .then(() => getLoggedInUser().then(res => {
                setUser(res);
                setLoading(false);
            }))
            .catch(err => console.log(err));

    }, [productId, setProduct, setLoading])

    return (
        <>
            <SimpleSider/>
            <div className="container">
                {!loading && user && category && seller && product ? (
                    <>
                        <Breadcrumb params={product}/>
                        <Row>
                            <Col lg={8} id="detailsProduct">
                                <ProductInfo params={product}/>
                            </Col>
                            <Col lg={4}>
                                <Aside params={{'product': product, 'category': category, 'user': user, 'seller': seller}}/>
                            </Col>
                        </Row></>) : (<Spinner animation="border"/>)}
            </div>
        </>
    )
}

export default Details;