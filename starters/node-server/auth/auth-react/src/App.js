
import React, { Component } from 'react';

import Checking from './Checking';
import Edit from './Edit';
import Forgot from './Forgot';
import Login from './Login';
import Password from './Password';
import Profile from './Profile';
import Register from './Register';

class App extends Component {

  constructor(props) {

    super(props)

    this.handleNavigation = this.handleNavigation.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.state = {
      status: 'checking'
    };
  }

  handleNavigation(loc) {
    this.setState({ status: loc });
  }
  handleNext() {
    var nextPage = window.localStorage.getItem('carolinaNext');
    if (nextPage != null) {
      window.localStorage.removeItem('carolinaNext');
      window.location = nextPage;
    }
    else {
      this.handleNavigation('profile');
    }
  }

  render() {
    switch(this.state.status) {
      case 'checking':
        return <div class="container"><Checking onNavigate={this.handleNavigation}/></div>
      case 'edit':
        return <div class="container"><Edit onNavigate={this.handleNavigation}/></div>
      case 'forgot':
        return <div class="container"><Forgot onNavigate={this.handleNavigation}/></div>
      case 'login':
        return <div class="container"><Login onNavigate={this.handleNavigation} onNext={this.handleNext} /></div>
      case 'password':
        return <div class="container"><Password onNavigate={this.handleNavigation} /></div>
      case 'profile':
        return <div class="container"><Profile onNavigate={this.handleNavigation} /></div>
      case 'register':
        return <div class="container"><Register onNavigate={this.handleNavigation} /></div>
      default:
        return <div class="container"><Checking onNavigate={this.handleNavigation} /></div>
    }
  }
}

export default App;
