import React, {Component} from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary'
import './SearchPage.css'
import './SearchItem/SearchItem'
import SearchItem from './SearchItem/SearchItem';

class SearchPage extends Component {

    state = {
        showMore: false
    }

    // If a new search occurs we reset show more
    componentDidUpdate(prevProps) {
        if (prevProps !== this.props && this.state.showMore) {
            this.setState({showMore: false});
        }
        return true;
    }

    // return all the search results in the form of search items
    searchItems = () => {
        if (this.props.location.searchResult === undefined){
            return <h1 className="search_no-found-text">Oops! No result found, try another search term.</h1>;
        }
        const searchResult = this.props.location.searchResult;
        return searchResult.map((item, index) => {
            // Renders a maximum of 10 items if show more is set to false
            if (index < 10 || this.state.showMore) {
            return <SearchItem 
                        userId={item._id}
                        aboutMe={item.aboutMe}
                        firstName={item.firstname}
                        lastName={item.lastname}
                        title={item.title}
                        urlProfile={item.urlProfile}
                        id={item._id}
                        key={item._id}/>
        } else {
            return null;
        }})
    }

    // Sets show more property to true so that we render all items
    showMoreItemsHandler = () => {
        this.setState({showMore: true});
        return;
    }

    // return number of items found
    searchInfo = () => {
        if (this.props.location.searchResult === undefined){
            return null;
        }
        return <div className="search__info">{this.props.location.searchResult.length} results found:</div>
    }
    render(){
        return (
            <Aux>
                {this.searchInfo()}

                <div className="search-list">
                    {this.searchItems()}
                </div>
                {!this.state.showMore && this.props.location.searchResult !== undefined && this.props.location.searchResult.length >10 ? 
                        <div onClick={this.showMoreItemsHandler} className="search__see-more">
                            <h2>Click Here for more search results</h2>
                        </div>
                        :<div onClick={this.showMoreItemsHandler} className="search__see-more"></div>}
            </Aux>
        );

    }
}
export default SearchPage;