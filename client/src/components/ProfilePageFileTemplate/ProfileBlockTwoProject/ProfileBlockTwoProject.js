import React, {Component} from 'react';
import './ProfileBlockTwoProject.css'

class ProfileBlockTwoProject extends Component {
    render (){
        return(
            <section className="project-block-two-project">
                <div className="project__overview">
                    <div className="overview__title">
                        <a href="#title1">
                            <h1>{this.props.titles[0]}</h1>
                        </a>
                    </div>

                    <div className="overview__description">
                        {this.props.texts[0]}
                    </div>
                    <div className="overview__see-more">
                        <a href="#see-more1">See more</a>
                    </div>
                </div>

                <div className="project__overview">
                    <div className="overview__title">
                        <a href="#title2">
                            <h1>{this.props.titles[1]}</h1>
                        </a>
                    </div>

                    <div className="overview__description">
                        {this.props.texts[1]}    
                    </div>
                    <div className="overview__see-more">
                        <a href="#see-more2">See more</a>
                    </div>
                </div>
            </section>
        );
    }
}

export default ProfileBlockTwoProject; 