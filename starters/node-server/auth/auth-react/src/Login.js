
import React, { Component } from 'react';

import CarolinaAuth from './lib/CarolinaAuth';

import BootstrapAlert from './lib/bootstrap/Alert';
import BootstrapHeading from './lib/bootstrap/Heading';

class Login extends Component {

  constructor(props) {

    super(props);

    this.handleUsername = this.handleUsername.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.emitRegister = this.emitRegister.bind(this);
    this.emitForgot = this.emitForgot.bind(this);
    this.state = {
      errorMessage: null,
      username: null,
      password: null
    };
  }

  handleUsername(e) {
    this.setState({ username: e.target.value });
  }
  handlePassword(e) {
    this.setState({ password: e.target.value });
  }
  async handleSubmit(e) {

    e.preventDefault();

    this.setState({ errorMessage: null });

    var res = await CarolinaAuth.login(this.state.username, this.state.password);
    if (!res.success) this.setState({ errorMessage: res.message });
    else this.props.onNext();
  }

  emitRegister(e) {
    e.preventDefault();
    this.props.onNavigate('register');
  }
  emitForgot(e) {
    e.preventDefault();
    this.props.onNavigate('forgot');
  }

  render() {

    let alert =  '';

    if (this.state.errorMessage) alert = <BootstrapAlert lead="Oh No!" message={this.state.errorMessage} severity="danger" />
    return (
      <form className="form-signin" onSubmit={this.handleSubmit}>

        <BootstrapHeading title="Login" />

        <p>Don't have an account? Then please <a href='' onClick={this.emitRegister}>sign up</a>.</p>
        <p>Forget your password? Then please <a href='' onClick={this.emitForgot}>get it reset</a>.</p>

        {alert}

        <label for="inputUsername" class="sr-only">Username</label>
        <input id="inputUsername" class="form-control" type="text" placeholder="Username" required autofocus value={this.state.username} onChange={this.handleUsername} />

        <label for="inputPassword" class="sr-only">Password</label>
        <input id="inputPassword" class="form-control" type="password" placeholder="password" required value={this.state.password} onChange={this.handlePassword} />

        <button class="btn btn-lg btn-primary btn-block" type="submit">Sign In</button>
      </form>
    );
  }
}

export default Login;
