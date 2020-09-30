import React, {Component} from 'react';
import './EducationHistory.css'
import './EducationHistoryItem/EducationHistoryItem'
import EducationalHistoryItem from './EducationHistoryItem/EducationHistoryItem';

class EducationHistory extends Component {
    render (){
        return(
            <section className="education-history">
                <h1 id="heading">Education History</h1>
                <div className="education-history-items">


                    <EducationalHistoryItem 
                        school={this.props.schools[0]} 
                        description={this.props.descriptions[0]} 
                        image={this.props.images[0]}
                        duration={this.props.durations[0]}/>

                    <div className="horizontal-divider"></div>   

                    <EducationalHistoryItem 
                        school={this.props.schools[1]} 
                        description={this.props.descriptions[1]} 
                        image={this.props.images[1]}
                        duration={this.props.durations[1]}/>
                   
                    <div className="horizontal-divider"></div> 

                    <EducationalHistoryItem 
                        school={this.props.schools[2]} 
                        description={this.props.descriptions[2]} 
                        image={this.props.images[2]}
                        duration={this.props.durations[2]}/>
                    
                </div>
            </section>

        );
    }
}

export default EducationHistory; 