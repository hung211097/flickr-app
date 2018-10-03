import React, { Component } from 'react';
import '../styles/tag.css';
import ApiService from '../services/api.services'
import {Photo} from '../component/index'
import {caretRight} from 'react-icons-kit/fa/caretRight'
import { Icon } from 'react-icons-kit'
import loading from '../images/loading.gif'
import botLoading from '../images/bot-loading.gif'
import justifiedLayout from 'justified-layout';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { Link } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroller';

const config = {
  containerWidth: 1087,
  containerPadding: 0,
  boxSpacing: {
     horizontal: 5,
     vertical: 5
  }
}

class Tag extends Component {
  constructor(props){
    super(props)
    this.apiService = ApiService()
    this.state = {
      photos: [],
      geometry: null,
      nextPage: 1,
      firstLoading: true
    }
  }

  init(){
    this.setState({
      photos: [],
      geometry: null,
      nextPage: 1,
      firstLoading: true
    })
  }

  loadPhotos(props){
    this.apiService.getPhotosByTags(props.match.params.tagName, this.state.nextPage, 20).then((data) => {
      this.setState({
        photos: [...this.state.photos, ...data],
        geometry: justifiedLayout(this.createBoxes([...this.state.photos, ...data]), config),
        nextPage: this.state.nextPage + 1,
        firstLoading: false,
        isLoading: false
      })
    })
  }

  onLoadMore() {
    if(!this.state.isLoading){
      this.setState({
        isLoading: true
      })
      this.loadPhotos(this.props)
    }
  }

  createBoxes(data){
    return data.map((item) => {
        return {width: +item.width_m, height: +item.height_m}
    })
  }

  UNSAFE_componentWillReceiveProps(props){
    this.setState({
      firstLoading: true
    })
    this.init()
    this.loadPhotos(props)
  }

  render() {
    const {photos} = this.state
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
              <span>{this.props.match.params.tagName}</span>
            </h5>
          </div>
          <InfiniteScroll
            pageStart={0}
            loadMore={this.onLoadMore.bind(this)}
            hasMore={this.state.nextPage > this.state.totalPages ? false : true}
            threshold={100}
            loader={
            <div className={this.state.isLoading ? "bottom-loading show" : "bottom-loading"}>
              <img src={botLoading} alt="loading" />
            </div>}>
            <div className="view tag-photos-everyone-view requiredToShowOnServer">
              <div className="all-photo">
                <h5 className="search-results-header">All Photos Tagged &quot;{this.props.match.params.tagName}&quot;</h5>
              </div>
              <div className="view photo-list-view" style={this.state.geometry ? {height: this.state.geometry.containerHeight} : {}}>
                <ReactCSSTransitionGroup
                  transitionName="fade"
                  component="div"
                  className=""
                  transitionEnterTimeout={500}
                  transitionLeaveTimeout={300}>
                  {!!photos.length && photos.map((item, key) => {
                      return(
                        <Photo info={item} geometry={this.state.geometry.boxes[key]} key={key}/>
                      )
                    })
                  }
                </ReactCSSTransitionGroup>
              </div>
            </div>
          </InfiniteScroll>
        </div>
        <div className={this.state.firstLoading ? "loading show" : "loading"}>
          <img src={loading} alt="loading" />
        </div>
      </div>
    );
  }
}

export default Tag;
