import { useEffect, useState } from 'react';
import { Col, Row, Spinner } from 'react-bootstrap';
import SimpleSider from '../components/Siders/SimpleSider';
import Breadcrumb from '../components/Details/Breadcrumb'
import ProductInfo from '../components/Details/ProductInfo/ProductInfo';
import Aside from '../components/Details/Aside/Aside';
import { getSpecific } from '../services/productData'
import { useParams, useNavigate } from 'react-router-dom';

import '../components/Details/ProductInfo/ProductInfo.css';
import '../components/Details/Aside/Aside.css';

interface Product {
    id: number;
    title: string;
    seller: string;
    isSeller?: boolean;
    price?: number;
    isAuth?: boolean;
    sellerId?: number;
    avatar?: string;
    name: string; // added
    email: string; // added
    phoneNumber: string; // added
    createdSells?: number;
    category: string;
}
  

function Details() {
    let { id: productId } = useParams();
    let [product, setProduct] = useState<Product | null>(null);
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
            <SimpleSider />
            <div className="container">
                {!loading ? (
                    <>
                    <Breadcrumb params={product} />
                    <Row>
                        <Col lg={8} id="detailsProduct">
                            <ProductInfo params={product} />
                        </Col>
                        <Col lg={4}>
                            <Aside params={product}  />
                        </Col>
                    </Row></>) : (<Spinner animation="border" />)}
            </div>
        </>
    )
}

export default Details;