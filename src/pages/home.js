import React, { Component } from 'react';
import '../styles/home.css';
import ApiService from '../services/api.services'
import {Photo} from '../component/index'
import loading from '../images/loading.gif'
import botLoading from '../images/bot-loading.gif'
import justifiedLayout from 'justified-layout';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

const config = {
  containerWidth: 1087,
  containerPadding: 0,
  boxSpacing: {
     horizontal: 5,
     vertical: 5
  }
}

class Home extends Component {
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

  componentDidMount(){
    window.addEventListener('scroll', this.handleOnScroll.bind(this));
    this.apiService.getInterestPhotos(this.state.nextPage, 20).then((data) => {
      this.setState({
        photos: data,
        geometry: justifiedLayout(this.createBoxes(data), config),
        nextPage: this.state.nextPage + 1,
        firstLoading: false
      })
    })
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleOnScroll.bind(this));
  }

  onLoadMore() {
    this.setState({
      isLoading: true
    })
    this.apiService.getInterestPhotos(this.state.nextPage, 20).then((data) => {
      this.setState({
        photos: [...this.state.photos, ...data],
        geometry: justifiedLayout(this.createBoxes([...this.state.photos, ...data]), config),
        nextPage: this.state.nextPage + 1 > data.totalPages ? false : this.state.nextPage + 1,
        isLoading: false
      })
    })
  }

  handleOnScroll() {
    var scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
    var scrollHeight = (document.documentElement && document.documentElement.scrollHeight) || document.body.scrollHeight;
    var clientHeight = document.documentElement.clientHeight || window.innerHeight;
    var scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight - 300;
    if (scrolledToBottom && this.state.nextPage && !this.state.isLoading) {
      this.onLoadMore();
    }
  }

  createBoxes(data){
    return data.map((item) => {
        return {width: +item.width_m, height: +item.height_m}
    })
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
        <div className="main fluid-centered">
          <div className="title-row">
            <h3>Explore</h3>
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
          <div className={this.state.isLoading ? "bottom-loading show" : "bottom-loading"}>
            <img src={botLoading} alt="loading" />
          </div>
        </div>
        <div className={this.state.firstLoading ? "loading show" : "loading"}>
          <img src={loading} alt="loading" />
        </div>
      </div>
    );
  }
}

export default Home;
