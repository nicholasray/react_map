import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import cx from 'classnames';
import Slider from './slider';


class Marker extends Component {
  onMouseEnter(e) {
    this.props.$onMouseAllow(false);
  }

  onMouseLeave(e) {
    this.props.$onMouseAllow(true);
  }

  onClick(e) {
    e.nativeEvent.markerClicked = true;
  }

  render() {
    return (
      <div>
        <div onClick={this.onClick.bind(this)} onMouseEnter={this.onMouseEnter.bind(this)} onMouseLeave={this.onMouseLeave.bind(this)} className={cx("infoBox",
        this.props.showInfobox ? "active" : ""
        )}>
          <div className="infobox-content">
            <Slider />
          </div>
        </div>
        <div className="marker">
        </div>
      </div>
    );
  }
}

export default Marker;
