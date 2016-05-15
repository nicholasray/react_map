import React, { Component } from 'react';
import SlickSlider from 'react-slick';

class Slider extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 120,
      slidesToShow: 1,
      slidesToScroll: 1,
      swipe: false,
      dots: false
    };
    return (
      <SlickSlider {...settings}>
        <img src="http://placehold.it/260x175/5B6367/ddd/&text=slide1"/>
        <img src="http://placehold.it/260x175/5B6367/ddd/&text=slide2"/>
        <img src="http://placehold.it/260x175/5B6367/ddd/&text=slide3"/>
      </SlickSlider>
    );
  }
}

export default Slider;
