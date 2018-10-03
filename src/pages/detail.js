import React, { Component } from 'react';
import '../styles/detail.css';
import ApiService from '../services/api.services'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import {arrowLeft} from 'react-icons-kit/fa/arrowLeft'
import {copyright} from 'react-icons-kit/fa/copyright'
import {questionCircleO} from 'react-icons-kit/fa/questionCircleO'
import {plus} from 'react-icons-kit/fa/plus'
import { Icon } from 'react-icons-kit'
import {getAvatar} from '../services/utils.services'
import format from 'date-fns/format'

class Detail extends Component {
  constructor(props){
    super(props)
    this.apiService = ApiService()
    this.state = {
      photo: null,
      user: null
    }
  }

  componentDidMount(){
    this.apiService.getInfoPhoto(this.props.match.params.id).then((data) => {
      this.setState({
        photo: data
      })
      this.apiService.getInfoUser(data.userid).then((userInfo) => {
        this.setState({
          user: userInfo
        })
      })
    })
  }

  render() {
    console.log(this.state);
    return(
      <div>
        <div className="view photo-well-scrappy-view">
          <div className="height-controller enable-zoom">
            <div className="view photo-well-media-scrappy-view">
              <div className="photo-zoom">
                <span className="facade-of-protection-neue">
                  <div className="view zoom-view"></div>
                </span>
                {this.state.photo &&
                  <img className="main-photo" alt="img" src={this.state.photo.source}/>
                }
              </div>
            </div>
            <Link to="/" className="entry-type do-not-evict no-outline">
              <Icon icon={arrowLeft} size={16} />
              <span>Back to explore</span>
            </Link>
          </div>
        </div>
        <div className="view sub-photo-view">
          <div className="sub-photo-container centered-content">
            <div className="view sub-photo-left-view">
              <div className="view attribution-view clear-float photo-attribution">
                {this.state.user &&
                  <div className="avatar person medium" style={{backgroundImage: `url(${getAvatar(this.state.user)})`}}></div>
                }
                <a className="pro-badge-inline">{this.state.user && this.state.user.ispro ? 'PRO' : ''}</a>
                <div className="attribution-info">
                  <a className="owner-name truncate">{this.state.photo ? this.state.photo.username : ''}</a>
                  <div className="view follow-view clear-float photo-attribution">
                    <button className="btn btn-primary unfluid follow ui-button ui-button-icon">
                      <span>
                        <Icon icon={plus} size={20}  style={{position: 'relative', top:'5px', left: '-7px'}}/>
                        Follow
                      </span>
                    </button>
                  </div>
                </div>
              </div>
              <div className="view sub-photo-title-desc-view">
                <div className="title-desc-block  showFull">
                  <h1 className="meta-field photo-title">{this.state.photo ? this.state.photo.title : ''}</h1>
                  <h2 className="meta-field photo-desc">
                    {this.state.photo &&
                      <p>{this.state.photo.description}</p>
                    }
                    {/*<p>OBSERVE Collective</p>
                    <p>All images are © Copyrighted and All Rights Reserved</p>*/}
                  </h2>
                </div>
              </div>
            </div>
            <div className="view sub-photo-right-view">
              {this.state.photo &&
                <div className="sub-photo-right-row1">
                  <div className="view sub-photo-right-stats-view">
                    <div className="view-count">
                      <span className="view-count-label">{this.state.photo.views}</span>
                      <span className="stats-label">views</span>
                    </div>
                    <div className="comment-count">
                      <span className="comment-count-label">{this.state.photo.comments}</span>
                      <span className="stats-label">comments</span>
                    </div>
                  </div>
                  <div className="view sub-photo-date-view">
                    <div className="date-taken clear-float ">
                      <span className="date-taken-label">
                        Taken on&nbsp;
                        {this.state.photo &&
                         format(new Date(this.state.photo.create_on), 'MMMM D, YYYY')
                        }
                      </span>
                    </div>
                  </div>
                  <div className="view photo-license-view">
                    <div className="photo-license-info">
                      <a className="photo-license-url">
                        <span>
                          <Icon icon={copyright} size={25} style={{position: 'relative', top: '7px', marginRight: '5px'}}/>
                          All rights reserved
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
              }
              <div className="view sub-photo-tags-view">
                <div className="view sub-photo-tags-tag-view ">
                  <a className="tag-section-header">Tags</a>
                  <span className="autotags-helper">
                    <Icon icon={questionCircleO} size={16} className="autotags-helper-icon" style={{position: 'relative', top: '4px'}}/>
                  </span>
                  <ul className="tags-list">
                    {this.state.photo && this.state.photo.tags.map((item) => {
                        return(
                          <li className="tag" ley={item.id}>
                            <a>{item.raw}</a>
                          </li>
                        )
                      })
                    }
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Detail);