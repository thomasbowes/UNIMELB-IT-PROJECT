import React, {Component} from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary'
import './SearchPage.css'
import './SearchItem/SearchItem'
import SearchItem from './SearchItem/SearchItem';

class SearchPage extends Component {

    // return all the search results in the form of search items
    searchItems = () => {
        if (this.props.location.searchResult === undefined){
            return <h1>Oops! No result found...</h1>;
        }
        const searchResult = this.props.location.searchResult;
        return searchResult.map((item) => {
            return <SearchItem 
                        userId={item._id}
                        aboutMe={item.aboutMe}
                        email={item.email}
                        firstName={item.firstname}
                        lastName={item.lastname}
                        title={this.title}
                        urlProfile={this.urlProfile}
                        id={item._id}/>
        })
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
                {/* <div className="search__info">Showing 10 of 1009 results:</div> */}

                {this.searchInfo()}

                <div className="search-list">
                    {this.searchItems()}
                </div>


                {/* <div className="page-selector">
                    <div className="page-selector__next-previous"> Previous</div>
                    <div className="page-selector__page-numbers">
                        <div className="page-selector__page-number page-selector__current">1</div>
                        <div className="page-selector__page-number">2</div>
                        <div className="page-selector__page-number">3</div>
                        <div className="page-selector__page-number">4</div>
                        <div className="page-selector__page-number">5</div>
                    </div>
                    <div  className="page-selector__next-previous">Next </div>
                </div> */}
            </Aux>
        );

    }
}

export default SearchPage;