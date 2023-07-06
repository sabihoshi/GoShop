import { useEffect, useState } from 'react';
import ProductCard from '../../ProductCard/ProductCard';
import { Col, Row, Spinner } from 'react-bootstrap';
import { getUserActiveSells } from '../../../services/userData';

import './Sells.css';

interface Product {
    id: string;
    category: string;
    image: string;
    title: string;
    price: number;
    addedAt: Date;
    city: string;
}

interface Params {
    id: number;
}

export interface ActiveSellsProps {
    params: Params;
}

function ActiveSells({ params }: ActiveSellsProps) {
    const [products, setProduct] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        window.scrollTo(0, 0);
        if (params.id) {
            getUserActiveSells(params.id)
                .then((res: Product[]) => {
                    setProduct(res);
                    setLoading(false);
                })
                .catch(err => console.log(err))
        }
    }, [params.id])

    return (
        <>
            {!loading ?
                (<>
                    <h1 className="heading">Active Sells</h1>
                    {products ? (
                        <Row>
                            {products
                                .map(x =>
                                    <Col xs={12} md={6} lg={4} key={x.id.toString()}>
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
