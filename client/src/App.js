import React, { Component } from 'react';
import HomePage from './containers/HomePage/HomePage';
import NavBar from './components/Navigation/NavBar/NavBar'
import SideDrawer from './components/Navigation/SideDrawer/SideDrawer'
import BackDrop from './components/UI/BackDrop/BackDrop'
import {Redirect, Route} from 'react-router-dom';
import AboutPage from './containers/AboutPage/AboutPage'

class App extends Component {
  state = {
    showBackDrop: false,
    showSideDrawer: false 
  }

  showSideDrawerHandler = () => {
    this.setState({
      showBackDrop: !this.state.showBackDrop,
      showSideDrawer: !this.state.showSideDrawer
    })
  }



  render() {
    return (
      <div>
        <NavBar sideDrawerClicked={this.showSideDrawerHandler} />
        <BackDrop show={this.state.showBackDrop} clicked={this.showSideDrawerHandler}/>
        <SideDrawer open={this.state.showSideDrawer} clickItem={this.showSideDrawerHandler} />
        {/* <HomePage /> */}

        <Route path='/home' component={HomePage} />
        <Route path='/about' component={AboutPage} />
        <Redirect from='/' to='/home'/>
      </div>
    );
  }
}

export default App;
