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
  .menus {
    width: calc(100% - 359px);
  }
  .menu {
    margin-bottom: 20px;
    .name {
      font-size: 16px;
      line-height: 20px;
      color: rgb(128, 141, 166);
      font-weight: 600;
      margin-bottom: 20px;
    }
    .first {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .info {
        font-size: 14px;
        line-height: 20px;
        color: rgb(0, 29, 86);
        span {
          color: rgb(128, 141, 166) !important;
        }
      }
    }
  }

  @media only screen and (max-width: 770px) and (min-width: 320px) {
    .first {
      flex-direction: column;
      align-items: flex-start !important;
      gap: 16px;
      border-bottom: 1px solid rgb(128, 141, 166);
      padding-bottom: 10px;
    }
  }

  @media only screen and (max-width: 920px) and (min-width: 320px) {
    .menus {
      width: 100%;
    }
  }
`;

const Menus = (props) => {
  const { h3, data } = props;
  return (
    <Styles>
      <h3 className='container'>{h3}</h3>
      <div className='container'>
        <div className='menus'>
          {data?.map((e, index) => (
            <div className='menu' key={index}>
              <p className='name'>{e.name}</p>
              {e.childs.map((i, index) => (
                <div className='first' key={index}>
                  <div className='info'>
                    {i.name} <span>({i.desc})</span>
                  </div>
                  <div className='price'>{i.price}</div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </Styles>
  );
};

export default Menus;
