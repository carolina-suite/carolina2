
import React, { Component } from 'react';

import CarolinaAuth from './lib/CarolinaAuth';

import BootstrapAlert from './lib/bootstrap/Alert';
import BootstrapHeading from './lib/bootstrap/Heading';

class Password extends Component {

  constructor(props) {

    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleOldPassword = this.handleOldPassword.bind(this);
    this.handleNewPassword = this.handleNewPassword.bind(this);
    this.emitProfile = this.emitProfile.bind(this);
    this.state = {
      oldPassword: '',
      newPassword: '',
      errorMessage: null
    };
  }

  async handleSubmit(e) {

    e.preventDefault();

    this.setState({ errorMessage: null });
    var res = await CarolinaAuth.updatePassword(this.state.oldPassword, this.state.newPassword);
    if (!res.success) this.setState({ errorMessage: res.message });
    else this.props.onNavigate('profile');
  }
  handleOldPassword(e) { this.setState({ oldPassword: e.target.value }); }
  handleNewPassword(e) { this.setState({ newPassword: e.target.value }); }

  emitProfile(e) {

    e.preventDefault();

    this.props.onNavigate('profile');
  }

  render() {

    let alert = '';

    if (this.state.errorMessage) {
      alert = <BootstrapAlert lead="Oh No!" message={this.state.errorMessage} severity='danger' />
    }

    return (
      <form className="form-signin" onSubmit={this.handleSubmit}>

        <BootstrapHeading title="Update Password" />

        {alert}

        <label for="inputOldPassword" class="sr-only">Current Password</label>
        <input id="inputOldPassword" class="form-control" type="password" placeholder="currentpassword" required autofocus value={this.state.oldPassword} onChange={this.handleOldPassword} />

        <label for="inputNewPassword" class="sr-only">New Password</label>
        <input id="inputNewPassword" class="form-control" type="password" placeholder="newpassword" required value={this.state.newPassword} onChange={this.handleNewPassword} />

        <button class="btn btn-lg btn-info btn-block" type="submit">Update</button>
      </form>
    );
  }
}

export default Password;
