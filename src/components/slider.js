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
        <img src="http://placehold.it/200x150/ffffff/c0392b/&text=slide1"/>
        <img src="http://placehold.it/200x150/eee/c0392b/&text=slide2"/>
        <img src="http://placehold.it/200x150/bbeeff/c0392b/&text=slide3"/>
      </SlickSlider>
    );
  }
}

export default Slider;
