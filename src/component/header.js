import React, { Component } from 'react';
import '../styles/header.css';
import logo from '../images/logo.png'
import {search} from 'react-icons-kit/fa/search'
import {cloudUpload} from 'react-icons-kit/fa/cloudUpload'
import { Icon } from 'react-icons-kit'

class Header extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <div className="container fluid-centered">
          <a className="navbar-brand">
            <img src={logo} alt="logo"/>
          </a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <a className="nav-item nav-link nav-hover">Explore</a>
              <a className="nav-item nav-link nav-hover">Create</a>
              <a className="nav-item nav-link nav-hover">Get Pro</a>
            </div>
            <div className="pull-right">
              <form className="form-inline">
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1">
                      <Icon size={20} icon={search} />
                    </span>
                  </div>
                  <input className="form-control" placeholder="Photos, people, or groups" aria-label="Username" aria-describedby="basic-addon1" type="text" />
                </div>
              </form>
              <a className="signup nav-item nav-link">
                <button className="btn btn-primary">Sign Up</button>
              </a>
              <a className="signin nav-hover">
                <span>Log In</span>
              </a>
              <a className="upload nav-hover">
                <Icon size={35} icon={cloudUpload} style={{color: 'white'}}/>
              </a>
            </div>
          </div>
        </div>
      </nav>
        <nav className="subnav">
          <div className="fluid-subnav-shim">
            <div className="fluid-subnav">
              <div className="subnav-content fluid-centered">
                <ul className="links">
                  <li className="link selected">
                    <a><span>Explore</span></a>
                  </li>
                  <li className="link">
                    <a><span>Trending</span></a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default Header;
