import React, { Component } from 'react';
import { connect } from 'react-redux';
import { sortChange } from '../actions/index';

class Sorter extends Component {
  onChange(e) {
    this.props.sortChange(e.target.value);
  }

  render() {
    return (
      <select value={this.props.sort} className="c-select" onChange={this.onChange.bind(this)}>
        <option value="featured">Featured</option>
        <option value="rating">Rating: Low to High</option>
        <option value="-rating">Rating: High to Low</option>
      </select>
    )
  }
}

export function mapStateToProps(state) {
  return {
    sort: state.sort
  }
}

export default connect(mapStateToProps, { sortChange })(Sorter);
