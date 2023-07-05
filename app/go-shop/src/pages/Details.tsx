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

interface Product {
    id: number;
    title: string;
    seller: string;
    isSeller?: boolean;
    price?: number;
    isAuth: boolean;
    sellerId?: number;
    avatar?: string;
    name: string;
    email: string;
    phoneNumber: string;
    createdSells?: number;
    category: string;
    isWished: boolean;
    image: string;
    description: string;
    addedAt: string;
}


function Details() {
    let {id: productId} = useParams();
    let [product, setProduct] = useState<Product>({
        id: 0,
        title: "",
        seller: "",
        isSeller: false,
        price: 0,
        isAuth: false,
        sellerId: 0,
        avatar: "",
        name: "",
        email: "",
        phoneNumber: "",
        createdSells: 0,
        category: "",
        isWished: false,
        image: "",
        description: "",
        addedAt: ""
    });
    let [loading, setLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0)
        getSpecific(Number(productId!))
            .then(res => {
                setProduct(res);
                setLoading(false);
            })
            .catch(err => console.log(err));

    }, [productId, setProduct, setLoading])


    return (
        <>
            <SimpleSider/>
            <div className="container">
                {!loading && product ? (
                    <>
                        <Breadcrumb params={product}/>
                        <Row>
                            <Col lg={8} id="detailsProduct">
                                <ProductInfo params={product}/>
                            </Col>
                            <Col lg={4}>
                                <Aside params={product}/>
                            </Col>
                        </Row></>) : (<Spinner animation="border"/>)}
            </div>
        </>
    )
}

export default Details;