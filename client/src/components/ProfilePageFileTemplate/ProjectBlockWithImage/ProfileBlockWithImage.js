import React, {Component} from 'react';
import './ProfileBlockWithImage.css'
import {Link} from 'react-router-dom'

class ProfileBlockWithImage extends Component {
    
    addSlashToEndStringIfRequired = (str) => {
        const lastChar = str[str.length - 1];
        if (lastChar === '/'){
            return str;
        }
        return str + "/";
    }

    render () {
        return(
            <section className="project-block-with-image">
                <div className="project-block-with-image__pic">
                    <a href="#image">
                        <img src={this.props.item.urlThumbnail} alt='img'/>
                    </a>
                </div>
                <div className="project__overview_withImage">
                    <div className="overview__title">
                        <a href="#title">
                            <h1>{this.props.item.title}</h1>
                        </a>
                    </div>

                    <div className="overview__description_withImage">
                        {this.props.item.description}    
                    </div>
                    <div className="overview__see-more">
                        <Link to={this.addSlashToEndStringIfRequired(window.location.pathname) + "projects/"+this.props.item.public_id}>See more</Link>
                    </div>
                </div>
            </section>
        );
    }
}

export default ProfileBlockWithImage; 