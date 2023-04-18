import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import StarRatings from 'react-star-ratings';
import styled from 'styled-components';

const HotelsStyle = styled.div`
  h3 {
    font-size: 20px;
    line-height: 24px;
    color: rgb(0, 29, 86);
    margin-top: 40px;
  }
  .villages {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
  }
  .village {
    width: calc(100% - 359px);
    display: flex;
    flex-direction: row;
    align-items: stretch;
    gap: 20px;
    .inf {
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    img {
      width: 264px;
      height: 191px;
      border-radius: 20px;
      object-fit: cover;
      transition: all 400ms ease 0s;
    }
    border-radius: 20px;
    flex-basis: calc(25% - 30px);
    flex-grow: 1;
    /* flex-shrink: 1; */
    margin: 25px 25px 25px 0;
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
  .show {
    cursor: pointer;
  }
  .y {
    display: none;
  }

  @media only screen and (max-width: 770px) and (min-width: 320px) {
    .village {
      flex-direction: column;
      flex-grow: 1;
      gap: 16px;
      .inf {
        min-height: 191px;
        height: 100%;
      }
      img {
        width: 100%;
      }
    }
  }
  @media only screen and (max-width: 920px) and (min-width: 320px) {
    .village {
      width: 100%;
    }
  }
`;

const Hotels = (props) => {
  const {
    h3,
    village,
    sub_slug,
    hotelV,
    restaurantV,
    tourV,
    famousV,
    showMoreHotel,
    showMoreRestaurant,
    showMoreTour,
    showMoreFamous,
  } = props;

  return (
    <>
      <HotelsStyle>
        <h3 className='container'>{h3}</h3>
        <div className='container villages'>
          {village
            ?.slice(
              0,
              sub_slug === 'hotel'
                ? hotelV
                : sub_slug === 'restourant'
                ? restaurantV
                : sub_slug === 'famous'
                ? famousV
                : sub_slug === 'tour'
                ? tourV
                : null
            )
            .map((e, index) => {
              const { image, name, description, reviews_avg, slug } = e;
              return (
                <Link
                  to={`/catalog/${sub_slug}/${slug}`}
                  className='village'
                  key={index}
                >
                  <div className='im'>
                    <img src={image} alt='' />
                  </div>
                  <div className='inf'>
                    <div className='pt'>
                      <p className='text'>{name}</p>
                      <p className='text2'>{description}</p>
                    </div>
                    <div className='bottom'>
                      <div className='stars'>
                        <StarRatings
                          rating={
                            reviews_avg.reviews_avg === null
                              ? 0
                              : reviews_avg.reviews_avg
                          }
                          starRatedColor='#F39035'
                          numberOfStars={5}
                          name='rating'
                          starDimension='16px'
                          starSpacing='2px'
                        ></StarRatings>
                        <div>
                          {reviews_avg.reviews_avg === null
                            ? ''
                            : reviews_avg.reviews_avg}
                        </div>
                      </div>

                      <div className='review'>
                        {reviews_avg.reviews_count} ta baho
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
        </div>
        {village?.slice(
          0,
          sub_slug === 'hotel'
            ? hotelV
            : sub_slug === 'restourant'
            ? restaurantV
            : sub_slug === 'famous'
            ? famousV
            : sub_slug === 'tour'
            ? tourV
            : null
        ).length !== village.length ? (
          <div
            className={village.length > 3 ? 'container show n' : 'show y'}
            onClick={
              sub_slug === 'hotel'
                ? showMoreHotel
                : sub_slug === 'restourant'
                ? showMoreRestaurant
                : sub_slug === 'famous'
                ? showMoreFamous
                : sub_slug === 'tour'
                ? showMoreTour
                : null
            }
          >
            Add
          </div>
        ) : null}
      </HotelsStyle>
    </>
  );
};
export default Hotels;
