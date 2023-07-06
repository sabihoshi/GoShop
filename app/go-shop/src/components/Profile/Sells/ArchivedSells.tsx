import React, { useEffect, useState } from 'react';
import DisabledCard from '../../DisabledProductCard/DisabledCard';
import { Col, Row, Spinner } from 'react-bootstrap';
import { getUserArchivedSells } from '../../../services/userData';

import './Sells.css';
import '../../DisabledProductCard/DisabledCard.css'

interface Product {
  id: number;
  category: string;
  image: string;
  title: string;
  price: number;
  addedAt: string;
  city: string;
  description: string;
}

interface Params {
  id: number;
}

export interface ArchivedSellsProps {
  params: Params;
}

function ArchivedSells({ params }: ArchivedSellsProps) {
  const [products, setProduct] =  useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    getUserArchivedSells(params.id)
      .then((res: Product[]) => {
        setProduct(res);
        setLoading(false)
      })
      .catch((err: Error) => console.log(err))
  }, [])
  

  return (
    <>
      {!loading ?
        (<>
            <h1 className="heading">Archive</h1>
            {products.length > 0 ? (
                <Row>
                    {products
                        .map(x =>
                            <Col xs={12} md={6} lg={4} key={x.id.toString()}>
                                <DisabledCard params={x} />
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

export default ArchivedSells;
