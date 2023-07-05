import { useEffect, useState } from 'react';
import ProductCard from '../../ProductCard/ProductCard';
import { Col, Row, Spinner } from 'react-bootstrap';
import { getUserActiveSells } from '../../../services/userData';

import './Sells.css';
import { URLSearchParams } from 'url';

interface User {
    avatar: string;
    name: string;
    email: string;
    phoneNumber: string;
    totalSells: number;
    _id: string;
    isMe: boolean;
}

interface Product {
    category: string;
    _id: number;
    image: string;
    title: string;
    price: number;
    addedAt: Date;
    city: string;
}


interface Params {
    category: string;
    _id: number;
    image: string;
    title: string;
    price: number;
    addedAt: Date;
    city: string;
}

export interface ActiveSellsProps {
    params: User;
}

interface ActiveSellsState {
    products: Product[];
    loading: boolean;
}

function ActiveSells({ params }: ActiveSellsProps) {
    const [products, setProduct] = useState<ActiveSellsState['products']>([]);
    const [loading, setLoading] = useState<ActiveSellsState['loading']>(true);

    useEffect(() => {
        window.scrollTo(0, 0);
        if (params._id) {
            getUserActiveSells(Number(params._id))
                .then(res => {
                    setProduct(res.sells);
                    setLoading(false);
                })
                .catch(err => console.log(err))
        }
    }, [params._id])

    return (
        <>
            {!loading ?
                (<>
                    <h1 className="heading">Active Sells</h1>
                    {products ? (
                        <Row>
                            {products
                                .map(x =>
                                    <Col xs={12} md={6} lg={4} key={x._id.toString()}>
                                        <ProductCard params={x} />
                                    </Col>
                                )
                            }

                        </Row>
                    ) : (
                        <p className="nothing-to-show">Nothing to show</p>
                    )
                    }
                </>) :
                <Spinner animation="border" />}
        </>
    )
}

export default ActiveSells;
