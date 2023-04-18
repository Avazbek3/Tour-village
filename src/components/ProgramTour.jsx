import React from 'react';
import styled from 'styled-components';

const Styles = styled.div`
  h3 {
    font-size: 20px;
    line-height: 24px;
    color: rgb(0, 29, 86);
    margin-bottom: 20px;
    margin-top: 30px;
  }
  .programs {
    width: calc(100% - 359px);
    .program {
      display: flex;
      flex-direction: column;
      gap: 12px;
      position: relative;
      padding-left: 30px;
      margin-bottom: 20px;
      &::before {
        content: '';
        width: 12px;
        height: 12px;
        background: rgb(0, 29, 86);
        border-radius: 50%;
        position: absolute;
        left: 0;
        top: 5px;
      }
      &::after {
        content: '';
        width: 1.5px;
        height: calc(100% + 19px);
        background: rgb(0, 29, 86);
        position: absolute;
        left: 5.7px;
        top: 9px;
      }
      &:last-child::after {
        height: 0;
      }
      .day {
        font-size: 15px;
        line-height: 20px;
        color: rgb(128, 141, 166);
      }
      h4 {
        font-size: 15px;
        line-height: 20px;
        color: rgb(0, 29, 86);
        font-weight: 600;
      }
      p {
        font-size: 15px;
        line-height: 20px;
        color: rgb(0, 29, 86);
      }
    }
  }
  @media only screen and (max-width: 920px) and (min-width: 320px) {
    .programs {
      width: 100%;
    }
  }
`;

const ProgramTour = (props) => {
  const { h3, data } = props;
  return (
    <Styles>
      <h3 className='container'>{h3}</h3>
      <div className='container'>
        <div className='programs'>
          {data?.map((e, index) => (
            <div className='program' key={index}>
              <div className='day'>Kun {index + 1}</div>
              <h4>{e.title}</h4>
              <p>{e.description}</p>
            </div>
          ))}
        </div>
      </div>
    </Styles>
  );
};

export default ProgramTour;
