import React, {Component} from 'react';
import './EducationHistoryItem.css';

class EducationalHistoryItem extends Component {
    render(){
        return (
            <div className="education-history-item">
                <div className="education-history__pic">
                    <a href="#image">
                        <img src={this.props.image} />
                    </a>
                </div>

                <div className="education-history__info">
                    <div className="overview__title">
                        <a href="#title">
                            <h1>{this.props.school}</h1>
                        </a>
                        <h1>{this.props.duration}</h1>
                    </div>

                    <div className="overview__description">
                        {this.props.description}
                    </div>
                </div>
            </div>
        );
    }
}

export default EducationalHistoryItem;