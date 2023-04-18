import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import StarRatings from 'react-star-ratings';
import styled from 'styled-components';

const FiltersStyle = styled.div`
  .marsh {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-right: 50px;
    margin-bottom: 20px;
    div {
      font-size: 16px;
      color: rgb(0, 29, 86);
      font-weight: 700;
    }
    a {
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 12px;
      background-color: rgb(243, 76, 53);
      padding: 14px;
      color: #fff;
      width: 225px;
    }
  }
  h3 {
    font-size: 20px;
    line-height: 24px;
    color: rgb(0, 29, 86);
  }
  .villages {
    display: flex;
    flex-wrap: wrap;
  }
  .village {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-radius: 20px;
    flex-basis: calc(33% - 30px);
    /* flex-grow: 1; */
    /* flex-shrink: 1; */
    margin: 25px 25px 25px 0;
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
    .text0 {
      padding: 0px 12px;
      margin-top: 4px;
      font-size: 14px;
      line-height: 20px;
      color: rgb(128, 141, 166);
      /* display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden; */
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
    .plus {
      border-radius: 12px;
      padding: 10px 12px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
      margin-top: 5px;
      cursor: pointer;
      font-size: 14px;
      line-height: 20px;
      outline: none;
      border: none;
      width: 100%;
    }
    .plus.non {
      background: rgb(0, 29, 86);
    }
    .plus.active {
      background: rgb(243, 76, 53);
    }
  }
  @media (max-width: 1073px) and (min-width: 834px) {
    .village {
      flex-grow: 1;
      flex-shrink: 0;
      min-width: 264px;
      &:nth-child(2n) {
        margin-right: 0;
      }
    }
  }
  @media only screen and (max-width: 834px) and (min-width: 576px) {
    .village {
      flex-grow: 1;
      flex-basis: 264px;
      &:nth-child(2n) {
        margin-right: 0;
      }
    }
  }
  @media only screen and (max-width: 576px) and (min-width: 320px) {
    .village {
      flex-grow: 1;
      flex-basis: 264px;
      margin-right: 0;
    }
  }
`;

const CatalogVillages = (props) => {
  const { h3, village, addLatLong, removeLatLong, strRoute } = props;

  let latLongV = window.localStorage.getItem('getLatLong');
  latLongV = JSON.parse(latLongV?.length ? latLongV : '[]');

  return (
    <>
      <FiltersStyle>
        <h3 className='container'>{h3}</h3>
        <div className='container villages'>
          {village?.map((e, index) => {
            const {
              image,
              name,
              model,
              description,
              reviews_avg,
              slug,
              village,
              unique_id,
              latitude,
              longitude,
            } = e;
            return (
              <div className='village' key={index}>
                <Link to={`/catalog/${slug}`} className='p1'>
                  <img src={image} alt='' />
                  <p className='text0'>{model}</p>
                  <p className='text'>{name}</p>
                  <p className='text2'>{description}</p>
                </Link>
                <div className='p2'>
                  <Link to={`/catalog/${slug}`} className='bottom'>
                    <div className='stars'>
                      <StarRatings
                        rating={
                          reviews_avg.reviews_avg === null
                            ? 0
                            : reviews_avg.reviews_avg
                        }
                        starRatedColor='#F39035'
                        // changeRating={this.changeRating}
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
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </FiltersStyle>
    </>
  );
};

export default CatalogVillages;
