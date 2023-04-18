import React from 'react';
import styled from 'styled-components';
import cal from '../../src/images/loc.svg';
import loc from '../../src/images/locc.svg';

const Styles = styled.div`
  margin-bottom: 20px;
  h3 {
    font-size: 20px;
    line-height: 24px;
    color: rgb(0, 29, 86);
    margin-top: 40px;
    margin-bottom: 20px;
  }
  .fl {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: calc(100% - 359px);
    .first {
      display: flex;
      align-items: center;
      color: rgb(0, 29, 86);
      img {
        margin-right: 10px;
      }
    }
    .second {
      display: flex;
      align-items: center;
      margin-right: 70px;
      color: rgb(0, 29, 86);
      img {
        margin-right: 10px;
      }
      div {
        display: flex;
        flex-direction: column;
        gap: 5px;
      }
    }
  }
  @media only screen and (max-width: 920px) and (min-width: 320px) {
    .fl {
      width: 100%;
    }
  }
`;

const ImpInfo = (props) => {
  const { h3, data } = props;
  const tel = data?.phone === null ? null : data?.phone.split(',');
  return (
    <Styles>
      <h3 className='container'>{h3}</h3>
      <div className='container'>
        <div className='fl'>
          <div className='first'>
            <img src={loc} alt='' />
            <div className='loci'>{data?.address}</div>
          </div>
          {tel?.length > 0 ? (
            <div className='second'>
              <img src={cal} alt='' />
              <div>
                {tel?.map((item, index) => {
                  return (
                    <a
                      href={`tel: ${item}`}
                      key={index}
                      style={{ display: 'block' }}
                    >
                      {item}
                    </a>
                  );
                })}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </Styles>
  );
};

export default ImpInfo;
