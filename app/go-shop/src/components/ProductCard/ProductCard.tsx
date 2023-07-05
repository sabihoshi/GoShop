import { Card } from "react-bootstrap";
// import { BsHeart, BsHeartFill } from 'react-icons/bs';
import { Link } from "react-router-dom";
import Moment from "react-moment";

interface Params {
    category: string;
    id: string;
    image: string;
    title: string;
    price: number;
    addedAt: Date;
    city: string;
}

interface ProductCardProps {
    params: Params;
}

const ProductCard: React.FC<ProductCardProps> = ({ params }) => {
    return (
        <Card>
            <Link to={`/categories/${params.category}/${params.id}/details`}>
                <Card.Img variant="top" src={params.image} />
                <Card.Body>
                    <Card.Title>{params.title}</Card.Title>
                    <Card.Text>{Number(params.price).toFixed(2)} PHP</Card.Text>
                </Card.Body>
            </Link>
            <Card.Footer>
                <small className="text-muted">
                    <Moment format="d MMM YYYY (dddd) HH:mm">
                        {params.addedAt}
                    </Moment>
                    - <strong>{params.city}</strong>
                </small>
            </Card.Footer>
        </Card>
    );
};

export default ProductCard;
