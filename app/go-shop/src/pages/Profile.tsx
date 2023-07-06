import {useEffect, useState} from 'react';
import ProfileSection from '../components/Profile/ProfileSection'
import Wishlist from '../components/Profile/Wishlist/Wishlist'
import ActiveSells from '../components/Profile/Sells/ActiveSells';
import ArchivedSells from '../components/Profile/Sells/ArchivedSells'
import SellerProfile from '../components/Profile/SellerProfile'
import {getLoggedInUser, getUserById} from '../services/userData';
import {Button, Col, Row} from 'react-bootstrap';

import '../components/Profile/Profile.css';
import {useParams} from 'react-router-dom';
import {User} from "../types";

function Profile() {
    const [active, setActive] = useState<boolean>(true);
    const [archived, setArchived] = useState<boolean>(false);
    const [wishlist, setWishlist] = useState<boolean>(false);
    const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const {id} = useParams();

    const handleActive = () => {
        setActive(true)
        setArchived(false);
        setWishlist(false);
    }

    const handleArchived = () => {
        setActive(false);
        setArchived(true);
        setWishlist(false);
    }

    const handleWish = () => {
        setActive(false);
        setArchived(false);
        setWishlist(true);
    }

    useEffect(() => {
        window.scrollTo(0, 0);
        getLoggedInUser()
            .then(res => setLoggedInUser(res))
            .catch(err => console.log(err))
        getUserById(Number(id))
            .then(res => setUser(res))
            .catch(err => console.log(err))
    }, [id])

    return (
        <>
            {user && <>
                {loggedInUser?.id === user.id ? (<>
                        <ProfileSection params={user}/>
                        <div className="container">
                            <Row>
                                <Col lg={2} sm={12} id="aside">
                                    <Button variant="dark" id="active-sells" onClick={handleActive}>Active
                                        Sells</Button>{' '}
                                    <Button variant="dark" id="archived-sells"
                                            onClick={handleArchived}>Archived</Button>{' '}
                                    <Button variant="dark" id="wishlist" onClick={handleWish}>Wishlist</Button>{' '}
                                </Col>
                                <Col lg={10} sm={12}>
                                    {active && <ActiveSells params={user}/>}
                                    {archived && <ArchivedSells params={user}/>}
                                    {wishlist && <Wishlist/>}
                                </Col>
                            </Row>
                        </div>
                    </>) :
                    <SellerProfile params={user}/>
                }</>
            }
        </>
    )
}

export default Profile;