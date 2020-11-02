import React, {Component} from 'react';
import './SearchItem.css'
import defaultUserImage from '../../../assets/ProfilePageDocuments/defaultUserImage.jpg'
import {Link} from 'react-router-dom';
import ShowMoreText from 'react-show-more-text';

const defaultTitle = ""

class SearchItem extends Component{
    render() {
        return (
            <section className="search-item">
                <div className="search-item__profile-pic">
                    <Link to={"/userfolio/" + this.props.userId} >

                            {this.props.urlProfile === ""?
                                <img src={defaultUserImage} alt="user" />
                            :   <img src={this.props.urlProfile} alt="user"/>}

                    </Link>
                </div>

                <div className="search-item__bio">
                    <div className="bio__name">
                        <Link to={"/userfolio/" + this.props.userId} >
                            <h1>{this.props.name}</h1>
                        </Link>
                    </div>

                    <div className="bio__title">
                        {this.props.title !== "" ? 
                        <h2>{this.props.title}</h2>
                        :<h2>{defaultTitle}</h2>}
                    </div>

                    <div className="bio__about ">
                    {this.props.aboutMe !== "" ? 
                        <ShowMoreText
                        /* Default options */
                        lines={3}
                        more=''
                        less=''
                        anchorClass=''
                        onClick={()=>console.log("easteregg")}
                        expanded={false}
                        
                        >
                            <p>{this.props.aboutMe}</p>
                        </ShowMoreText> 
                        :null}
                    </div>

                    
                    <div className="bio__see-more">
                        <Link to={"/userfolio/" + this.props.userId} >
                            See more
                        </Link>
                    </div>
                </div>
            </section>
        );
    }
}

export default SearchItem;