
import React, { Component } from 'react';

import CarolinaAuth from './lib/CarolinaAuth';

import BootstrapAlert from './lib/bootstrap/Alert';
import BootstrapHeading from './lib/bootstrap/Heading';

class Profile extends Component {

  constructor(props) {

    super(props);

    this.emitEdit = this.emitEdit.bind(this);
    this.emitLogout = this.emitLogout.bind(this);
    this.emitPassword = this.emitPassword.bind(this);
    this.state = {
      profile: null,
      ready: false
    };
  }

  async componentDidMount() {
    var profile = await CarolinaAuth.getProfile();
    this.setState({
      profile: profile,
      ready: true
    });
  }

  emitEdit(e) {

    e.preventDefault();

    this.props.onNavigate('edit');
  }
  emitLogout(e) {

    e.preventDefault();

    CarolinaAuth.logout();

    this.props.onNavigate('logout');
  }
  emitPassword(e) {

    e.preventDefault();

    this.props.onNavigate('password');
  }

  render() {

    if (!this.state.ready) {
      return (
        <p>Fetching profile data...</p>
      );
    }
    else {

      let profileTitle = `Profile ${this.state.profile.username}`;
      let adminTag = '';
      let profileImage = '';
      let profileName = '';
      let profileEmail = '';

      if (this.state.profile.isAdmin) {
        adminTag = <p><span class="badge badge-info">ADMIN ACCOUNT</span></p>
      }
      if (this.state.profile.imageUrl) {
        profileImage = <img class="img img-rounded" src={this.state.profile.imageUrl} />
      }
      if (this.state.profile.name) {
        profileName = <p><b>Name: </b>{this.state.profile.name}</p>
      }
      if (this.state.profile.email) {
        profileEmail = <p><b>Email: </b>{this.state.profile.email}</p>
      }

      return (
        <div class="form-signin">

          <BootstrapHeading title={profileTitle} />

          {adminTag}
          {profileImage}
          {profileName}
          {profileEmail}

          <a class="btn btn-lg btn-info btn-block" href='' onClick={this.emitEdit}>Update Info</a>
          <a class="btn btn-lg btn-warning btn-block" href='' onClick={this.emitPassword}>Change Password</a>
          <a class="btn btn-lg btn-danger btn-block" href='' onClick={this.emitLogout}>Logout</a>
        </div>
      )
    }
  }
}

export default Profile;
