import React, {Component} from 'react';
import './ProjectOverviewBlock.css'
import '../../../containers/UserFolioPage/profileShared.css';
import {Link} from 'react-router-dom'
import ShowMoreText from 'react-show-more-text';
import Aux from '../../../hoc/Auxiliary/Auxiliary'
import EditIcon from '../../../assets/EditIcons/edit.svg';

// Generates an overview of each project item to display on main page
class ProjectOverviewBlock extends Component {
    
    // Ensures urls end with a slash for routing to work correctly
    addSlashToEndStringIfRequired = (str) => {
        const lastChar = str[str.length - 1];
        if (lastChar === '/'){
            return str;
        }
        return str + "/";
    }

    render () {
        return(
            <section className="profile-item">

                    {/*Links user to the corresponding project page*/}
                    <Link style={{textDecoration: "none"}} to={this.addSlashToEndStringIfRequired(window.location.pathname) + "projects/"+this.props.item._id + "/view"}>
                        <h1 id="heading_no-bottom-margin" style={{fontSize: "1.375rem"}}>{this.props.item.title}</h1>
                    </Link>
                    
                    {/*Prints out first 7 lines of project description*/}
                    <div className="profile-item__main-text-nowrap"> 
                        <ShowMoreText
                            lines={7}
                            more=''
                            less=''
                            anchorClass=''
                            onClick={()=>console.log("easteregg")}
                            expanded={false}
                        >
                            <div className="profile-item__main-text">  
                                {this.props.item.description}    
                            
                            </div>
                        </ShowMoreText> 
                    </div>
                    
                    <div className="project-block__white-space"></div>

                    {/*Links user to the corresponding project page*/}
                    <div className="project-block__see-more">
                        <Link to={this.addSlashToEndStringIfRequired(window.location.pathname) + "projects/"+this.props.item._id+ "/view"}>See more</Link>
                    </div>

                    {/*Links user to editing mode of the corresponding project page*/}
                    {this.props.hasEditingRight? 
                        <Aux>
                            <Link to={this.addSlashToEndStringIfRequired(window.location.pathname) + "projects/"+this.props.item._id+ "/edit"}>
                                <input className="profile-item__edit" type="image" src={EditIcon} onClick={this.itemEditableHandler} alt="edit"/>
                            </Link>
                        </Aux> 
                        :null}
                
            </section>
        );
    }
}

export default ProjectOverviewBlock; 