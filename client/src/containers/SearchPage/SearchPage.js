import React, {Component} from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary'
import './SearchItem/SearchItem'
import SearchItem from './SearchItem/SearchItem';

class SearchPage extends Component {

    cssName = () => {
        if (true) {
            return import('./SearchPage.css')
        }
        else{
            return import('./SearchPage.css')
        }
      };

    render(){
        this.cssName();
        return (
            <Aux>
                <div className="search__info">Showing 10 of 1009 results:</div>

                <div className="search-list">
                    <SearchItem />
                    <SearchItem />
                    <SearchItem />
                    <SearchItem />
                    <SearchItem />
                    <SearchItem />
                    <SearchItem />
                    <SearchItem />
                    <SearchItem />
                    <SearchItem />
                </div>




                <div className="page-selector">
                    <div className="page-selector__next-previous"> Previous</div>
                    <div className="page-selector__page-numbers">
                        <div className="page-selector__page-number page-selector__current">1</div>
                        <div className="page-selector__page-number">2</div>
                        <div className="page-selector__page-number">3</div>
                        <div className="page-selector__page-number">4</div>
                        <div className="page-selector__page-number">5</div>
                    </div>
                    <div  className="page-selector__next-previous">Next </div>

                </div>
            </Aux>
        );

    }
}

export default SearchPage;