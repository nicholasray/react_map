import React, { Component } from 'react';
import { connect } from 'react-redux';
import { pageChange } from '../actions/index';
import ReactPaginate from 'react-paginate';

class Pagination extends Component {
  onClick(data) {
    const selected = data.selected;
    const offset = Math.ceil(selected * this.props.perPage);
    console.log("pagination", data);
    this.props.pageChange(offset);
  }

  getCurrentPage() {
  }

  getTotalPages() {
    return Math.ceil(this.props.totalCount / this.props.perPage);
  }

  render() {
    return (
      <div>
        <ReactPaginate previousLabel={"previous"}
            nextLabel={"next"}
            clickCallback={this.onClick.bind(this)}
            breakLabel={<span>...</span>}
            pageNum={this.getTotalPages()}
            marginPagesDisplayed={1}
            pageRangeDisplayed={3}
            containerClassName={"pagination"}
            activeClassName={"active"} />
      </div>
    )
  }
}

export function mapStateToProps(state) {
    return {totalCount: state.pagination.totalCount, offset: state.pagination.offset, perPage: state.pagination.perPage};
}

export default connect(mapStateToProps, {pageChange})(Pagination);
