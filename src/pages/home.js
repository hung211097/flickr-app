import React, { Component } from 'react';
import '../styles/home.css';
import ApiService from '../services/api.services'
import Header from '../component/header';
import Footer from '../component/footer';
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
    this.apiService.getInterestPhotos(this.state.nextPage).then((data) => {
      let temp = []
      for(let i = 0; i < data.length; i++){
        temp.push(this.apiService.getInfoPhotoById(data[i].id))
      }
      Promise.all(temp).then((values) => {
        this.setState({
          photos: values,
          geometry: justifiedLayout(this.createBoxes(values), config),
          nextPage: this.state.nextPage + 1,
          firstLoading: false
        })
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
    this.apiService.getInterestPhotos(this.state.nextPage).then((data) => {
      let temp = []
      for(let i = 0; i < data.length; i++){
        temp.push(this.apiService.getInfoPhotoById(data[i].id))
      }
      Promise.all(temp).then((values) => {
        this.setState({
          photos: [...this.state.photos, ...values],
          geometry: justifiedLayout(this.createBoxes([...this.state.photos, ...values]), config),
          nextPage: this.state.nextPage + 1 > data.totalPages ? false : this.state.nextPage + 1,
          isLoading: false
        })
      })
    })
  }

  handleOnScroll() {
    var scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
    var scrollHeight = (document.documentElement && document.documentElement.scrollHeight) || document.body.scrollHeight;
    var clientHeight = document.documentElement.clientHeight || window.innerHeight;
    var scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight - 150;
    if (scrolledToBottom && this.state.nextPage && !this.state.isLoading) {
      this.onLoadMore();
    }
  }

  createBoxes(data){
    return data.map((item) => {
        return {width: +item.width, height: +item.height}
    })
  }

  render() {
    return (
      <div>
        <Header />
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
              {/*<InfiniteScroll
                pageStart={0}
                loadMore={this.onLoadMore.bind(this)}
                hasMore={!!this.state.nextPage}
                loader={<div className="loader" key={0} style={{clear: 'both'}}>Loading ...</div>}
                threshold={50}
                >*/}
                {!!this.state.photos.length && this.state.photos.map((item, key) => {
                  return(
                      <div className="photo-view" key={key} style={{...this.state.geometry.boxes[key]}}>
                        <div className="interaction-view">
                          <div className="photo-list-photo-interaction">
                            <a className="overlay"> </a>
                            <div className="interaction-bar">
                              <div className="text">
                                <a className="title">{item.title}</a>
                                <a className="attribution">by {item.username}</a>
                              </div>
                            </div>
                          </div>
                        </div>
                        <img src={item.source} alt="img" />
                      </div>
                    )
                  })
                }
              {/*</InfiniteScroll>*/}
            </ReactCSSTransitionGroup>
          </div>
          <div className={this.state.isLoading ? "bottom-loading show" : "bottom-loading"}>
            <img src={botLoading} alt="loading" />
          </div>
        </div>
        <Footer />
        <div className={this.state.firstLoading ? "loading show" : "loading"}>
          <img src={loading} alt="loading" />
        </div>
      </div>
    );
  }
}

export default Home;
