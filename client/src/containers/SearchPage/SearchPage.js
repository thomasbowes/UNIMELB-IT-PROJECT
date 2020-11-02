import React, {Component} from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary'
import './SearchPage.css'
import './SearchItem/SearchItem'
import SearchItem from './SearchItem/SearchItem';

class SearchPage extends Component {

    state = {
        showNumItems: 10
    }

    // If a new search occurs we reset show num items to 10
    componentDidUpdate(prevProps) {
        if (prevProps !== this.props && this.state.showNumItems>10) {
            this.setState({showNumItems: 10});
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

            // Renders only showNumItems amount ofitems
            if (index < this.state.showNumItems) {
                return <SearchItem 
                            userId={item.user_id}
                            aboutMe={item.aboutMe}
                            name={item.name}
                            title={item.title}
                            urlProfile={item.urlProfile}
                            id={item.user_id}
                            key={item.user_id}/>
            } else {
                return null;
            }});
    }

    // Sets show num items property to show 10 additional items
    addshowNumItemsHandler = () => {
        this.setState({showNumItems: this.state.showNumItems + 10});
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

                {this.props.location.searchResult !== undefined && this.state.showNumItems < this.props.location.searchResult.length ? 
                        <div onClick={this.addshowNumItemsHandler} className="search__see-more">
                            <h2>Click Here for more search results</h2>
                        </div>
                        :<div className="search__see-more"></div>}
            </Aux>
        );

    }
}
export default SearchPage;