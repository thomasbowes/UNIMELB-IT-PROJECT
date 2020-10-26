import React from "react";
import classes from "./FacebookShareButton.module.css";
import "../socialShared.css";
import FacebookIcon from '../../../assets/Homepage-icons/facebook-icon.svg';

const facebookShareButton = (props) => {
    let facebookLink = "https://www.facebook.com/sharer/sharer.php?u=";
    
    if (props.profileLink) {
        facebookLink = facebookLink.concat(props.profileLink);
    }
  
      
    return (
    <div className={classes.button}>
        <a href={facebookLink}>
            <img className="icon-sizing" src={FacebookIcon} alt="Share Your Profile On Twitter" />
        </a>
    </div>
    )
};

export default facebookShareButton;
