import React, {Component} from 'react';
import './ProjectOverviewBlock.css'
import {Link} from 'react-router-dom'
import ShowMoreText from 'react-show-more-text';
import Aux from '../../../hoc/Auxiliary/Auxiliary'
import EditIcon from '../../../assets/EditIcons/edit.svg';

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
                
            <div className="project__overview_withImage">
                <div className="overview__title">
                    <a href="#title">
                        <h1>{this.props.item.title}</h1>
                    </a>
                </div>

                
                <ShowMoreText
                    /* Default options */
                    lines={7}
                    more=''
                    less=''
                    anchorClass=''
                    onClick={()=>console.log("easteregg")}
                    expanded={false}
                >
                <div className="overview__description_withImage">  
                    {this.props.item.description}    
                
                </div>
                </ShowMoreText> 

                
                <div className="overview__see-more">
                    <Link to={this.addSlashToEndStringIfRequired(window.location.pathname) + "projects/"+this.props.item._id}>See more</Link>
                </div>

                {this.props.hasEditingRight? 
                    <Aux>
                        <input className="overview-item_edit" type="image" src={EditIcon} onClick={this.itemEditableHandler} alt="edit"/>
                    </Aux> 
                    :null}
            </div>
            </section>
        );
    }
}

export default ProfileBlockWithImage; 