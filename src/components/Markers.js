import { Tooltip, Marker } from "react-leaflet";
import React, { Component } from 'react';
import '../style/Markers.css';
import { withRouter } from "react-router-dom";

class Markers extends Component {
  createMarkers = () => {
    var marker = [];
    var places = this.props.places?this.props.places:()=>0;
    for (var i = 0; i < places.length; i++) {
      var place = places[i].coord;
      // console.log(place);
      marker[i] =
        <Marker 
        place={places[i]} 
        onClick={(e) => 
          // console.log(e.target.options.place.name)
          this.props.history.push(`/${e.target.options.place.name}`)}
         position={[place.Lat, place.Lon]}>
          <Tooltip>{places[i].name}</Tooltip>
        </Marker>;
    }
    return marker;
  }
  render() {
    return (
      <div className='markers'>
        {this.createMarkers()}
      </div>
    );
  }
}
export default withRouter(Markers);