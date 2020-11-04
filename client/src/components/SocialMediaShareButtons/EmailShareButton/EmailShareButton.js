import React from "react";
import classes from "./EmailShareButton.module.css";
import "../socialShared.css";
import mailIcon from '../../../assets/Homepage-icons/mail-icon.svg';

// Social media share button, takes in url of page as prop
const EmailShareButton = (props) => {

    // Set up mailto url
    let mailToLink = "";

    if (props.fromOwner) {
        mailToLink = "mailto:?Subject=Look%20at%20my%20portfolio&Body=Hello%2C%20Please%20checkout%20my%20folio.exchange%20portfolio%20at%20";
    } else {
        mailToLink = "mailto:?Subject=Look%20at%20this%20portfolio&Body=Hello%2C%20Please%20checkout%20my%20folio.exchange%20portfolio%20at%20";
    }

    if (props.profileLink) {
        mailToLink = mailToLink.concat(props.profileLink);
    }
    
    return (
    <div className={classes.button}>
        <a href={mailToLink}>
            <img className="icon-sizing" src={mailIcon} alt="Share Your Profile On Twitter" />
        </a>
    </div>
    )
};

export default EmailShareButton;
