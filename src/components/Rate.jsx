import React from 'react';
import StarRatings from 'react-star-ratings';
import styled, { createGlobalStyle } from 'styled-components';
import Close from '../images/Close.svg';
import Rate from 'rc-rate';

const RateST = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  z-index: 999;
  .layer {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 29, 86, 0.5);
    z-index: 999;
  }
  .card {
    position: relative;
    top: 0px;
    max-width: 552px;
    border-radius: 20px;
    padding: 39px;
    margin: 0 auto;
    background: #fff;
    z-index: 9999;
    .head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 24px;
      .t1 {
        font-size: 20px;
        line-height: 24px;
        color: rgb(0, 29, 86);
        font-weight: 700;
      }
    }
    .form-r {
      .sr {
        .srp {
          font-size: 16px;
          line-height: 20px;
          color: rgb(128, 141, 166);
        }
      }
      .sn {
        display: flex;
        gap: 7px;
        margin-bottom: 16px;
        div {
          div {
            font-size: 14px;
            margin-left: 20px;
            margin-top: 5px;
          }
        }
        input {
          background: rgb(250, 250, 250);
          border-radius: 12px;
          padding: 12px 18px;
          font-size: 15px;
          line-height: 20px;
          color: rgb(128, 141, 166);
          border: none;
          &:focus,
          :active {
            border: none;
            outline: none;
          }
        }
      }
      .st {
        div {
          font-size: 14px;
          margin-left: 20px;
          margin-top: 5px;
        }
      }
      textarea {
        background: rgb(250, 250, 250);
        border-radius: 12px;
        padding: 12px 18px;
        font-size: 15px;
        line-height: 20px;
        color: rgb(128, 141, 166);
        border: none;
        resize: none;
        width: calc(100% - 36px);
        height: 156px;
        &:focus,
        :active {
          border: none;
          outline: none;
        }
      }
      .bs {
        margin-top: 24px;
        display: flex;
        gap: 14px;
        .btn1,
        .btn2 {
          font-weight: 600;
          font-size: 15px;
          line-height: 20px;
          border-radius: 12px;
          width: 100%;
          padding: 14px;
          transition: all 400ms ease 0s;
          cursor: pointer;
        }
        .btn1 {
          background: rgb(255, 255, 255);
          border: 1px solid rgb(243, 76, 53);
          color: rgb(243, 76, 53);
          &:hover {
            transition: all 400ms ease 0s;
            background: rgb(243, 76, 53);
            color: rgb(255, 255, 255);
          }
        }
        .btn2 {
          background: rgb(255, 255, 255);
          border: 1px solid rgb(0, 29, 86);
          color: rgb(0, 29, 86);
          &:hover {
            transition: all 400ms ease 0s;
            background: rgb(0, 29, 86);
            color: rgb(255, 255, 255);
          }
        }
      }
    }
  }
`;

const StyledRate = styled(Rate)`
  &.rc-rate {
    font-size: ${({ size }) => size}px;
  }
`;
const BodyHidden = createGlobalStyle`
    body{
        overflow: hidden;
    }
`;

const Rates = (props) => {
  const {
    modal,
    handleRate,
    handleInputChange,
    objRate,
    handlePost,
    setObjdRate,
    objRateE,
    setObjRateE,
  } = props;
  return (
    <RateST>
      <div className='layer' />
      <div className='card'>
        <div className='head'>
          <div className='t1'>Baho bering</div>
          <img
            src={Close}
            alt=''
            onClick={() => {
              modal();
              setObjdRate({
                rate: 0,
                name: '',
                username: '',
                content: '',
              });
              setObjRateE({
                name: false,
                username: false,
                content: false,
              });
            }}
            style={{ cursor: 'pointer' }}
          />
        </div>
        <form onSubmit={handlePost} className='form-r'>
          <div className='sr'>
            <p className='srp'>Necha baho berasiz</p>
            <StyledRate size='31' onChange={handleRate} />
          </div>
          <div className='sn'>
            <div>
              <input
                type='text'
                name='name'
                value={objRate?.name || ''}
                onChange={handleInputChange}
                placeholder='Name'
              />
              {objRateE.name === true ? (
                <div style={{ color: 'red' }}>Xato</div>
              ) : null}
            </div>
            <div>
              <input
                type='text'
                name='username'
                value={objRate?.username || ''}
                onChange={handleInputChange}
                placeholder='Surname'
              />
              {objRateE.username === true ? <div>Error</div> : null}
            </div>
          </div>
          <div className='st'>
            <textarea
              name='content'
              value={objRate?.content || ''}
              onChange={handleInputChange}
              placeholder='Fikringiz qoldiring...'
            ></textarea>
            {objRateE.content === true ? <div>Error</div> : null}
          </div>
          <div className='bs'>
            <button type='submit' className='btn1'>
              Baholash
            </button>
            <button
              onClick={() => {
                modal();
                setObjdRate({
                  rate: 0,
                  name: '',
                  username: '',
                  content: '',
                });
                setObjRateE({
                  name: false,
                  username: false,
                  content: false,
                });
              }}
              className='btn2'
            >
              Bekor qilish
            </button>
          </div>
        </form>
      </div>
      <BodyHidden />
    </RateST>
  );
};

export default Rates;
