import React, { Component } from 'react';
import '../styles/detail.css';
import ApiService from '../services/api.services'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import {addPhotos, clearPhotos, updateTag} from '../actions'

const mapStateToProps = (state) => {
    return {}
}

class TagContainer extends Component {
  constructor(props){
    super(props)
    this.apiService = ApiService()
    this.state = {
      photo: null,
      user: null,
      isZoom: false
    }
  }

  handleSearchTag(tag){
    const {history, dispatch} = this.props
    dispatch(clearPhotos())
    dispatch(updateTag(tag))
    this.apiService.getPhotosByTags(tag, 1, 20).then((data) => {
      if(data.length){
        dispatch(addPhotos({photos: data, nextPage: 2}))
      }
      history.push({
        pathname: `/photo/tags/${tag}`,
        state: {keyword: tag}
      })
    })
  }

  render() {
    return(
      <ul className="tags-list">
        {this.props.tags && this.props.tags.map((item) => {
            return(
              <li className="tag" key={item.id} onClick={this.handleSearchTag.bind(this, item.raw)}>
                <a>
                  <span>{item.raw}</span>
                </a>
              </li>
            )
          })
        }
      </ul>
    );
  }
}

export default withRouter(connect(mapStateToProps)(TagContainer));
