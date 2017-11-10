
import React, { Component } from 'react';

class BootstrapHeading extends Component {
  render() {
    return (
      <h2 className="form-signin-heading">{this.props.title}</h2>
    );
  }
}

export default BootstrapHeading;
