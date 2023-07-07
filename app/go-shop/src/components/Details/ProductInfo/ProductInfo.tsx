import {useState, useEffect, FC} from 'react';
import {Row, Tabs, Tab, Image, OverlayTrigger, Tooltip} from 'react-bootstrap';
import {BsHeart, BsHeartFill} from 'react-icons/bs';
import {wishProduct} from '../../../services/productData'
import {Product} from "../../../types";

interface ProductInfoProps {
    params: Product;
}

const ProductInfo: FC<ProductInfoProps> = ({params}) => {
    const [wish, setWish] = useState(false);
    const isLoggedIn = sessionStorage.getItem('user');
    // useEffect(() => {
    //     if (params.isWished) {
    //         setWish(true)
    //     } else {
    //         setWish(false)
    //     }
    // }, [params.isWished, setWish])

    const onHearthClick = () => {
        if (!wish) {
            wishProduct(Number(params.id))
                .then(res => {
                    setWish(true);
                })
                .catch(err => console.log(err))
        } else {
            wishProduct(Number(params.id))
                .then(res => {
                    setWish(false);
                })
                .catch(err => console.log(err))
        }
    }

    // @ts-ignore
    return (
        <>
            <Image className="col-lg-12" src={params.image} rounded/>
            <Row>
                <h1 className="col-lg-10 col-sm-10 product-info-heading">{params.title}</h1>
                <span id="heartIconDetails" className="col-lg-1 col-sm-1" onClick={onHearthClick}>
                {isLoggedIn && <>
                    {!wish ? (
                            <OverlayTrigger placement="top" overlay={<Tooltip>Add to Wishlist</Tooltip>}>
                                <BsHeart/>
                            </OverlayTrigger>
                        )
                        : (
                            <OverlayTrigger placement="top" overlay={<Tooltip>Remove from Wishlist</Tooltip>}>
                                <BsHeartFill/>
                            </OverlayTrigger>
                        )
                    }
                </>}

                </span>
            </Row>
            <div id="detailsCardText" className="col-lg-12">
                <Tabs defaultActiveKey="details" transition={false}>
                    <Tab eventKey="details" title="Details" id="tab-details">
                        {params.description}
                        <hr/>
                        <p id="details-footer" className="text-muted"><>Product listed at {params.addedAt}</></p>
                    </Tab>
                    {/* <Tab eventKey="aboutSeller" title="About seller">
                        <p>Name: {params.name || "Not specified"}</p>
                        <p>Email: {params.email}</p>
                        <p>Telephone: {params.phone}</p>
                        <p>City: {params.city}</p>
                    </Tab> */}
                </Tabs>
            </div>
        </>
    )
}

export default ProductInfo;