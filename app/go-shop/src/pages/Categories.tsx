import {ChangeEvent, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component'
import CategoriesNav from '../components/Categories/CategoriesNav'
import ProductCard from '../components/ProductCard/ProductCard';
import {Col, Dropdown, Spinner} from 'react-bootstrap';
import {getAll} from '../services/productData';
import {BiDownArrowAlt, BiSort, BiSortDown, BiSortUp, BiUpArrowAlt} from 'react-icons/bi'
import '../components/Siders/SearchSider.css'
import '../components/Categories/Categories.css';
import '../components/ProductCard/ProductCard.css';

interface MatchParams {
    category: string;
}

interface Match {
    params: MatchParams;
}

interface CategoriesProps {
    match: Match;
}

interface Product {
    id: string;
    addedAt: Date;
    price: number;
    category: string,
    image: string,
    title: string,
    city: string,
}

const Categories: React.FC = () => {
    // let currentCategory = match.params.category;
    let {currentCategory} = useParams();
    const [products, setProduct] = useState<Product[]>([])
    const [page, setPage] = useState(1);
    const [query, setQuery] = useState("");
    const [loading, setLoading] = useState(true);
    const [sort, setSort] = useState('oldest');

    useEffect(() => {
        setPage(1);
        setLoading(true);
        setQuery(query)
        getAll(1, currentCategory, query)
            .then(res => {
                setProduct(res);
                setLoading(false);
                setPage(page => page + 1);
            })
            .catch(err => console.log(err));
    }, [query, currentCategory])

    // useEffect(() => {
    //     setPage(1);
    //     setLoading(true);
    //     getAll(2, currentCategory, query)
    //         .then(res => {
    //             if (query === "") {
    //                 console.log(res);
    //                 setProduct(products => [...products, ...res]);
    //             } else {
    //                 console.log(res);
    //                 setProduct(res)
    //             }
    //             setLoading(false);
    //             setPage(page => page + 1);
    //         })
    //         .catch(err => console.log(err));
    // }, [page])

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        setQuery(e.target.value)
    }

    return (
        <>
            <div id="sider">
                <input className="col-lg-6" type="text" placeholder="Search..." name="search" value={query}
                       onChange={handleSearch}/>
            </div>
            <CategoriesNav/>
            <div className="container">
                <Dropdown id="dropdown-sort">
                    <Dropdown.Toggle variant="light" id="dropdown-basic">
                        Sort <BiSort/>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={() => {
                            setSort('oldest')
                        }}>Oldest <BiDownArrowAlt/></Dropdown.Item>
                        <Dropdown.Item onClick={() => {
                            setSort('newest')
                        }}>Newest <BiUpArrowAlt/></Dropdown.Item>
                        <Dropdown.Item onClick={() => {
                            setSort('lowerPrice')
                        }}>Price <BiSortDown/></Dropdown.Item>
                        <Dropdown.Item onClick={() => {
                            setSort('biggerPrice')
                        }}>Price <BiSortUp/> </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <InfiniteScroll
                    dataLength={products.length}
                    next={() => {
                        if (query === "") {
                            getAll(page, currentCategory)
                                .then(res => {
                                    setProduct([...products, ...res]);
                                    setPage(page + 1)
                                })
                        }
                    }}
                    hasMore={products.length > 0}
                    loader={<div className="spinner"><Spinner animation="border"/></div>}
                    className="row">
                    {products
                        .sort((a, b) => {
                            let x = new Date(a.addedAt);
                            let y = new Date(b.addedAt);
                            let str1 = x.toLocaleDateString('en-US');  // for example, 'en-US'
                            let str2 = y.toLocaleDateString('en-US');
                            if (sort === "oldest") {
                                return str1.localeCompare(str2)
                            } else if (sort === "newest") {
                                return str2.localeCompare(str1)
                            } else if (sort === "lowerPrice") {
                                return b.price - a.price
                            } else if (sort === "biggerPrice") {
                                return a.price - b.price
                            } else {
                                return 0;
                            }
                        })
                        .map(x =>
                            <Col xs={12} md={6} lg={3} key={x.id.toString()}>
                                <ProductCard params={x}/>
                            </Col>
                        )}
                </InfiniteScroll>
            </div>
        </>
    )
}

export default Categories;