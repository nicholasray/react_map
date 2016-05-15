import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeBounds, markerSelect, mapClick } from '../actions/index';
import GoogleMap from 'google-map-react';
import Marker from './marker';

class SimpleMap extends Component {
  onChange(data) {
    console.log("bounds changed", data);
    this.props.changeBounds(data.bounds, data.center, data.zoom);
  }

  onClick(e) {
    console.log("map clicked", e);
    console.log(e.event.target);
    if (!e.event.nativeEvent.markerClicked) {
      this.props.mapClick();
    }
  }

  onMarkerClick(id) {
    console.log("marker selected", id);
    this.props.markerSelect(id);
  }

  renderMarkers() {
    return this.props.climbList.map((id) => {
      const rock = this.props.rockHash[id];
      return <Marker onMarkerClick={this.onMarkerClick.bind(this)} key={id} id={id} lat={rock.latitude} lng={rock.longitude} showInfobox={id == this.props.markers.selected} />
    });
  }

  render() {
    return (
      <div className="map">
        <GoogleMap
          center={this.props.map.center}
          zoom={this.props.map.zoom}
          onChange={this.onChange.bind(this)}
          onClick={this.onClick.bind(this)}
        >
          { this.renderMarkers() }
        </GoogleMap>
      </div>
    );
  }
}

export function mapStateToProps(state) {
    console.log("state is",state);
    return { climbHash: state.data.entities.climbs, climbList: state.data.result, rockHash: state.data.entities.rocks, map: state.map, markers: state.data.markers };
}

export default connect(mapStateToProps, { changeBounds, markerSelect, mapClick })(SimpleMap);
