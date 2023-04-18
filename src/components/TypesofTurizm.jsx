import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const TypesStyle = styled.div`
  margin-top: 90px;
  h3 {
    font-size: 20px;
    line-height: 24px;
    color: rgb(0, 29, 86);
    margin-bottom: 21px;
  }
  .type {
    position: relative;
    height: 326px;
    border-radius: 20px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 20px;
    }
    .ps {
      display: flex;
      justify-content: center;
    }
    .ps-i {
      padding: 14px 0;
      position: absolute;
      background-color: #fff;
      border-radius: 12px;
      bottom: 14px;
      text-align: center;
      width: calc(100% - 45px);
      p {
        &:nth-child(1) {
          font-weight: 600;
          font-size: 16px;
          line-height: 19px;
          color: rgb(0, 29, 86);
        }
        &:nth-child(2) {
          font-size: 14px;
          line-height: 20px;
          color: rgb(128, 141, 166);
        }
      }
    }
  }
  @media (max-width: 1000px) and (min-width: 576px) {
  }
  @media only screen and (max-width: 576px) and (min-width: 320px) {
  }
`;

const TypesofTurizm = (props) => {
  const { h3, types } = props;

  return (
    <>
      <TypesStyle id='types'>
        <h3 className='container'>{h3}</h3>
        <div className='container'>
          <Swiper
            slidesPerView={1}
            spaceBetween={24}
            loop={true}
            // rewind={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            breakpoints={{
              1000: {
                slidesPerView: 4,
              },
              640: {
                slidesPerView: 2,
              },
            }}
            modules={[Autoplay]}
            className='mySwiper'
          >
            {types.map((e, index) => (
              <SwiperSlide key={index} className='type'>
                <img src={e.image} alt='' />
                <div className='ps'>
                  <div className='ps-i'>
                    <p>{e.name}</p>
                    <p>{e.villages_count.villages_count} ta joy</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </TypesStyle>
    </>
  );
};

export default TypesofTurizm;
