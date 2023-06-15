// Footer.js
import React from 'react';
import './Footer.css';
import facebookLogo from '../../assets/img/s1.png';
import instagramLogo from '../../assets/img/s2.png';
import twitterLogo from '../../assets/img/s3.png';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="text">
                <p>MUSIK LEVEN - 2023 - &copy;</p>
            </div>

            <div className="social">
                <div className="socialCard">
                    <img src={facebookLogo} alt="logo facebook" />
                </div>
                <div className="socialCard">
                    <img src={instagramLogo} alt="logo instagram" />
                </div>
                <div className="socialCard">
                    <img src={twitterLogo} alt="logo twitter" />
                </div>
            </div>
        </footer>
    );
};

export default Footer;