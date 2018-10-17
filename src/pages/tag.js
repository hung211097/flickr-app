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
import { connect } from 'react-redux'
import {addPhotos, updateTag} from '../actions'

const mapStateToProps = ({photosReducer, tagReducer}) => {
    return {
        photos: photosReducer.photos,
        nextPage: photosReducer.nextPage,
        tag: tagReducer.tag
    }
}

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
      geometry: null,
      firstLoading: true,
      noPhoto: false,
    }
  }

  init(){
    this.setState({
      photos: [],
      geometry: null,
      nextPage: 1,
      firstLoading: true,
      noPhoto: false
    })
  }

  componentDidMount(){
    this.loadPhotos(this.props)
  }

  loadPhotos(){
    const {dispatch} = this.props
    this.apiService.getPhotosByTags(this.props.match.params.tagName, this.props.nextPage, 20).then((data) => {
      if(data.length){
        dispatch(addPhotos({photos: data, nextPage: this.props.nextPage + 1}))
        dispatch(updateTag(this.props.match.params.tagName))
        this.setState({
          totalPages: data.totalPages,
          firstLoading: false,
          isLoading: false,
          geometry: justifiedLayout(this.createBoxes(this.props.photos), config),
        })
      }
      else{
        this.setState({
          noPhoto: true,
          firstLoading: false,
          isLoading: false
        })
      }
    })
  }

  onLoadMore() {
    if(!this.state.isLoading){
      this.setState({
        isLoading: true
      })
      this.loadPhotos()
    }
  }

  createBoxes(data){
    return data.map((item) => {
        return {width: +item.width_m, height: +item.height_m}
    })
  }

  render() {
    const {photos} = this.props
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
        <div className={this.state.noPhoto ? "main fluid-centered no-photo" : "main fluid-centered"}>
          <div className="title-row">
            <h5>
              <span>Tags</span>
              <span><Icon icon={caretRight} size={16} style={{position: 'relative', top: '3px', margin: '0 7px'}}/></span>
              <span>{this.props.tag ? this.props.tag : this.props.match.params.tagName}</span>
            </h5>
          </div>
          {this.state.noPhoto ?
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
          }
        </div>
        <div className={this.state.firstLoading ? "loading show" : "loading"}>
          <img src={loading} alt="loading" />
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Tag);
