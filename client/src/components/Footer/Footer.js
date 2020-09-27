import React, {Component} from 'react';
import './Footer.css';
import FacebookIcon from '../../assets/Homepage-icons/facebook-icon.svg';
import YoutubeIcon from '../../assets/Homepage-icons/youtube-icon.svg';
import LinkedInIcon from '../../assets/Homepage-icons/linkedin-icon.svg';
import TwitterIcon from '../../assets/Homepage-icons/twitter-icon.svg';
import InstagramIcon from '../../assets/Homepage-icons/instagram-icon.svg';



class Footer extends Component {
    render(){
        return (
            <footer className="main-footer">
                <nav>
                    <div id="contact-us-container">
                        <div id="main-footer__contacts-label">Contact Us:</div>
                        <ul className="main-footer__contacts">
                            <li className="main-footer__contact">
                                <a href="#support">support@folio.exchange</a>
                            </li>
                            <li className="main-footer__contact">
                                <a href="#contact">0400 000 000</a>
                            </li>
                            <li className="main-footer__contact">
                                <a href="#contact">(03) 9999 0000</a>
                            </li>
                            <ul className="main-footer__socials">
                                <li className="main-footer__social">
                                    <a href="#facebook">
                                        <img src={FacebookIcon} alt="facebook/link/icon" />
                                    </a>
                                </li>
                                <li className="main-footer__social">
                                    <a href="#youtube">
                                        <img src={YoutubeIcon} alt="youtube/link/icon" />
                                    </a>
                                </li>
                                <li className="main-footer__social">
                                    <a href="#linkedin">
                                        <img src={LinkedInIcon} alt="linkedin/link/icon" />
                                    </a>
                                </li>
                                <li className="main-footer__social">
                                    <a href="#twitter">
                                        <img src={TwitterIcon} alt="twitter/link/icon" />
                                    </a>
                                </li>
                                <li className="main-footer__social">
                                    <a href="#instagram">
                                        <img src={InstagramIcon} alt="instagram/link/icon" />
                                    </a>
                                </li>
                            </ul>
                        </ul>
                    </div>
                    <ul className="main-footer__important-links">
                        <li className="main-footer__important-link">
                            <a href="#policy">COOKIES POLICY</a>
                        </li>
                        <li className="main-footer__important-link">
                            <a href="#terms">TERMS AND CONDITIONS</a>
                        </li>
                        <li className="main-footer__important-link">
                            <a href="#policy">PRIVACY POLICY</a>
                        </li>
                    </ul>
                </nav>
                <div className="color-fade"></div>
        
            </footer>
        );
    }
}

export default Footer;