import React from 'react';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from 'react-google-maps';

export default withScriptjs(
  withGoogleMap(() => (
    <GoogleMap
      defaultZoom={12}
      defaultCenter={{ lat: -8.305663, lng: 111.59816 }}
    >
      <Marker position={{ lat: -8.305663, lng: 111.59816 }} />
    </GoogleMap>
  )),
);
