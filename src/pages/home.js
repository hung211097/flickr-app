import React, { Component } from 'react';
import '../styles/home.css';
import ApiService from '../services/api.services'
import Header from '../component/header';
import Footer from '../component/footer';
import loading from '../images/loading.gif'
import botLoading from '../images/bot-loading.gif'
import justifiedLayout from 'justified-layout';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import Lightbox from 'react-images';

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
      firstLoading: true,
      photoIndex: 0,
      isOpen: false
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

  createSourceImg(){
    return this.state.photos.map((item) => {
      return {src: item.url_m}
    })
  }

  handleNext(){
    this.setState({
      photoIndex: (this.state.photoIndex + 1) % this.state.photos.length,
    })
  }

  handlePrev(){
    this.setState({
      photoIndex: (this.state.photoIndex + this.state.photos.length - 1) % this.state.photos.length,
    })
  }

  handleClose(){
    this.setState({ isOpen: false })
  }

  handleOpen(index){
    this.setState({
      isOpen: true,
      photoIndex: index
    })
  }

  render() {
    console.log(this.state);
    console.log(this.createSourceImg());
    const {photos} = this.state
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
                {!!photos.length && photos.map((item, key) => {
                  return(
                    <div className="photo-view" key={key} style={{...this.state.geometry.boxes[key]}} onClick={this.handleOpen.bind(this, key)}>
                      <div className="interaction-view">
                        <div className="photo-list-photo-interaction">
                          <a className="overlay"> </a>
                          <div className="interaction-bar">
                            <div className="text">
                              <a className="title">{item.title}</a>
                              <a className="attribution">by {item.ownername} - {item.views} views</a>
                            </div>
                          </div>
                        </div>
                      </div>
                      <img src={item.url_m} alt="img" />
                    </div>
                  )
                })
              }
            </ReactCSSTransitionGroup>
          </div>
          {!!photos.length && this.state.isOpen &&
            <Lightbox
              images={this.createSourceImg()}
              isOpen={this.state.isOpen}
              onClickPrev={this.handlePrev.bind(this)}
              onClickNext={this.handleNext.bind(this)}
              onClose={this.handleClose.bind(this)}
              currentImage={this.state.photoIndex}
              backdropClosesModal
            />
          }
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
