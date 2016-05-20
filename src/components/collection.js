import React, { Component } from 'react';
import { connect } from 'react-redux';
import { itemMouseEnter, itemMouseLeave } from '../actions/index';
import CollectionItem from './collection-item';

class Collection extends Component {
  onMouseEnter(id) {
    console.log("collection mouse enter", id);
    this.props.itemMouseEnter(id);
  }

  onMouseLeave(id) {
    console.log("collection mouse leave", id);
    this.props.itemMouseLeave(id);
  }

  renderItems() {
    var i = 1016;
    return this.props.climbList.map((id) => {
      const climb = this.props.climbHash[id];
      i++;
      return (
        <CollectionItem key={id} id={id} climb={climb} imageIndex={i} onMouseEnter={this.onMouseEnter.bind(this)} onMouseLeave={this.onMouseLeave.bind(this)} />
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

export default connect(mapStateToProps, {itemMouseEnter, itemMouseLeave})(Collection);
