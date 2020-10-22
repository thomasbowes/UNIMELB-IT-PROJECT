import React, {Component} from 'react';
import './SearchItem.css'
import defaultUserImage from '../../../assets/ProfilePageDocuments/defaultUserImage.jpg'
import {Link} from 'react-router-dom';

const defaultTitle = "Title not added"

class SearchItem extends Component{
    render() {
        return (
            <section className="search-item">
                <div className="search-item__profile-pic">
                    <a href="#search-item__profile-pic">
                        {this.props.urlProfile === undefined?
                            <img src={defaultUserImage} alt="user" />
                        :   <img src={this.props.urlProfile} alt="user"/>}
                    </a>
                </div>

                <div className="search-item__bio">
                    <div className="bio__name">
                        <a href="#bio__name">
                            <h1>{this.props.firstName + " " + this.props.lastName}</h1>
                        </a>
                    </div>

                    <div className="bio__title">
                        {this.props.title === undefined ? 
                            <h2>{defaultTitle}</h2>
                        :   <h2>{this.props.title}</h2>}
                    </div>

                    <div className="bio__about">
                        {"Email: " + this.props.email}
                    </div>
                    <div className="bio__see-more">
                        <Link to={"/userfolio/" + this.props.userId} >
                            <a href="#bio__see-more">See more</a>
                        </Link>
                    </div>
                </div>
            </section>
        );
    }
}

export default SearchItem;