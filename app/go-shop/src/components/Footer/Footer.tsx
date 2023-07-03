import './Footer.css';
import { AiFillInstagram, AiFillLinkedin } from 'react-icons/ai'; 
import { FaFacebook } from 'react-icons/fa';

function Footer() {
    return (
        <footer>
            <div className="container">
                <div className="connections">
                    <a href="/#" id="instaIcon"><AiFillInstagram /></a>
                    <a href="/#" id="fbIcon"><FaFacebook /></a>
                    <a href="#" target="_blank" rel="noreferrer" id="linkedIcon"><AiFillLinkedin /></a>
                </div>
                All Rights Reserved &copy; 2021 &#8226;
                <a href="https://github.com/sabihoshi/GoShop" target="_blank" rel="noreferrer">GitHub</a>
            </div>
        </footer >
    )
}

export default Footer;