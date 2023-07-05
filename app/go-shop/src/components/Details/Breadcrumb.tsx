import { Breadcrumb } from 'react-bootstrap';
import { Link } from 'react-router-dom';

interface Params {
  category: string;
  _id: number;
  title: string;
}

interface BreadcrumbNavProps {
  params: Params | null;
}

const BreadcrumbNav: React.FC<BreadcrumbNavProps> = ({ params }) => {
  if (!params) {
    return null;
  }
  return (
    <Breadcrumb>
      <li className="breadcrumb-item">
        <Link to="/">Home</Link>
      </li>
      <li className="breadcrumb-item">
        <Link to={`/categories/${params.category!}`}>{params.category}</Link>
      </li>
      <li className="breadcrumb-item">
        <Link to={`/categories/${params.category}/${params._id}/details`}>{params.title}</Link>
      </li>
    </Breadcrumb>
  )
}

export default BreadcrumbNav;
