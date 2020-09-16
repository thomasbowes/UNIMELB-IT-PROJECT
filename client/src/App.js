import React, { Component } from 'react';
import HomePage from './containers/HomePage/HomePage';
import NavBar from './components/Navigation/NavBar/NavBar'
import SideDrawer from './components/Navigation/SideDrawer/SideDrawer'

class App extends Component {

  render() {
    return (
      <div>
        <NavBar />
        <SideDrawer />
        <HomePage />
      </div>
    );
  }
}

export default App;
