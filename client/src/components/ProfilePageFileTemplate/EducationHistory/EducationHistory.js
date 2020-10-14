import React, {Component} from 'react';
import './EducationHistory.css'
import './EducationHistoryItem/EducationHistoryItem'
import EducationalHistoryItem from './EducationHistoryItem/EducationHistoryItem';

class EducationHistory extends Component {

    state = {editable: false}

    editableHandler = () =>{
        let oldEditable = this.state.editable 
        this.setState({editable: !oldEditable})
    }



    render (){

        const allItemsArray = this.props.ids.map((id, index) => {
            return <EducationalHistoryItem 
                    school={this.props.schools[index]} 
                    description={this.props.descriptions[index]} 
                    image={this.props.images[index]}
                    duration={this.props.durations[index]}
                    editable={this.state.editable}
                    key={index}/>
        })

        return(
            <section className="education-history">
                <h1 id="heading">Education History</h1>
                <p>editable:{this.state.editable.toString()}</p>
                {this.state.editable? <button onClick={this.editableHandler}>Done</button> 
                                    : <button onClick={this.editableHandler}>Edit</button>}
                <div className="education-history-items">


                    {/* <EducationalHistoryItem 
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
                        duration={this.props.durations[2]}/> */}
                    {allItemsArray}
                    
                </div>
            </section>

        );
    }
}

export default EducationHistory; 