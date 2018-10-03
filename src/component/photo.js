import React, { Component } from 'react';
import '../styles/photo.css'
import { Link } from 'react-router-dom'

class Photo extends Component {
  render() {
    return (
      <Link to={'/photo/' + this.props.info.id}>
        <div className="photo-view" style={{...this.props.geometry}}>
          <div className="interaction-view">
            <div className="photo-list-photo-interaction">
              <span className="overlay"> </span>
              <div className="interaction-bar">
                <div className="text">
                  <span className="title">{this.props.info.title}</span>
                  <span className="attribution">by {this.props.info.ownername} - {this.props.info.views} views</span>
                </div>
              </div>
            </div>
          </div>
          <img src={this.props.info.url_m} alt="img" />
        </div>
    </Link>
    );
  }
}

export default Photo;
