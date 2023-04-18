import React from 'react';
import styled from 'styled-components';
const LayerStyle = styled.div`
  position: absolute;
  font-weight: 700;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #fff;
  color: #313275;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 99999;
  span {
    color: #ff0000 !important;
  }
`;
const Layer = () => {
  return (
    <LayerStyle>
      <div>
        Tour<span>Villages</span>...
      </div>
    </LayerStyle>
  );
};

export default Layer;
