import { useEffect, useState, ReactElement } from 'react';
import ProductCard from '../../ProductCard/ProductCard';
import { Col, Row, Spinner } from 'react-bootstrap';
import { getUserWishlist } from '../../../services/userData';

import './Wishlist.css';

interface Product {
    category: string;
    active: boolean;
    _id: number;
    image: string;
    title: string;
    price: number;
    addedAt: Date;
    city: string;
}

function Wishlist(): ReactElement | null {
  const [products, setProduct] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    getUserWishlist()
      .then(res => {
        setProduct(res.wishlist.filter((x: Product) => x.active === true));
        setLoading(false);
      })
      .catch(err => console.log(err));
  }, [setProduct, setLoading]);

  return (
    <>
      {!loading ? (
        <>
          <h1 className="heading">Wishlist</h1>
          {products.length > 0 ? (
            <Row>
              {products.map((x: Product) => (
                <Col xs={12} md={6} lg={4} key={x._id.toString()}>
                  <ProductCard params={x} />
                </Col>
              ))}
            </Row>
          ) : (
            <p className="nothing-to-show">Nothing to show</p>
          )}
        </>
      ) : (
        <Spinner animation="border" />
      )}
    </>
  );
}

export default Wishlist;
