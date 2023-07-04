import React, { useState } from 'react';
import { Button, Modal, Form, OverlayTrigger, Tooltip, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { RiMessage3Fill } from 'react-icons/ri';
import { GrEdit } from 'react-icons/gr';
import { MdArchive } from 'react-icons/md'
import { BsFillPersonFill } from 'react-icons/bs';
import { MdEmail, MdPhoneAndroid } from 'react-icons/md'
import { FaSellsy } from 'react-icons/fa'
import { archiveSell } from '../../../services/productData';
import { createChatRoom } from '../../../services/messagesData'
import './Aside.css';

interface AsideProps {
    params: {
        _id: number;
        seller: string;
        isSeller: boolean;
        price?: number;
        isAuth: boolean;
        sellerId: number;
        avatar: string;
        name: string;
        email: string;
        phoneNumber: string;
        createdSells: number;
        category: string;
    };
  history: History;
}

function Aside({ params, history }: AsideProps) {
  const [showMsg, setShowMsg] = useState(false);
  const [showArchive, setShowArchive] = useState(false);
  const [message, setMessage] = useState("");

  const handleClose = () => setShowMsg(false);
  const handleShow = () => setShowMsg(true);

  const handleCloseArchive = () => setShowArchive(false);
  const handleShowArchive = () => setShowArchive(true);

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    archiveSell(params._id)
      .then(res => {
        setShowArchive(false);
        let navigate = useNavigate();
        navigate(`/profile/${params.seller}`);
      })
      .catch(err => console.log(err))
  }

  const handleMsgChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    setMessage(e.target.value);
  }
  

  const onMsgSend = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    createChatRoom(params.sellerId, message)
      .then((res) => {
        let navigate = useNavigate();
        navigate(`/messages/${res.messageId}`);
      })
      .catch(err => console.log(err))
  }

return (
    <aside>
      <div className="product-details-seller">
        <div id="priceLabel" className="col-lg-12">
          <h4 id="product-price-heading">Product Price </h4>
          {params.isSeller &&
            <>
              <OverlayTrigger placement="top" overlay={<Tooltip>Edit the selling</Tooltip>}>
                <span id="edit-icon">
                  <Link to={`/categories/${params.category}/${params._id}/edit`}><GrEdit /></Link>
                </span>
              </OverlayTrigger>
              <OverlayTrigger placement="top" overlay={<Tooltip>Archive</Tooltip>}>
                <span id="archive-icon" onClick={handleShowArchive}>
                  <MdArchive />
                </span>
              </OverlayTrigger>
            </>
          }
          {params.price && <h1 id="price-heading">{(params.price).toFixed(2)}€</h1>}
        </div>
        {params.isAuth ? (
          <>
            {!params.isSeller &&
              <Button variant="dark" className="col-lg-10" id="btnContact" onClick={handleShow}>
                <RiMessage3Fill />Contact Seller
              </Button>
            }
            <Link to={`/profile/${params.sellerId}`}>
              <Col lg={12}>
                <img id="avatar" src={params.avatar} alt="user-avatar" />
              </Col>
              <Col lg={12}>
                <p><BsFillPersonFill /> {params.name}</p>
                <p><MdEmail /> {params.email}</p>
                <p><MdPhoneAndroid /> {params.phoneNumber}</p>
                <p><FaSellsy /> {params.createdSells} sells in total</p>
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
              <Form.Control as="textarea" name="textarea" onChange={handleMsgChange} rows={3} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="dark" onClick={onMsgSend}>Send</Button>
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