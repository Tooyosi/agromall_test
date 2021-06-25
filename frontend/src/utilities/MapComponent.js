import React from 'react'
import { Map, GoogleApiWrapper } from 'google-maps-react';

const mapStyles = {
    width: '100%',
    position: "relative",
    height: '100%',
  };
  const containerStyle = {
    position: 'relative',  
    width: '100%',
    height: '342px'
  }
function MapContainer(props) {
    console.log(props)
    return (
        <Map
          google={props.google}
          zoom={20}
          containerStyle={containerStyle}
          // style={mapStyles}
          initialCenter={props.initialCenter}
        />
    );
}
export default GoogleApiWrapper({
    apiKey: process.env.REACT_APP_GOOGLE_KEY
  })(MapContainer);