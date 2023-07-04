import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Categories.css'
import { BsHouseDoorFill, BsFillHouseFill, BsFillPuzzleFill } from 'react-icons/bs'
import { AiFillCar } from 'react-icons/ai';
import { GiFlowerPot, GiClothes } from 'react-icons/gi';
import { TiSortAlphabetically } from 'react-icons/ti';
import { MdPhoneAndroid } from 'react-icons/md'

function CategoriesNav() {
    return (
        <div className="container" id="categories">
            <h1>Categories</h1>
            <Link to="/categories/all" style={{ textDecoration: 'none' }}>
                <Button variant="dark" id="all"><TiSortAlphabetically />All</Button>{' '}
            </Link>
            <Link to="/categories/properties" style={{ textDecoration: 'none' }}>
                <Button variant="dark" id="properties"><BsHouseDoorFill />Properties</Button>{' '}
            </Link>
            <Link to="/categories/auto" style={{ textDecoration: 'none' }}>
                <Button variant="dark" id="auto"><AiFillCar />Auto</Button>{' '}
            </Link>
            <Link to="/categories/home" style={{ textDecoration: 'none' }}>
                <Button variant="dark" id="home"><BsFillHouseFill />Home</Button>{' '}
            </Link>
            <Link to="/categories/electronics" style={{ textDecoration: 'none' }}>
                <Button variant="dark" id="electronics"><MdPhoneAndroid />Electronics</Button>{' '}
            </Link>
            <Link to="/categories/clothes" style={{ textDecoration: 'none' }}>
                <Button variant="dark" id="clothes"><GiClothes />Clothes</Button>{' '}
            </Link>
            <Link to="/categories/toys" style={{ textDecoration: 'none' }}>
                <Button variant="dark" id="toys"><BsFillPuzzleFill />Toys</Button>{' '}
            </Link>
            <Link to="/categories/garden" style={{ textDecoration: 'none' }}>
                <Button variant="dark" id="garden"><GiFlowerPot />Garden</Button>{' '}
            </Link>
        </div>
    )
}

export default CategoriesNav;