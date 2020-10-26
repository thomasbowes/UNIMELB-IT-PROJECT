import React, {Component} from 'react';

import './HomePage.css'

import easy from "../../assets/shapes/easy.svg"
import share from "../../assets/shapes/share.svg"
import computer from "../../assets/shapes/computer.svg"
import arrow from "../../assets/shapes/arrow.svg"

import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/index';

class HomePage extends Component {
    render() {
        return (
            <main>
                <link href="https://fonts.googleapis.com/css2?family=Kumbh+Sans&display=swap" rel="stylesheet"></link>  
                
                <section className="product-promo">
                    <div className="product-promo__slogan">
                        <h1>Reach for the stars!</h1>
                        {this.props.userAuthToken?
                            <h2>Welcome to folio.exchange and shine like a star</h2>
                        :   <h2>Sign up now and shine like a star</h2>}
                        <div id="slogan__cta-buttons">
                            {this.props.userAuthToken === null? <button className="cta-button" onClick={this.props.loginSignUpclicked}>SIGN UP</button> : null }
                            <a href="#feature-list">
                                <button className="cta-button">LEARN MORE</button>
                            </a>
                        </div>    
                    </div>

                    <img id="arrow" src={arrow} alt="" />
                    
                </section>
                
                <div className="feature-list" id="feature-list">
                    <article className="feature">
                        <div className="feature__image">
                            <img src={easy} alt="" />    
                        </div>    
                        
                        <h1 className="feature__title">Quick and Easy</h1>
                        <h2 className="feature__detail">Set up your own portfolio in minutes</h2>
                    
                    </article>
                    <article className="feature">
                        <div className="feature__image">
                            <img src={share} alt="" />  
                        </div>

                        <h1 className="feature__title">Sharable</h1>
                        <h2 className="feature__detail">Easily share your profile with the people who need to see it</h2>
                    
                    </article>
                    <article className="feature">
                        <div className="feature__image">
                            <img src={computer} alt="" />  
                        </div>

                        <h1 className="feature__title">All-in-One</h1>
                        <h2 className="feature__detail">Everything you need in one place to create your own amazing portfolio</h2>
                    
                    </article>
                    
                </div>

                <div className="example-snippet">
                    <button className="cta-button">See Example</button>

                    <div className="divider">
                
                        <svg id="svg" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" viewBox="-300 130 950 130" >
                            <path d="M-314,267 C105,364 400,100 812,279" fill="none" stroke="#003A58" strokeWidth="120" strokeLinecap="round"/>
                        </svg>

                    </div>

                </div>

                <div className="faq">

                    <h1>Frequently Asked Questions</h1>

                    <article className="faq__questions">
                        <h1 className="faq__question">How much does folio.exchange cost?</h1>
                        <p className="faq__answer">This service is FREE!</p>
                    </article>

                    <article className="faq__questions">
                        <h1 className="faq__question">What content can I show on my portfolio?</h1>
                        <p className="faq__answer">Anything you want! Folio.exchange supports media uploads for a range of different content types.</p>
                    </article>

                    <article className="faq__questions">
                        <h1 className="faq__question">How hard is it to create a portfolio?</h1>
                        <p className="faq__answer">With folio.exchanges award winning design creating, editing and managing your potfolio has never been easier.</p>
                    </article>

                    <article className="faq__questions">
                        <h1 className="faq__question">How can I share my portfolio with others?</h1>
                        <p className="faq__answer">At folio.exchange we offer a wide variety of ways to share your portfolio, wgether it be through email, social media or PDF.</p>
                    </article>

                </div>
            </main>
        )
    }
}

//bring in redux state
const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        LoginMessage: state.auth.message,
        userAuthToken: state.auth.userAuthToken
    };
};


//bring in redux actions
const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password) => dispatch( actionCreators.auth(email, password)),
        onLogout: () => dispatch(actionCreators.authLogout())

    };
};


export default connect(mapStateToProps, mapDispatchToProps)(HomePage);