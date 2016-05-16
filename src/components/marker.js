import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import cx from 'classnames';
import Slider from './slider';


class Marker extends Component {
  getImages() {
    var images = [];
    for (var i = 1016; i < 1025; i++) {
      images.push({id: i});
    }

    return images;
  }

  onMouseEnter(e) {
    this.props.$onMouseAllow(false);
  }

  onMouseLeave(e) {
    this.props.$onMouseAllow(true);
  }

  onBubbleClick(e) {
    console.log("bubble clicked");
    e.nativeEvent.markerClicked = true;
  }

  onBubbleDoubleClick(e) {
    console.log("DOUBLE clicked");
    e.stopPropagation();
  }

  onMarkerClick(e) {
    this.props.onMarkerClick(this.props.id);
    e.nativeEvent.markerClicked = true;
  }

  componentDidMount() {
    ReactDOM.findDOMNode(this.refs.bubble_dom).addEventListener("dblclick", this.onBubbleDoubleClick);
  }

  render() {
    return (
      <div>
        <div ref="bubble_dom" onClick={this.onBubbleClick.bind(this)} onMouseEnter={this.onMouseEnter.bind(this)} onMouseLeave={this.onMouseLeave.bind(this)} className={cx("infoBox",
        this.props.showInfobox ? "active" : ""
        )}>
          <div className="infobox-content">
            <div className="slider-container">
              <Slider images={this.getImages()}/>
              <div className="slider-text">v{this.props.climb.rating}</div>
            </div>
            <div className="panel-body">
              <h3 className="panel-body-name"><a href={"http://www.google.com"}>{this.props.climb.name}</a></h3>
              <div className="panel-body-small">
                20 mins away
              </div>
            </div>
          </div>
        </div>
        <div onClick={this.onMarkerClick.bind(this)} className="marker">
        </div>
      </div>
    );
  }
}

export default Marker;
