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
        this.setState({itemEditable: !this.state.itemEditable, 
                        schoolEditable: false,
                        durationEditable: false,
                        descriptionEditable: false})
    }

    checkItemEditable = () => {
        return this.props.editable && this.state.itemEditable;
    }

    checkSchoolEditable = () => {
        return this.checkItemEditable() && this.state.schoolEditable;
    }

    checkDurationEditable = () => {
        return this.checkItemEditable() && this.state.durationEditable;
    }

    checkDesEditable = () => {
        return this.checkItemEditable() && this.state.descriptionEditable;
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
                            {this.checkItemEditable() ? <button onClick={() => this.setState({schoolEditable: !this.state.schoolEditable})}>Edit School</button>:null}
                            {this.checkSchoolEditable() ? <EditInfoForm />:null}

                            <h1>{this.props.duration}</h1>
                            {this.checkItemEditable()? <button onClick={() => this.setState({durationEditable: !this.state.durationEditable})}>Edit Duration</button>:null}
                            {this.checkDurationEditable()? <EditInfoForm />:null}
                        </div>

                        <div className="overview__description">
                            {this.props.description}
                            {this.checkItemEditable()? <button onClick={() => this.setState({descriptionEditable: !this.state.descriptionEditable})}>Edit Description</button>:null}
                            {this.checkDesEditable() ? <EditInfoForm />:null}
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