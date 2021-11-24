import { FC, useState } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import getCenter from 'geolib/es/getCenter';

import { MAP_STYLE } from '../constants';
import { ILocation, ISearchResult, IViewPort } from '../interfaces';

interface Props {
  searchResults: ISearchResult[];
}

const MapBox: FC<Props> = ({ searchResults }) => {
  const coordinates = searchResults.map(({ lat, long }) => ({
    latitude: lat,
    longitude: long,
  }));

  const center = getCenter(coordinates);

  const initialValues = {
    width: '100%',
    height: '100%',
    latitude: (center && center.latitude) || 0.0,
    longitude: (center && center.longitude) || 0.0,
    zoom: 11,
  };

  const [viewPort, setViewPort] = useState(initialValues);
  const [selectedLocation, setSelectedLocation] = useState<ILocation>();

  return (
    <ReactMapGL
      mapStyle={MAP_STYLE}
      onViewportChange={(nextViewPort: IViewPort) => setViewPort(nextViewPort)}
      mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}
      {...viewPort}
    >
      {searchResults.map(({ lat, long, title }) => (
        <div key={title}>
          <Marker
            latitude={lat}
            longitude={long}
            offsetLeft={-20}
            offsetTop={-10}
          >
            <p
              role="img"
              aria-label="push-pin"
              className="cursor-pointer text-2xl animate-bounce"
              onClick={() =>
                setSelectedLocation({ latitude: lat, longitude: long })
              }
            >
              📌
            </p>
          </Marker>

          {selectedLocation?.latitude === lat &&
            selectedLocation.longitude === long && (
              <Popup
                className="z-30"
                closeOnClick={true}
                onClose={() => setSelectedLocation(undefined)}
                longitude={long}
                latitude={lat}
              >
                {title}
              </Popup>
            )}
        </div>
      ))}
    </ReactMapGL>
  );
};

export default MapBox;
