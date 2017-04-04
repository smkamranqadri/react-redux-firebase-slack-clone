import React, { Component } from 'react';
import './app.css';

export class App extends Component {
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}
