import React, { Component } from 'react';
import Slider from './slider';


class CollectionItem extends Component {
  onMouseEnter() {
    this.props.onMouseEnter(this.props.id);
  }

  onMouseLeave() {
    this.props.onMouseLeave(this.props.id);
  }

  render() {
    const climb = this.props.climb
    return (
      <div key={climb.id} id={climb.id} onMouseEnter={this.onMouseEnter.bind(this)} onMouseLeave={this.onMouseLeave.bind(this)} className="col-sm-12 col-md-6">
        <div className="item-container">
          <div className="slider-container">
            <Slider images={[{id: this.props.imageIndex}, {id: this.props.imageIndex + 1}]} />
            <div className="slider-text">v{climb.rating}</div>
          </div>
          <div className="panel-body">
            <h3 className="panel-body-name"><a href={"http://www.google.com"}>{climb.name}</a></h3>
            <div className="panel-body-small">
              20 mins away
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CollectionItem;
