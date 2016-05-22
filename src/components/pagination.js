import React, { Component } from 'react';
import { connect } from 'react-redux';
import { pageChange } from '../actions/index';
import ReactPaginate from 'react-paginate';
import { withRouter } from 'react-router'

class Pagination extends Component {
  onClick(data) {
    const selected = data.selected;
    const page = selected + 1;
    console.log("pagination", data);
    this.props.pageChange(page, this.props.router);
  }

  getCurrentPage() {
    return this.props.page - 1;
  }

  getTotalPages() {
    return Math.ceil(this.props.totalCount / this.props.perPage);
  }

  getOffset() {
    return this.props.perPage * (this.props.page - 1);
  }

  render() {
    var pagination;
    var results;
    const startRange = this.getOffset() + 1;
    const endRange = startRange - 1 + this.props.climbList.length;

    if (this.props.totalCount > 0) {
      results = <div>{`${startRange} - ${endRange}`} of {this.props.totalCount} Climbs</div>;
      pagination = <ReactPaginate previousLabel={"previous"}
              nextLabel={"next"}
              clickCallback={this.onClick.bind(this)}
              forceSelected={this.getCurrentPage()}
              breakLabel={<span>...</span>}
              pageNum={this.getTotalPages()}
              marginPagesDisplayed={1}
              pageRangeDisplayed={3}
              containerClassName={"pagination"}
              activeClassName={"active"} />
    } else {
      results = "";
      pagination = "";
    }


    return (
      <div>
        {results}
        {pagination}
      </div>
    )
  }
}

export function mapStateToProps(state) {
    return {climbList: state.data.result, totalCount: state.pagination.totalCount, page: state.pagination.page, perPage: state.pagination.perPage};
}

export default connect(mapStateToProps, {pageChange})(withRouter(Pagination));
