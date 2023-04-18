import React from 'react';
import styled from 'styled-components';
import check from '../../src/images/check.svg';

const Styles = styled.div`
  h3 {
    font-size: 20px;
    line-height: 24px;
    color: rgb(0, 29, 86);
    margin-bottom: 20px;
    margin-top: 30px;
  }
  .services {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .serv {
    display: flex;
    align-items: center;
    gap: 10px;
    span {
      font-size: 15px;
      line-height: 20px;
      color: rgb(0, 29, 86);
    }
  }
`;

const ServiceTour = (props) => {
  const { h3, data } = props;
  return (
    <Styles>
      <h3 className='container'>{h3}</h3>
      <div className='container'>
        <div className='services'>
          {data?.map((e, index) => (
            <div key={index} className='serv'>
              <img src={check} alt='' /> <span>{e.title}</span>
            </div>
          ))}
        </div>
      </div>
    </Styles>
  );
};

export default ServiceTour;
