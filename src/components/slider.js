import React, { Component } from 'react';
import SlickSlider from 'react-slick';

class Slider extends Component {
  renderImages() {
    return this.props.images.map((image) => {
      return (
        <div className="slide-container" key={image.id}>
          <div className="image-wrapper">
            <div className="image-container">
            <a href="http://www.google.com">
              <img src={`https://unsplash.it/399/266?image=${image.id}`}/>
              </a>
            </div>
          </div>
        </div>
      )
    });
  }

  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 110,
      slidesToShow: 1,
      slidesToScroll: 1,
      swipe: false,
      dots: false,
      lazyLoad: true
    };
    return (
      <div>
        <SlickSlider {...settings}>
          {this.renderImages()}
        </SlickSlider>
      </div>
    );
  }
}

export default Slider;
