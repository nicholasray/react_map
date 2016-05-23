import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeBounds, markerSelect, mapClick } from '../actions/index';
import GoogleMap from 'google-map-react';
import Marker from './marker';
import { withRouter } from 'react-router'

class SimpleMap extends Component {
  onChange(data) {
    console.log("map bounds change");
    this.props.changeBounds(data.bounds, data.center, data.zoom, this.props.router);
  }

  onClick(e) {
    console.log("map clicked", e);
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
      const climb = this.props.climbHash[id];
      const rock = this.props.rockHash[climb.rockId];
      return <Marker onMarkerClick={this.onMarkerClick.bind(this)} key={id} climb={climb} rock={rock} id={id} lat={rock.latitude} lng={rock.longitude} showInfobox={id == this.props.markers.selected} hover={id == this.props.markers.hovered} />
    });
  }

  createMapOptions(maps) {
    var styleArray = [
      {
        featureType: "water",
        elementType: "geometry",
        stylers: [
          { color: "#93DAFD" }
        ]
      },
      {
        featureType: "poi.park",
        elementType: "geometry",
        stylers: [
          { color: "#D3E0CB" }
        ]
      },
      {
        featureType: "transit.station.airport",
        elementType: "geometry",
        stylers: [
          { color: "#D1D5E9" }
        ]
      },
      {
        featureType: "road.highway",
        elementType: "geometry",
        stylers: [
          { color: "#B39C7B" }
        ]
      },
    ];

    return {
      zoomControlOptions: {
        position: maps.ControlPosition.TOP_RIGHT
      },
      scrollwheel: false,
      styles: styleArray,
      mapTypeId: google.maps.MapTypeId.TERRAIN
    };
  }

  render() {
    return (
      <div className="map hidden-sm-down">
        <GoogleMap
          center={this.props.map.center}
          zoom={this.props.map.zoom}
          onChange={this.onChange.bind(this)}
          onClick={this.onClick.bind(this)}
          options={this.createMapOptions}
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

export default connect(mapStateToProps, { changeBounds, markerSelect, mapClick })(withRouter(SimpleMap));
