import React, { useState } from 'react';
import Moment from 'react-moment';
import styled from 'styled-components';
import { Autoplay, Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import star from '../images/star.svg';

const LastStyle = styled.div`
  background-color: #fafafa;
  margin-top: 48px;
  padding: 28px 0;
  h3 {
    font-size: 20px;
    line-height: 24px;
    color: rgb(0, 29, 86);
    margin-bottom: 20px;
    margin-top: 30px;
  }
  .lm {
  }
  .marks {
    display: flex;
    .mark {
      background: #ffffff;
      border: 1px solid #e9ebee;
      border-radius: 20px;
      padding: 24px;
      width: 100% !important;
      flex-shrink: 1;
      .date {
        font-weight: 400;
        font-size: 14px;
        line-height: 20px;
        color: #808da6;
        display: flex;
        justify-content: flex-end;
      }
      p {
        font-weight: 400;
        font-size: 14px;
        line-height: 20px;
        color: #808da6;
        margin-bottom: 16px;
      }
      .commit {
        display: flex;
        justify-content: space-between;
        align-items: center;
        span {
          font-weight: 500;
          font-size: 16px;
          line-height: 20px;
          color: #001d56;
        }
        .ib {
          display: flex;
          align-items: center;
          gap: 5px;
        }
      }
    }
  }
`;

const LastMarks = (props) => {
  const { h3, marks } = props;
  return (
    <LastStyle>
      <h3 className='container'>{h3}</h3>
      <div className='container lm'>
        <Swiper
          rewind={true}
          loop={true}
          slidesPerView={2}
          spaceBetween={10}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          modules={[Autoplay, Pagination, Navigation]}
          className='mySwiper marks container'
        >
          {marks?.map((e, index) => (
            <SwiperSlide key={index} className='mark'>
              <p>{e.content}</p>
              <div className='commit'>
                <span>{e.fullname}</span>
                <div className='ib'>
                  <img src={star} alt='' />
                  <span className='ball'>{e.review}</span>
                </div>
              </div>
              <div className='date'>
                <Moment format='DD.MM.YYYY'>{e.updated_at}</Moment>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </LastStyle>
  );
};

export default LastMarks;
