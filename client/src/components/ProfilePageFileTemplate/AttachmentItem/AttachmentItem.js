import React, {Component} from 'react';
import fileImage from '../../../assets/ProjectPage-icons/filePlaceholder.svg';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import './AttachmentItem.css';



class AttachmentItem extends Component {

    getThumbnail = () => {
        
        if (this.props.hasThumbnail) {
            return this.props.url;
        }
        return fileImage;
    };
    
    render() {
        return(
            <Aux>
                {this.props.editable === true?
                <div className="attachment-item__edit-mode">
                    <img className="attachment-img-placeholder" src={this.getThumbnail()} alt=""/>
                    <div className="attachment-info">
                        <h2 className="attachment-name">{this.props.name}</h2>
                        <h3 className="attachment-desc">{Math.round(this.props.size/1000)} KB</h3>
                    </div>
                    <button className="attachment__delete-button" onClick={() => this.props.deleteAttachmentHandler(this.props.index)}>Delete</button>
                </div>:
                <a className="attachment-link" href={this.props.url} alt="download attachment">
                    <div className="attachment-item">
                        <span className="tooltiptext">Click To Download</span>
                        <img className="attachment-img-placeholder" src={this.getThumbnail()} alt=""/>
                        <div className="attachment-info">
                            <h2 className="attachment-name">{this.props.name}</h2>
                            <h3 className="attachment-desc">{Math.round(this.props.size/1000)} KB</h3>
                        </div>
                    </div>
                </a>}
            </Aux>
        );
    }
}

export default AttachmentItem;