import React, {Component} from 'react';
import './SearchItem.css'
import userImage from '../../../assets/TeamMembers/Thomas.jpg'

class SearchItem extends Component{
    render() {
        return (
            <section className="search-item">
                <div className="search-item__profile-pic">
                    <a href="#search-item__profile-pic">
                        <img src={userImage} alt="user"/>
                    </a>
                </div>

                <div className="search-item__bio">
                    <div className="bio__name">
                        <a href="#bio__name">
                            <h1>Jeff Geofferson</h1>
                        </a>
                    </div>

                    <div className="bio__title">
                        <h2>A mad dog at big boy industries</h2>
                    </div>

                    <div className="bio__about">
                        A dedicated mad dog, pushing the big boy industry to be a welcoming place for all.
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vero incidunt dolores quisquam reiciendis quae perferendis at deleniti minus natus dolorum, laboriosam ea tenetur, fuga sint quis optio praesentium dolore maiores. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vero incidunt dolores quisquam reiciendis quae perferendis at deleniti minus natus dolorum, laboriosam ea tenetur, fuga sint quis optio praesentium dolore maiores. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vero incidunt dolores quisquam reiciendis quae perferendis at deleniti minus natus dolorum, laboriosam ea tenetur, fuga sint quis optio praesentium dolore maiores. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vero incidunt dolores quisquam reiciendis quae perferendis at deleniti minus natus dolorum, laboriosam ea tenetur, fuga sint quis optio praesentium dolore maiores. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vero incidunt dolores quisquam reiciendis quae perferendis at deleniti minus natus dolorum, laboriosam ea tenetur, fuga sint quis optio praesentium dolore maiores. 
                    </div>
                    <div className="bio__see-more">
                        <a href="#bio__see-more">See more</a>
                    </div>
                </div>
            </section>
        );
    }
}

export default SearchItem;