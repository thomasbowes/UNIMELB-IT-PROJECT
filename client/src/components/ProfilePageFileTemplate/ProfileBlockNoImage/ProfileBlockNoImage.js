import React, {Component} from 'react';
import './ProfileBlockNoImage.css'

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
                        <a href="#see-more">See more</a>
                    </div>
                </div>
            </section>
        );
    }
}

export default ProfileBlockNoImage; 