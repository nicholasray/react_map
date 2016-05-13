import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeBounds, markerSelect } from '../actions/index';
import GoogleMap from 'google-map-react';
import Marker from './marker';

class SimpleMap extends Component {
  onChange(data) {
    console.log("bounds changed", data);
    this.props.changeBounds(data.bounds, data.center);
  }

  onChildClick(id) {
    console.log("marker select before", this.props.map);
    this.props.markerSelect(id);
  }

  renderMarkers() {
    return this.props.rockList.map((id) => {
      const rock = this.props.rockHash[id];
      return <Marker key={id} lat={rock.latitude} lng={rock.longitude} />
    });
  }

  render() {
    return (
      <div className="map">
        <GoogleMap
          center={this.props.map.center}
          zoom={this.props.map.zoom}
          onChange={this.onChange.bind(this)}
          onChildClick={this.onChildClick.bind(this)}
        >
          { this.renderMarkers() }
        </GoogleMap>
      </div>
    );
  }
}

export function mapStateToProps(state) {
    console.log("state is",state);
    return { rockHash: state.data.entities.rocks, rockList: state.data.result, map: state.map};
}

export default connect(mapStateToProps, { changeBounds, markerSelect })(SimpleMap);
