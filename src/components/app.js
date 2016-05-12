import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeRange, changeRangeActive } from '../actions/index';
import GMap from '../components/map.js'
import Rheostat from 'rheostat'

export default class App extends Component {
  onChange(data) {
    this.props.changeRange(data.values[0], data.values[1]);
  }

  onValuesUpdated(data) {
    this.props.changeRangeActive(data.values[0], data.values[1]);
    console.log(data);
  }

  render() {
    return (
      <div>
        <div className="rheostat-container">
          <Rheostat onValuesUpdated={this.onValuesUpdated.bind(this)} onChange={this.onChange.bind(this)} min={0} max={14} values={[this.props.min, this.props.max]} />
          min: {this.props.min}, max: {this.props.max}
        </div>
        <div>
          <GMap />
        </div>
      </div>
    );
  }
}

export function mapStateToProps(state) {
    return { min: state.filters.range.min, max: state.filters.range.max };
}

export default connect(mapStateToProps, { changeRange, changeRangeActive })(App);
