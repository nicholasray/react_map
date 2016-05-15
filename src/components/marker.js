import React, { Component } from 'react';
import cx from 'classnames';
import Slider from './slider';


class Marker extends Component {
  onMouseEnter(e) {
    this.props.$onMouseAllow(false);
  }

  onMouseLeave(e) {
    this.props.$onMouseAllow(true);
  }
  render() {
    return (
      <div>
        <div onMouseEnter={this.onMouseEnter.bind(this)} onMouseLeave={this.onMouseLeave.bind(this)} className={cx("infoBox",
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
