import React, {useEffect, useState} from 'react';
import {Button, Col, Form, Modal, OverlayTrigger, Tooltip} from 'react-bootstrap';
import {Link, useNavigate} from 'react-router-dom';
import {RiMessage3Fill} from 'react-icons/ri';
import {GrEdit} from 'react-icons/gr';
import {MdArchive, MdEmail, MdPhoneAndroid} from 'react-icons/md'
import {BsFillPersonFill} from 'react-icons/bs';
import {FaSellsy} from 'react-icons/fa'
import {archiveSell} from '../../../services/productData';
import {createChatRoom} from '../../../services/messagesData'
import './Aside.css';
import {Category, Product, User} from "../../../types";
import {isLoggedIn} from "../../../services/userData";

interface AsideParams {
    seller: User
    user: User
    product: Product
    category: Category
}

interface AsideProps {
    params: AsideParams;
}

function Aside({params}: AsideProps) {
    const [showMsg, setShowMsg] = useState(false);
    const [showArchive, setShowArchive] = useState(false);
    const [message, setMessage] = useState("");
    const [isAuthorized, setIsAuthorized] = useState(false);
    let navigate = useNavigate();

    const handleClose = () => setShowMsg(false);
    const handleShow = () => setShowMsg(true);

    const handleCloseArchive = () => setShowArchive(false);
    const handleShowArchive = () => setShowArchive(true);

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        archiveSell(params.product.id)
            .then(res => {
                setShowArchive(false);
                navigate(`/profile/${params.user.id}`);
            })
            .catch(err => console.log(err))
    }

    const handleMsgChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        e.preventDefault();
        setMessage(e.target.value);
    }


    const OnMessageSend = () => {
        let navigate = useNavigate();
        createChatRoom(Number(params.user), message)
            .then((res) => {
                navigate(`/messages/${res.id}`);
            })
            .catch(err => console.log(err))
    }

    // useEffect(() => {
    //     isLoggedIn()
    //         .then(res => {
    //             setIsAuthorized(res);
    //         });
    // })


    return (
        <aside>
            <div className="product-details-seller">
                <div id="priceLabel" className="col-lg-12">
                    <h4 id="product-price-heading">Product Price </h4>
                    {params.user.id === params.seller.id &&
                        <>
                            <OverlayTrigger placement="top" overlay={<Tooltip>Edit the selling</Tooltip>}>
                                <span id="edit-icon">
                                  <Link to={`/categories/${params.category.name}/${params.seller.id}/edit`}><GrEdit/></Link>
                                </span>
                            </OverlayTrigger>
                            <OverlayTrigger placement="top" overlay={<Tooltip>Archive</Tooltip>}>
                                <span id="archive-icon" onClick={handleShowArchive}>
                                  <MdArchive/>
                                </span>
                            </OverlayTrigger>
                        </>
                    }
                    {params.product.price && <h1 id="price-heading">{Number(params.product.price).toFixed(2)} PHP</h1>}
                </div>
                {isAuthorized ? (
                    <>
                        {params.seller.id !== params.user.id &&
                            <Button variant="dark" className="col-lg-10" id="btnContact" onClick={handleShow}>
                                <RiMessage3Fill/>Contact Seller
                            </Button>
                        }
                        <Link to={`/profile/${params.seller.id}`}>
                            <Col lg={12}>
                                <img id="avatar" src={params.seller.avatar} alt="user-avatar"/>
                            </Col>
                            <Col lg={12}>
                                <p><BsFillPersonFill/> {params.seller.name}</p>
                                <p><MdEmail/> {params.seller.email}</p>
                                <p><MdPhoneAndroid/> {params.seller.phoneNumber}</p>
                                {/*<p><FaSellsy/> {params.seller.createdSells} sells in total</p>*/}
                            </Col>
                        </Link>
                    </>
                ) : (
                    <p id="guest-msg"><Link to="/auth/login">Sign In</Link> now to contact the seller!</p>
                )}
            </div>
            <Modal show={showMsg} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Message</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Control as="textarea" name="textarea" onChange={handleMsgChange} rows={3}/>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="dark" onClick={OnMessageSend}>Send</Button>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showArchive} onHide={handleCloseArchive}>
                <Modal.Header closeButton>
                    <Modal.Title>Are you sure you want to archive this item?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>This action will archive the item and remove it from the listing. Are you sure?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleSubmit}>Archive</Button>
                    <Button variant="secondary" onClick={handleCloseArchive}>Cancel</Button>
                </Modal.Footer>
            </Modal>
        </aside>
    );
}

export default Aside;