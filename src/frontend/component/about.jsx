import React, { Component } from "react";

export class AboutContainer extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <section className="section about-banner"></section>
        <section className="section about-section">
          <div className="about-container">
            <h1 className="about-title">About Us</h1>
            <p className="about-text"></p>
          </div>
        </section>
      </React.Fragment>
    );
  }
}
