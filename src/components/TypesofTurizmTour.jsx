import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Link } from 'react-router-dom';
import StarRatings from 'react-star-ratings';

const TypesStyle = styled.div`
  margin-bottom: 40px;
  h3 {
    font-size: 20px;
    line-height: 24px;
    color: rgb(0, 29, 86);
    margin-top: 40px;
    margin-bottom: 20px;
  }
  .village {
    &:hover {
      box-shadow: rgb(0 0 0 / 10%) 0px 10px 20px, rgb(0 0 0 / 10%) 0px 6px 6px;
      background: rgb(250, 250, 250);
      img {
        border-bottom-right-radius: 0px;
        border-bottom-left-radius: 0px;
        transition: all 400ms ease 0s;
      }
    }
    img {
      width: 100%;
      height: 191px;
      border-radius: 20px;
      object-fit: cover;
      transition: all 400ms ease 0s;
    }
    border-radius: 20px;
    .text {
      margin-left: 12px;
      margin-top: 16px;
      font-size: 16px;
      line-height: 19px;
      color: rgb(0, 29, 86);
    }
    .text2 {
      padding: 0px 12px;
      margin-top: 4px;
      font-size: 14px;
      line-height: 20px;
      color: rgb(128, 141, 166);
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    .bottom {
      background: rgb(250, 250, 250);
      border-radius: 12px;
      padding: 8px 12px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 15px;
      .stars {
        display: flex;
        gap: 10px;
      }
      .review {
        font-weight: 400;
        font-size: 14px;
        line-height: 20px;
        color: #808da6;
      }
    }
  }
`;

const TypesofTurizmTour = (props) => {
  const { h3, types } = props;

  return (
    <>
      <TypesStyle>
        <h3 className='container'>{h3}</h3>
        <div className='container'>
          <Swiper
            slidesPerView={1}
            spaceBetween={24}
            // loop={true}
            rewind={true}
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
            {types?.map((e, index) => (
              <SwiperSlide key={index} className='village'>
                <Link to={`/catalog/${e.slug}`}>
                  <img src={e.image} alt='' />
                  <p className='text'>{e.name}</p>
                  <p className='text2'>{e.description}</p>
                  <div className='bottom'>
                    <div className='stars'>
                      <StarRatings
                        rating={
                          e.reviews_avg.reviews_avg === null
                            ? 0
                            : e.reviews_avg.reviews_avg
                        }
                        starRatedColor='#F39035'
                        // changeRating={this.changeRating}
                        numberOfStars={5}
                        name='rating'
                        starDimension='16px'
                        starSpacing='2px'
                      ></StarRatings>
                      <div>
                        {e.reviews_avg.reviews_avg === null
                          ? ''
                          : e.reviews_avg.reviews_avg}
                      </div>
                    </div>

                    <div className='review'>
                      {e.reviews_avg.reviews_count} ta baho
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </TypesStyle>
    </>
  );
};

export default TypesofTurizmTour;
