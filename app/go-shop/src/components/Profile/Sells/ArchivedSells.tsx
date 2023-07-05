import React, { useEffect, useState } from 'react';
import DisabledCard from '../../DisabledProductCard/DisabledCard';
import { Col, Row, Spinner } from 'react-bootstrap';
import { getUserArchivedSells } from '../../../services/userData';

import './Sells.css';
import '../../DisabledProductCard/DisabledCard.css'

interface Product {
  id: number;
  active: boolean;
  category: string;
  image: string;
  title: string;
  price: number;
  addedAt: string;
  city: string;
  description: string;
}

interface Response {
  sells: Product[];
}

const ArchivedSells: React.FC = () => {
  const [products, setProduct] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    getUserArchivedSells()
      .then((res: Response) => {
        setProduct(res.sells);
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
                        .filter(x => x.active === false)
                        .map(x =>
                            <Col xs={12} md={6} lg={4} key={x._id.toString()}>
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
