import React, { Component } from 'react';
import '../styles/tag.css';
import {caretRight} from 'react-icons-kit/fa/caretRight'
import { Icon } from 'react-icons-kit'
import TagContainer from '../containers/tagContainer'
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
          <TagContainer tagName={this.props.match.params.tagName} onCloseLoading={this.handleCloseLoading.bind(this)}/>
          {/*{this.state.noPhoto ?
            <div style={{minHeight: '350px'}}>
              <h4>Không có hình nào được gắn tag &quot;{this.props.tag ? this.props.tag : this.props.match.params.tagName}&quot;</h4>
            </div>
            :
            <InfiniteScroll
              pageStart={0}
              loadMore={this.onLoadMore.bind(this)}
              hasMore={this.props.nextPage > this.state.totalPages ? false : true}
              threshold={100}
              initialLoad={false}
              loader={
              <div className={this.state.isLoading ? "bottom-loading show" : "bottom-loading"} key={0}>
                <img src={botLoading} alt="loading" />
              </div>}>
              <div className="view tag-photos-everyone-view requiredToShowOnServer">
                <div className="all-photo">
                  <h5 className="search-results-header">All Photos Tagged &quot;{this.props.tag}&quot;</h5>
                </div>
                <div className="view photo-list-view" style={this.state.geometry ? {height: this.state.geometry.containerHeight} : {}}>
                  <ReactCSSTransitionGroup
                    transitionName="fade"
                    component="div"
                    className=""
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={300}>
                    {photos && this.state.geometry && !!photos.length && photos.map((item, key) => {
                        return(
                          <Photo info={item} geometry={this.state.geometry.boxes[key]} key={item.id}/>
                        )
                      })
                    }
                  </ReactCSSTransitionGroup>
                </div>
              </div>
            </InfiniteScroll>
          }*/}
        </div>
        {/*<div className={this.state.firstLoading ? "loading show" : "loading"}>
          <img src={loading} alt="loading" />
        </div>*/}
        <div className={this.state.firstLoading ? "loading show" : "loading"}>
          <img src={loading} alt="loading" />
        </div>
      </div>
    );
  }
}

export default Tag;
