import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/pages';
import {SERVER_URL} from '../../config';
import { getImageById, changeItemInArr } from '../../helpers/pages';

class Image extends Component {

  delImage = () => {
    this.props.delImage(this.props.imageId, () => {
      this.props.getPages();
    });
  }

  downImage = () => {
    this.props.changePosition('down', this.props.imageId, 'images', () => {
      this.props.getPages();
    });
  }

  upImage = () => {
    this.props.changePosition('up', this.props.imageId, 'images', () => {
      this.props.getPages();
    });
  }

  handleChange = (event) => {
    let image = getImageById(this.props.page.images, this.props.imageId);
    image.alt = event.target.value;

    let images = changeItemInArr(this.props.page.images, image);
    let newPageData = { ...this.props.page, 'images': images};

    this.props.changePage(newPageData);
  }

  saveAlt = () => {
    let image = getImageById(this.props.page.images, this.props.imageId);
    this.props.saveImgAlt(image, () => {
    });
  }

  render() {
    let image = getImageById(this.props.page.images, this.props.imageId);

    return (
      <div className="ml-1  mt-3 row">
        <img  src={SERVER_URL + image.fs.small} alt={image.alt} />

        <div className="ml-1 row">
          <div className="trash ml-2"  onClick={this.delImage}><i className="fas fa-trash cursor-pointer"  aria-hidden="true"/></div>

          {(this.props.page.images.length > 1) &&
          <React.Fragment>
            <div className="ml-2"  onClick={this.downImage}><i className="fas fa-arrow-down cursor-pointer"></i></div>
            <div className="ml-2"  onClick={this.upImage}><i className="fas fa-arrow-up cursor-pointer"></i></div>
          </React.Fragment>
          }

          <input type="text" placeholder="Short title" name="short_title" className="form-control col"
               onChange={this.handleChange} value={image.alt || ''} />
          <div onClick={this.saveAlt}><i className="far fa-save cursor-pointer"></i></div>
       </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    page: state.pages.page
  };
}

export default connect(mapStateToProps, actions)(Image);
