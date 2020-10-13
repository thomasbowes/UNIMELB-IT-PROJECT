import React, {Component} from 'react';
import './EducationHistoryItem.css';
import Aux from '../../../../hoc/Auxiliary/Auxiliary'
import EditInfoForm from '../../EditInfoForm/EditInfoForm';

class EducationalHistoryItem extends Component {
    state = {
        itemEditable: false,

        schoolEditable: false,
        durationEditable: false,
        descriptionEditable: false,

    }

    itemEditableHandler = () => {
        this.setState({itemEditable: !this.state.itemEditable})
    }

    render(){
        return (
            <Aux>
                <div className="education-history-item">
                    <div className="education-history__pic">
                        <a href="#image">
                            <img src={this.props.image} alt="education-history"/>
                        </a>
                        {/* {this.state.itemEditable? <button>Edit Image</button>:null} */}
                    </div>

                    <div className="education-history__info">
                        <div className="overview__title">

                            <a href="#title">
                                <h1>{this.props.school}</h1>
                            </a>
                            {this.state.itemEditable? <button onClick={() => this.setState({schoolEditable: true})}>Edit School</button>:null}
                            {this.state.itemEditable && this.state.schoolEditable ? <EditInfoForm />:null}

                            <h1>{this.props.duration}</h1>
                            {this.state.itemEditable? <button onClick={() => this.setState({durationEditable: true})}>Edit Duration</button>:null}
                            {this.state.itemEditable && this.state.durationEditable ? <EditInfoForm />:null}
                        </div>

                        <div className="overview__description">
                            {this.props.description}
                            {this.state.itemEditable? <button onClick={() => this.setState({descriptionEditable: true})}>Edit Description</button>:null}
                            {this.state.itemEditable && this.state.descriptionEditable ? <EditInfoForm />:null}
                        </div>
                    </div>
                </div>
                {this.props.editable? <button onClick={this.itemEditableHandler}>Edit this item</button>:null}
                <div className="horizontal-divider"></div> 
            </Aux>
        );
    }
}

export default EducationalHistoryItem;