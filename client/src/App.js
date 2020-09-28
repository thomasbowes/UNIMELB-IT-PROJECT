import React, { Component } from 'react';
import HomePage from './containers/HomePage/HomePage';
import NavBar from './components/Navigation/NavBar/NavBar'
import SideDrawer from './components/Navigation/SideDrawer/SideDrawer'
import BackDrop from './components/UI/BackDrop/BackDrop'
import {Redirect, Route} from 'react-router-dom';
import AboutPage from './containers/AboutPage/AboutPage'
import RegisterWindow from './components/RegisterWindow/RegisterWindow'

import LogInSignUpPage from './containers/LogInSignUpPage/LogInSignUpPage'
import UserFolioPage from './containers/UserFolioPage/UserFolioPage';

import Footer from './components/Footer/Footer';
import './App.css'


class App extends Component {
  state = {
    showBackDrop: false,
    showSideDrawer: false,
    showLoginSignUpPage: false
  }

  showSideDrawerHandler = () => {
    this.setState({
      showBackDrop: !this.state.showBackDrop,
      showSideDrawer: !this.state.showSideDrawer
    })
  }

  showLoginSignUpPagehandler = () => {
    this.setState({
      showLoginSignUpPage: !this.state.showLoginSignUpPage
    })
  }



  render() {
    return (
      <div className='App'>
        <NavBar sideDrawerClicked={this.showSideDrawerHandler} loginSignUpclicked={this.showLoginSignUpPagehandler}/>
        <BackDrop show={this.state.showBackDrop} clicked={this.showSideDrawerHandler}/>
        <SideDrawer open={this.state.showSideDrawer} clickItem={this.showSideDrawerHandler} loginSignUpclicked={this.showLoginSignUpPagehandler}/>
        {/* <HomePage /> */}
        {this.state.showLoginSignUpPage? <LogInSignUpPage clickCross={this.showLoginSignUpPagehandler}/>: null }

        <Route path='/home' component={HomePage} />
        <Route path='/about' component={AboutPage} />
        {/* <Route path='/signup' exact component={RegisterWindow}/> */}


        <Route path='/signup' exact component={LogInSignUpPage} />
        <Route path='/userfolio' component={UserFolioPage} />
        <Redirect from='/' to='/home' />

        <Footer />
      </div>
    );
  }
}

export default App;
