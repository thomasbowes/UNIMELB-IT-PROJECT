import React from "react";
import classes from "./TwitterShareButton.module.css";
import TwitterIcon from '../../../assets/Homepage-icons/twitter-icon.svg';

const twitterShareButton = (props) => {

    let mailToLink = "mailto:?Subject=Look%20at%20my%20portfolio&Body=Hello%2C%20Please%20checkout%20my%20folio.exchange%20portfolio%20at%20";
    
    if (props.profileLink) {
        mailToLink = mailToLink.concat(props.profileLink);
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
