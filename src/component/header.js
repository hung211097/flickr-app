import React, { Component } from 'react';
import '../styles/header.css';
import logo from '../images/logo.png'
import {search} from 'react-icons-kit/fa/search'
import {cloudUpload} from 'react-icons-kit/fa/cloudUpload'
import { Icon } from 'react-icons-kit'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'

class Header extends Component {
  constructor(props){
    super(props)
    this.state = {
      keyword: ''
    }
  }

  handleChange(e){
    this.setState({
      keyword: e.target.value
    })
  }

  handleSubmit(e){
    e.preventDefault();
    const {history} = this.props
    if(this.state.keyword !== ''){
      this.setState({
        keyword: ''
      })
      history.push(`/photo/tags/${this.state.keyword.replace(/ /g, "")}`)
    }
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
          <div className="container fluid-centered">
              <Link className="navbar-brand" to="/">
                <img src={logo} alt="logo"/>
              </Link>
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon" />
              </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div className="navbar-nav">
                <Link className="nav-item nav-link nav-hover" to="/">Explore</Link>
                <a className="nav-item nav-link nav-hover">Create</a>
                <a className="nav-item nav-link nav-hover">Get Pro</a>
              </div>
              <div className="pull-right">
                <form className="form-inline" onSubmit={this.handleSubmit.bind(this)}>
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text" id="basic-addon1">
                        <Icon size={20} icon={search} onClick={this.handleSubmit.bind(this)}/>
                      </span>
                    </div>
                    <input className="form-control" onChange={this.handleChange.bind(this)} value={this.state.keyword}
                       placeholder="Photos, people, or groups" aria-label="Username" aria-describedby="basic-addon1" type="text" />
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
      </div>
    );
  }
}

export default withRouter(Header);
