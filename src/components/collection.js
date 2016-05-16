import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from './slider';

class Collection extends Component {
  renderItems() {
    var i = 1016;
    return this.props.climbList.map((id) => {
      const climb = this.props.climbHash[id];
      i++;
      return (
        <div key={climb.id} className="col-sm-12 col-md-6">
          <div className="item-container">
            <div className="slider-container">
              <Slider images={[{id: i}, {id: i + 1}]} />
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
      )
    });
  }

  render() {
    return (
      <div>
        <div className="row">
         {this.renderItems()}
        </div>
      </div>
    );
  }
}

export function mapStateToProps(state) {
    return { climbHash: state.data.entities.climbs, climbList: state.data.result, rockHash: state.data.entities.rocks };
}

export default connect(mapStateToProps, null)(Collection);
