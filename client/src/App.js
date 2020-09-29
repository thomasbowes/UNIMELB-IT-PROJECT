import React, { Component } from 'react';
import HomePage from './containers/HomePage/HomePage';
import NavBar from './components/Navigation/NavBar/NavBar'
import SideDrawer from './components/Navigation/SideDrawer/SideDrawer'
import BackDrop from './components/UI/BackDrop/BackDrop'
import {Redirect, Route, Switch} from 'react-router-dom';
import AboutPage from './containers/AboutPage/AboutPage'
import LogInSignUpPage from './containers/LogInSignUpPage/LogInSignUpPage'
import UserFolioPage from './containers/UserFolioPage/UserFolioPage';
import SearchPage from './containers/SearchPage/SearchPage'

import Footer from './components/Footer/Footer';
import './App.css'

//import relevent redux things
import { connect } from 'react-redux';
import * as actionCreators from './store/actions/index';

class App extends Component {
  state = {
    showBackDrop: false,
    showSideDrawer: false,
    showLoginSignUpPage: false,
    loggedIn: true
  }

  showSideDrawerHandler = () => {
    this.setState({
      showBackDrop: true,
      showSideDrawer: !this.state.showSideDrawer
    })
  }

  showLoginSignUpPagehandler = () => {
    this.setState({
      showLoginSignUpPage: !this.state.showLoginSignUpPage,
      showBackDrop: true
    })
  }

  clickBackDrop = () => {
    this.setState({
      showBackDrop: false,
      showLoginSignUpPage: false,
      showSideDrawer: false
    })
  }
  
  componentDidMount() {
      this.props.onAuthFromLocalStorage();
  }



  render() {

    return (
      <div className='App'>
        <NavBar sideDrawerClicked={this.showSideDrawerHandler} loginSignUpclicked={this.showLoginSignUpPagehandler}/>
        <BackDrop show={this.state.showBackDrop} clicked={this.clickBackDrop}/>
        <SideDrawer open={this.state.showSideDrawer} clickItem={this.clickBackDrop} loginSignUpclicked={this.showLoginSignUpPagehandler}/>
        {this.state.showLoginSignUpPage? <LogInSignUpPage clickCross={this.clickBackDrop}/>: null }

        <Switch>
          <Route path='/home' 
            render={(props) => <HomePage {...props} loginSignUpclicked={this.showLoginSignUpPagehandler} loggedIn={this.state.loggedIn}/>
          }/>
          <Route path='/about' component={AboutPage} />
          <Route path='/signup' exact component={LogInSignUpPage} />
          <Route path='/userfolio' component={UserFolioPage} />
          <Route path='/search' component={SearchPage} />
          <Redirect from='/' exact to='/home' />
          <Route render={() => <h1>URL Not found</h1>}/>
        </Switch>

        <Footer />
      </div>
    );
  }
}

//bring in redux state
const mapStateToProps = state => {
    return {
    };
};


//bring in redux actions
const mapDispatchToProps = dispatch => {
    return {
        onAuthFromLocalStorage: () => dispatch( actionCreators.authCheckState()),

    };
};


export default connect(mapStateToProps, mapDispatchToProps)(App);
