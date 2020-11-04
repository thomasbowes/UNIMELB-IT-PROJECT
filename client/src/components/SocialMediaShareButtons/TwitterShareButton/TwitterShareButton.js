import React from "react";
import classes from "./TwitterShareButton.module.css";
import "../socialShared.css";
import TwitterIcon from '../../../assets/Homepage-icons/twitter-icon.svg';

// Social media share button, takes in url of page as prop
const twitterShareButton = (props) => {

    let twitterLink = "";

    // Set up tweet url
    if (props.fromOwner) {
        twitterLink = "https://twitter.com/intent/tweet?text=Hi,+look+at+my+portfolio+at+";
    } else {
        twitterLink = "https://twitter.com/intent/tweet?text=Hi,+look+at+this+portfolio+at+";
    }

    if (props.profileLink) {
        twitterLink = twitterLink.concat(props.profileLink);
    }  
    
    return (
    <div className={classes.button}>
        <a href={twitterLink}>
            <img className="icon-sizing" src={TwitterIcon} alt="Share Your Profile On Twitter" />
        </a>
    </div>
    )
};

export default twitterShareButton;
