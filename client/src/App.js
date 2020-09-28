import React, { Component } from 'react';
import HomePage from './containers/HomePage/HomePage';
import NavBar from './components/Navigation/NavBar/NavBar'
import SideDrawer from './components/Navigation/SideDrawer/SideDrawer'
import BackDrop from './components/UI/BackDrop/BackDrop'
import {Redirect, Route} from 'react-router-dom';
import AboutPage from './containers/AboutPage/AboutPage'
import RegisterWindow from './components/RegisterWindow/RegisterWindow'
import LogInPage from './containers/LogInPage/LogInPage'
import MyPage from './containers/MyPage/MyPage';
import Footer from './components/Footer/Footer';
import './App.css'

//import relevent redux things
import { connect } from 'react-redux';
import * as actionCreators from './store/actions/index';

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

  componentDidMount() {
      this.props.onAuthFromLocalStorage();
  }


    render() {
    return (
      <div className='App'>
        <NavBar sideDrawerClicked={this.showSideDrawerHandler} />
        <BackDrop show={this.state.showBackDrop} clicked={this.showSideDrawerHandler}/>
        <SideDrawer open={this.state.showSideDrawer} clickItem={this.showSideDrawerHandler} />
        {/* <HomePage /> */}

        <Route path='/home' component={HomePage} />
        <Route path='/about' component={AboutPage} />
        <Route path='/signup' exact component={RegisterWindow}/>
        <Route path='/login' exact component={LogInPage} />
        <Route path='/myfolio' component={MyPage} />
        <Redirect from='/' to='/home' />

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
