
import React, { Component } from 'react';

class BootstrapAlert extends Component {
  render() {
    return (
      <div className={'alert alert-' + this.props.severity}>
        <b>{this.props.lead} </b>
        {this.props.message}
      </div>
    );
  }
}

export default BootstrapAlert;
