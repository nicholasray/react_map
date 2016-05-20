import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeRange, changeRangeActive } from '../actions/index';
import GMap from '../components/map';
import Collection from '../components/collection';
import Pagination from '../components/pagination';
import Sorter from '../components/sorter';
import Rheostat from 'rheostat';
import cx from 'classnames';

export default class App extends Component {
  onChange(data) {
    this.props.changeRange(data.values[0], data.values[1]);
  }

  onValuesUpdated(data) {
    this.props.changeRangeActive(data.values[0], data.values[1]);
  }

  render() {
    return (
      <div>
        <div className="sidebar">
          <div className="filters-container">
            <div className="filter-container">
              <div className="row">
                <div className="col-lg-2 col-md-12 text-center">
                  <label>Rating</label>
                </div>
                <div className="col-lg-9 col-md-12">
                  <Rheostat onValuesUpdated={this.onValuesUpdated.bind(this)} onChange={this.onChange.bind(this)} min={0} max={14} values={[this.props.min, this.props.max]} />
                  min: {this.props.min}, max: {this.props.max}
                </div>
              </div>
            </div>
            <div className="filter-container">
              <div className="row">
                <div className="col-lg-2 col-md-12 text-center">
                  <label>Sort By</label>
                </div>
                <div className="col-lg-9 col-md-12">
                  <Sorter />
                </div>
              </div>
            </div>
          </div>
          <div className={cx("collection-wrapper", this.props.isLoading ? "collection-loading" : "")}>
            <div className="collection-container">
              <Collection />
            </div>
            <div className="collection-footer">
              <Pagination />
            </div>
          </div>
        </div>
        <div>
          <GMap />
        </div>
      </div>
    );
  }
}

export function mapStateToProps(state) {
    return { min: state.filters.range.min, max: state.filters.range.max, isLoading: state.data.isFetching };
}

export default connect(mapStateToProps, { changeRange, changeRangeActive })(App);
