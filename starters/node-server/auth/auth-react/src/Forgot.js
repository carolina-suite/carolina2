
import React, { Component } from 'react';

import CarolinaAuth from './lib/CarolinaAuth';

import BootstrapAlert from './lib/bootstrap/Alert';
import BootstrapHeading from './lib/bootstrap/Heading';

class Forgot extends Component {

  constructor(props) {

    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUsername = this.handleUsername.bind(this);
    this.emitLogin = this.emitLogin.bind(this);
    this.state = {
      username: null,
      successMessage: null
    };
  }

  async handleSubmit(e) {

    e.preventDefault();

    this.setState({ successMessage: null });
    var res = await CarolinaAuth.forgotPassword(this.state.username);

    if (res.success) {
      this.setState({ successMessage: res.message });
    }
  }
  handleUsername(e) { this.setState({ username: e.target.value }); }

  emitLogin(e) {

    e.preventDefault();

    this.props.onNavigate('login');
  }

  render() {

    let alert = '';

    if (this.state.successMessage) {
      alert = <BootstrapAlert lead="Great!" message={this.state.successMessage} severity='success' />
    }

    return (
      <form className="form-signin" onSubmit={this.handleSubmit}>

        <BootstrapHeading title="Forgot Password" />

        {alert}

        <p>Go back and <a href='' onClick={this.emitLogin}>sign in</a>.</p>

        <label for="inputUsername" class="sr-only">Username</label>
        <input id="inputUsername" class="form-control" type="text" placeholder="Username" required autofocus value={this.state.username} onChange={this.handleUsername} />

        <button class="btn btn-lg btn-warning btn-block" type="submit">Reset</button>
      </form>
    );
  }
}

export default Forgot;
