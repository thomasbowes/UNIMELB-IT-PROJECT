import React from "react";
import classes from "./LinkedInShareButton.module.css";
import "../socialShared.css";
import LinkedInIcon from '../../../assets/Homepage-icons/linkedin-icon.svg';

// Social media share button, takes in url of page as prop
const linkedInShareButton = (props) => {

    // Set up linked in url
    let linkedInLink = "https://www.linkedin.com/sharing/share-offsite/?url=";
    
    if (props.profileLink) {
        linkedInLink = linkedInLink.concat(props.profileLink);
    }
  
      
    return (
    <div className={classes.button}>
        <a href={linkedInLink}>
            <img className="icon-sizing" src={LinkedInIcon} alt="Share Your Profile On Twitter" />
        </a>
    </div>
    )
};

export default linkedInShareButton;
