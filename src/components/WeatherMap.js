import { Map, TileLayer } from "react-leaflet";
import React, { Component } from 'react';
import {setView,setItems} from '../actions';
import { connect } from 'react-redux';
import { geolocated } from 'react-geolocated';
import Markers from "./Markers";

class WeatherMap extends Component {
  constructor(props) {
    super(props);
    this.state={
      markers:null,
      view:null
    };
  }
  componentDidUpdate() {
    if(!this.state.view) {
      this.setViewCoords();
    }
    if((this.props.coords)&&(!this.state.markers)) {
      this.searchViewPlaces(8);
    }
  }
  mapInteract = (e) => {
    this.setViewCoords();
    this.searchViewPlaces(e.target._zoom);
  }
  setViewCoords = () => {
    var view = this.refs.map.leafletElement.getBounds();
    this.setState({view:view});
  }
  searchViewPlaces = (zoom) => {
    var coords=this.state.view;
    if(!coords) {
      return 0;
    }
    var right = coords._northEast.lng;
    var left = coords._southWest.lng;
    var up = coords._northEast.lat;
    var bottom = coords._southWest.lat;
    if(zoom>7) {
      fetch(`https://api.openweathermap.org/data/2.5/box/city?bbox=${right},${up},${left},${bottom},${zoom}&appid=10eef0d5859a79e048209ecd86701ac1`)
      .then(res=> res.json())
      .then(items=>this.setState({markers:items.list}))
      .catch(err=>console.log(err));
    }
  };
  render() {
    var center = this.props.center?this.props.center: this.props.coords?[this.props.coords.latitude,this.props.coords.longitude]:[0,0];
    var zoom = this.props.zoom?this.props.zoom:8;
    // var markers = this.props.markers?this.props.markers:[];
    return (
      <div className='map'>
        <Map onMoveEnd={this.mapInteract} center={center} zoom={zoom} ref='map'>
          <TileLayer
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Markers places={this.state.markers}/>
        </Map>
      </div>
    );
  }
}
export default WeatherMap;

const mapDispatchToProps = {setView,setItems };
const mapStateToProps = state => {
    return {
      items: state.items,
      view: state.view
  };
};
export const WeatherMapContainer = connect(mapStateToProps,mapDispatchToProps)(geolocated()(WeatherMap));