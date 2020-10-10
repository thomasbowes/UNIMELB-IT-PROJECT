import React, {Component} from 'react';
import './ProfileBlockNoImage.css'
import {Link} from 'react-router-dom'

class ProfileBlockNoImage extends Component {
    render (){
        return(
            <section className="project-block-no-image">
                <div className="project__overview">
                    <div className="overview__title">
                       
                        <a href="#title">
                            <h1>{this.props.title}</h1>
                        </a>
                    </div>

                    <div className="overview__description">
                        {this.props.text}
                    </div>
                    <div className="overview__see-more">
                        <Link to="/userfolio/projects">See more</Link>
                    </div>
                </div>
            </section>
        );
    }
}

export default ProfileBlockNoImage; 