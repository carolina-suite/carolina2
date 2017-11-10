
import React, { Component } from 'react';
import CarolinaAuth from './lib/CarolinaAuth';

class Checking extends Component {

  async componentDidMount() {
    var check = await CarolinaAuth.authCheck();
    if (check) this.props.onNavigate('profile');
    else this.props.onNavigate('login');
  }

  render() {
    return (
      <p>Checking login status...</p>
    );
  }
}

export default Checking;
