import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getMarkers } from '../actions/index';
import GoogleMap from 'google-map-react';
import Marker from './marker';

class SimpleMap extends Component {
  onChange(data) {
    console.log("bounds changed", data);
    const sw = {
      lat: data.bounds.se.lat,
      lng: data.bounds.nw.lng
    }

    const ne = {
      lat: data.bounds.nw.lat,
      lng: data.bounds.se.lng
    }

    this.props.getMarkers(sw, ne);
  }

  renderMarkers() {
    return this.props.markers.map((marker) => {
      return <Marker key={marker.id} lat={marker.latitude} lng={marker.longitude} />
    });
  }

  render() {
    return (
      <div className="map">
        <GoogleMap
          defaultCenter={this.props.map.center}
          defaultZoom={this.props.map.zoom}
          onChange={this.onChange.bind(this)}
        >
          { this.renderMarkers() }
        </GoogleMap>
      </div>
    );
  }
}

export function mapStateToProps(state) {
    return { markers: state.markers, map: state.map };
}

export default connect(mapStateToProps, { getMarkers })(SimpleMap);
