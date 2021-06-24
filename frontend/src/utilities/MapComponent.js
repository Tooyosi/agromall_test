import React from 'react'
import { Map, GoogleApiWrapper } from 'google-maps-react';

const mapStyles = {
    width: '100%',
    height: '100%',
  };
function MapContainer(props) {
    console.log(props.google)
    return (
        <Map
          google={props.google}
          zoom={8}
          style={mapStyles}
          initialCenter={{ lat: 47.444, lng: -122.176}}
        />
    );
}
export default GoogleApiWrapper({
    apiKey: 'AIzaSyDWi9n_0Gv6jhMwYmfFGs87Wk83QzJWpms'
  })(MapContainer);