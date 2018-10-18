import React, { Component } from 'react';
import ApiService from '../services/api.services'
import {Photo} from '../component/index'
import botLoading from '../images/bot-loading.gif'
import justifiedLayout from 'justified-layout';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
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

class TagContainer extends Component {
  constructor(props){
    super(props)
    this.apiService = ApiService()
    this.state = {
      geometry: null,
      noPhoto: false,
    }
  }

  componentDidMount(){
    const {dispatch} = this.props
    this.apiService.getPhotosByTags(this.props.tagName, this.props.nextPage, 20).then((data) => {
      if(!this.props.photos.length){
        if(data.length){
          dispatch(addPhotos({photos: data, nextPage: this.props.nextPage + 1}))
          dispatch(updateTag(this.props.tagName))
          this.setState({
            totalPages: data.totalPages,
            isLoading: false,
            geometry: justifiedLayout(this.createBoxes(this.props.photos), config),
          }, () => {
            this.props.onCloseLoading && this.props.onCloseLoading()
          })
        }
        else{
          this.setState({
            noPhoto: true,
            firstLoading: false,
            isLoading: false
          }, () => {
            this.props.onCloseLoading && this.props.onCloseLoading()
          })
        }
      }
    })
  }

  loadPhotos(){
    const {dispatch} = this.props
    this.apiService.getPhotosByTags(this.props.tagName, this.props.nextPage, 20).then((data) => {
      if(data.length){
        dispatch(addPhotos({photos: data, nextPage: this.props.nextPage + 1}))
        dispatch(updateTag(this.props.tagName))
        this.setState({
          totalPages: data.totalPages,
          isLoading: false,
          geometry: justifiedLayout(this.createBoxes(this.props.photos), config),
        }, () => {
          this.props.onCloseLoading && this.props.onCloseLoading()
        })
      }
      else{
        this.setState({
          noPhoto: true,
          firstLoading: false,
          isLoading: false
        }, () => {
          this.props.onCloseLoading && this.props.onCloseLoading()
        })
      }
    })
  }

  UNSAFE_componentWillReceiveProps(props){
    this.setState({
      geometry: justifiedLayout(this.createBoxes(props.photos), config),
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
      <div className="box-container">
        {this.state.noPhoto ?
            <div style={{minHeight: '350px'}}>
              <h4>Không có hình nào được gắn tag &quot;{this.props.tag ? this.props.tag : this.props.tagName}&quot;</h4>
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
    );
  }
}

export default connect(mapStateToProps)(TagContainer);
