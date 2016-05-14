import React, { Component } from 'react';
import cx from 'classnames';


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
            <img src={"https://placeholdit.imgix.net/~text?txtsize=33&txt=image&w=200&h=150&bg=eee"} />
          </div>
        </div>
        <div className="marker">
        </div>
      </div>
    );
  }
}

export default Marker;
