
import React, { Component } from 'react';

import CarolinaAuth from './lib/CarolinaAuth';

import BootstrapAlert from './lib/bootstrap/Alert';
import BootstrapHeading from './lib/bootstrap/Heading';

class Register extends Component {

  constructor(props) {

    super(props);

    this.handleUsername = this.handleUsername.bind(this);
    this.handlePassword1 = this.handlePassword1.bind(this);
    this.handlePassword2 = this.handlePassword2.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.emitLogin = this.emitLogin.bind(this);
    this.state = {
      username: null,
      password1: null,
      password2: null,
      email: null,
      errorMessage: null,
      successMessage: null
    };
  }

  handleUsername(e) { this.setState({ username: e.target.value }); }
  handlePassword1(e) { this.setState({ password1: e.target.value }); }
  handlePassword2(e) { this.setState({ password2: e.target.value }); }
  handleEmail(e) { this.setState({ email: e.target.value }); }
  async handleSubmit(e) {

    e.preventDefault();

    this.setState({
      errorMessage: null,
      successMessage: null
    });

    if (this.state.password1 != this.state.password2) {

      this.setState({ errorMessage: "Passwords do not match." });

      return;
    }
    else {
      var res = await CarolinaAuth.register(this.state.username, this.state.email, this.state.password1)
      if (!res.success) this.setState({ errorMessage: res.message });
      else this.setState({ successMessage: "Registration successful. Click above to sign in." });
    }
  }

  emitLogin(e) {

    e.preventDefault();

    this.props.onNavigate('login');
  }

  render() {

    let alert =  '';

    if (this.state.errorMessage) alert = <BootstrapAlert lead="Oh No!" message={this.state.errorMessage} severity="danger" />
    else if (this.state.successMessage) alert = <BootstrapAlert lead="Great!" message={this.state.successMessage} severity="success" />

    return (
      <form className="form-signin" onSubmit={this.handleSubmit}>

        <BootstrapHeading title="Register" />

        <p>Already have an account? <a href='' onClick={this.emitLogin}>sign in</a>.</p>

        {alert}

        <label for="inputUsername" class="sr-only">Username</label>
        <input id="inputUsername" class="form-control" type="text" placeholder="Username" required autofocus value={this.state.username} onChange={this.handleUsername} />

        <label for="inputEmail" class="sr-only">E-Mail Address (optional)</label>
        <input id="inputEmail" class="form-control" type="email" placeholder="Email Address" autofocus value={this.state.email} onChange={this.handleEmail} />

        <label for="inputPassword" class="sr-only">Password</label>
        <input id="inputPassword" class="form-control" type="password" placeholder="password" required autofocus value={this.state.password1} onChange={this.handlePassword1} />

        <label for="inputPassword2" class="sr-only">Confirm Password</label>
        <input id="inputPassword2" class="form-control" type="password" placeholder="confirm password" required autofocus value={this.state.password2} onChange={this.handlePassword2} />

        <button class="btn btn-lg btn-primary btn-block" type="submit">Sign Up</button>
      </form>
    );
  }
}

export default Register;
