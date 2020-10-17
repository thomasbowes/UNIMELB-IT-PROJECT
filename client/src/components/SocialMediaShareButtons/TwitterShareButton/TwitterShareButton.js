import React from "react";
import classes from "./TwitterShareButton.module.css";
import TwitterIcon from '../../../assets/Homepage-icons/twitter-icon.svg';

const twitterShareButton = (props) => {

    let twitterLink = "https://twitter.com/intent/tweet?text=Hi,+look+at+my+portfolio+at+";
    
    if (props.profileLink) {
        twitterLink = twitterLink.concat(props.profileLink);
    }
     
    
    
    
    return (
    <div className={classes.button}>
        <a href={twitterLink}>
            <img src={TwitterIcon} alt="Share Your Profile On Twitter" />
        </a>
    </div>
    )
};

export default twitterShareButton;
