
import React, { Component } from 'react';

import CarolinaAuth from './lib/CarolinaAuth';

import BootstrapAlert from './lib/bootstrap/Alert';
import BootstrapHeading from './lib/bootstrap/Heading';

class Edit extends Component {

  constructor(props) {

    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleName = this.handleName.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handleImageUrl = this.handleImageUrl.bind(this);
    this.emitProfile = this.emitProfile.bind(this);
    this.state = {
      username: null,
      name: null,
      email: null,
      imageUrl: null
    };
  }

  async componentDidMount() {
    let profile = await CarolinaAuth.getProfile();
    this.setState({
      name: profile.name,
      email: profile.email,
      imageUrl: profile.imageUrl
    });
  }

  async handleSubmit(e) {

    e.preventDefault();

    await CarolinaAuth.updateProfile({
      name: this.state.name,
      email: this.state.email,
      imageUrl: this.state.imageUrl
    });

    this.props.onNavigate('profile');
  }
  handleName(e) { this.setState({ name: e.target.value }); }
  handleEmail(e) { this.setState({ email: e.target.value }); }
  handleImageUrl(e) { this.setState({ imageUrl: e.target.value }); }

  emitProfile(e) {

    e.preventDefault();

    this.props.onNavigate('profile');
  }

  render() {
    return (
      <form className="form-signin" onSubmit={this.handleSubmit}>

        <BootstrapHeading title="Edit Profile" />

        <label for="inputEmail" class="sr-only">Email Address</label>
        <input id="inputEmail" class="form-control" type="email" placeholder="email@example.com" autofocus value={this.state.email} onChange={this.handleEmail} />

        <label for="inputName" class="sr-only">Name</label>
        <input id="inputName" class="form-control" type="text" placeholder="Your Name" value={this.state.name} onChange={this.handleName} />

        <label for="inputImageUrl" class="sr-only">Image Url</label>
        <input id="inputImageUrl" class="form-control" type="text" placeholder="http://example.com/image.png" value={this.state.imageUrl} onChange={this.handleImageUrl} />

        <button class="btn btn-lg btn-warning btn-block" type="submit">Update</button>
        <a class="btn btn-lg btn-secondary btn-block" href='' onClick={this.emitProfile}>Cancel</a>
      </form>
    );
  }
}

export default Edit;
