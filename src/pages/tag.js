import React, { Component } from 'react';
import '../styles/tag.css';
import {caretRight} from 'react-icons-kit/fa/caretRight'
import { Icon } from 'react-icons-kit'
import PhotoTagContainer from '../containers/photoTagContainer'
import { Link } from 'react-router-dom'
import loading from '../images/loading.gif'

class Tag extends Component {
  constructor(props){
    super(props)
    this.state = {
      firstLoading: true
    }
  }

  handleCloseLoading(){
    this.setState({
      firstLoading: false
    })
  }

  render() {
    return (
      <div>
        <nav className="subnav">
          <div className="fluid-subnav-shim">
            <div className="fluid-subnav">
              <div className="subnav-content fluid-centered">
                <ul className="links">
                  <li className="link">
                    <Link to="/"><span>Explore</span></Link>
                  </li>
                  <li className="link selected">
                    <a><span>Trending</span></a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
        <div className="main fluid-centered">
          <div className="title-row">
            <h5>
              <span>Tags</span>
              <span><Icon icon={caretRight} size={16} style={{position: 'relative', top: '3px', margin: '0 7px'}}/></span>
              <span>{this.props.tag ? this.props.tag : this.props.match.params.tagName}</span>
            </h5>
          </div>
          <PhotoTagContainer tagName={this.props.match.params.tagName} onCloseLoading={this.handleCloseLoading.bind(this)}/>
        </div>
        <div className={this.state.firstLoading ? "loading show" : "loading"}>
          <img src={loading} alt="loading" />
        </div>
      </div>
    );
  }
}

export default Tag;
