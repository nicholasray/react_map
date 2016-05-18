import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeRange, changeRangeActive } from '../actions/index';
import GMap from '../components/map';
import Collection from '../components/collection';
import Rheostat from 'rheostat';
import ReactPaginate from 'react-paginate';

export default class App extends Component {
  onChange(data) {
    this.props.changeRange(data.values[0], data.values[1]);
  }

  onValuesUpdated(data) {
    this.props.changeRangeActive(data.values[0], data.values[1]);
  }

  onPagination() {
    console.log("pagination");
  }

  render() {
    return (
      <div>
        <div className="sidebar">
          <div className="filters-container">
            <div className="filter-container">
              <div className="row">
                <div className="col-lg-2 col-md-12 text-center">
                  <label>Distance</label>
                </div>
                <div className="col-lg-9 col-md-12">
                </div>
              </div>
            </div>
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
          </div>
          <div className="collection-container">
            <Collection />
          </div>
          <div className="collection-footer">
            <ReactPaginate previousLabel={"previous"}
                nextLabel={"next"}
                clickCallback={this.onPagination}
                breakLabel={<span>...</span>}
                pageNum={10}
                marginPagesDisplayed={1}
                pageRangeDisplayed={3}
                containerClassName={"pagination"}
                activeClassName={"active"} />
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
    return { min: state.filters.range.min, max: state.filters.range.max };
}

export default connect(mapStateToProps, { changeRange, changeRangeActive })(App);
