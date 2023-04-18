import React from 'react';

const Map = (props) => {
  const { h3 } = props;

  return (
    <MapStyle>
      <h3 className='container'>{h3}</h3>
      <div className='container map'>
        <Ymaps></Ymaps>
      </div>
    </MapStyle>
  );
};

export default Map;
