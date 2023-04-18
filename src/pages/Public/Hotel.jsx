import React, { useEffect } from 'react';
import { useState } from 'react';
import ImageGallery from 'react-image-gallery';
import { Link, useParams } from 'react-router-dom';
import StarRatings from 'react-star-ratings';
import styled from 'styled-components';
import Rate from '../../components/Rate';
import { getLanguage } from '../../helpers/language';
import { GetNotAuthInstance } from '../../helpers/httpClient';
import { useTranslation } from 'react-i18next';
import 'react-image-gallery/styles/css/image-gallery.css';
import Hotels from '../../components/Hotels';
import LastMarks from '../../components/LastMarks';
import opac from '../../images/opac.png';
import Layer from '../../layout/Layer';
import TypesofTurizmTour from '../../components/TypesofTurizmTour';
import ImpInfo from '../../components/ImpInfo';
import { Map, Placemark, TypeSelector, YMaps } from 'react-yandex-maps';
import Request from '../../components/Request';

const HotelStyle = styled.div`
  h3 {
    font-size: 20px;
    line-height: 24px;
    color: rgb(0, 29, 86);
    margin-bottom: 20px;
    margin-top: 30px;
  }
  .map {
    width: calc(100% - 359px);
    ymaps {
      border-radius: 20px;
    }
  }
  .links {
    margin-top: 105px;
    margin-bottom: 40px;
    font-size: 14px;
    color: rgb(128, 141, 166) !important;
  }
  .nv {
    margin-bottom: 24px;
    .rev0 {
      display: inline;
      font-size: 16px;
      line-height: 20px;
      color: rgb(0, 29, 86);
      margin-left: 5px;
      font-weight: 600;
    }
    .review {
      color: rgb(128, 141, 166);
      display: inline;
      margin-left: 18px;
      font-size: 16px;
      line-height: 18px;
    }
  }
  .t1 {
    font-size: 24px;
    line-height: 28px;
    font-weight: 700;
    color: rgb(0, 29, 86);
    margin-bottom: 10px;
  }
  .places-c {
    display: flex;
    gap: 24px;
    align-items: flex-start;
    justify-content: space-between;
    .places {
      width: calc(100% - 359px);
      /* img {
        width: 100%;
        object-fit: cover;
        max-height: 432px !important;
      } */
    }
    .card {
      background: rgb(250, 250, 250);
      border-radius: 20px;
      padding: 24px;
      flex-basis: 359px;
      min-height: 150px;
      /* height: 359px; */
      /* flex-shrink: 1; */
      flex-grow: 1;
      .t1 {
        font-size: 16px;
        line-height: 19px;
        color: rgb(0, 29, 86);
        font-weight: 600;
      }
      .t2 {
        font-size: 15px;
        line-height: 20px;
        margin-top: 8px;
        margin-bottom: 24px;
        color: rgb(0, 29, 86);
      }
      .t3 {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 16px;
        span {
          font-size: 16px;
          line-height: 20px;
          color: rgb(0, 29, 86);
          font-weight: 600;
        }
        .i {
          color: rgb(128, 141, 166);
          font-size: 15px;
          line-height: 20px;
        }
      }
      .howto,
      .l-review {
        font-weight: 600;
        font-size: 15px;
        line-height: 20px;
        border-radius: 12px;
        display: block;
        width: 100%;
        padding: 14px;
        transition: all 400ms ease 0s;
      }
      .howto {
        background: rgb(255, 255, 255);
        border: 1px solid rgb(243, 76, 53);
        color: rgb(243, 76, 53);
        margin-bottom: 14px;
        text-align: center;
        width: auto;
        &:hover {
          color: #fff;
          background: rgb(243, 76, 53);
        }
      }
      .l-review {
        background: rgb(255, 255, 255);
        border: 1px solid rgb(0, 29, 86);
        color: rgb(0, 29, 86);
        margin-bottom: 14px;
        text-align: center;
        width: 100%;
        cursor: pointer;
        &:hover {
          color: #fff;
          background: rgb(0, 29, 86);
        }
      }
    }
  }
  .information {
    width: calc(100% - 359px);
    margin-top: 75px;
    .h1 {
      font-size: 20px;
      line-height: 24px;
      color: rgb(0, 29, 86);
      font-weight: 700;
    }
    .h2 {
      font-size: 15px;
      line-height: 20px;
      color: rgb(0, 29, 86);
      margin-top: 16px;
      margin-right: 50px;
      overflow: hidden;
    }
    .h2non {
      max-height: 200px;
      position: relative;
      img {
        position: absolute;
        z-index: 999;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 100px;
      }
    }
    .h2active {
      img {
        display: none;
      }
    }
    .stretch {
      text-transform: uppercase;
      text-decoration: underline;
      margin-top: 30px;
      cursor: pointer;
    }
  }

  .cardz {
    margin-top: 20px;
    .howto {
      background: rgb(255, 255, 255);
      border: 1px solid rgb(243, 76, 53);
      color: rgb(243, 76, 53);
      margin-bottom: 14px;
      text-align: center;
      width: 252px;
      font-weight: 600;
      font-size: 15px;
      line-height: 20px;
      border-radius: 12px;
      display: block;
      padding: 14px;
      transition: all 400ms ease 0s;
      &:hover {
        color: #fff;
        background: rgb(243, 76, 53);
      }
    }
  }

  @media (max-width: 870px) and (min-width: 320px) {
    .places-c {
      flex-wrap: wrap;
    }
    .places {
      width: 100% !important;
    }
  }
  @media only screen and (max-width: 920px) and (min-width: 320px) {
    .information {
      width: 100%;
    }
  }
`;

const Lastm = styled.div`
  max-width: 1128px;
  margin: 0 auto;
  .l-review {
    cursor: pointer;
    background: rgb(255, 255, 255);
    border: 1px solid rgb(243, 76, 53);
    color: rgb(243, 76, 53);
    margin-bottom: 14px;
    text-align: center;
    width: 300px;
    font-weight: 600;
    font-size: 15px;
    line-height: 20px;
    border-radius: 12px;
    display: block;
    padding: 14px;
    transition: all 400ms ease 0s;
    &:hover {
      color: #fff;
      background: rgb(243, 76, 53);
    }
  }
  div {
    background-color: white;
    margin-top: 0 !important;
  }
`;

const Hotel = () => {
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [modal1, setModal1] = useState(false);
  const [detail, setDetail] = useState();
  const [objRate, setObjdRate] = useState({
    rate: 0,
    name: '',
    username: '',
    content: '',
  });
  const [objRate1, setObjdRate1] = useState({
    name: '',
    username: '',
    content: '',
    email: '',
    tel: '',
  });
  const [objRateE, setObjRateE] = useState({});
  const [objRateE1, setObjRateE1] = useState({});
  const [restaurantV, setRestaurantV] = useState(3);

  const { i18n } = useTranslation();
  const lan = getLanguage();

  const { slug } = useParams();

  const handleRate = (num) => {
    setObjdRate({ ...objRate, rate: num });
  };

  const handleInputChange = (e) => {
    setObjdRate({ ...objRate, [e.target.name]: e.target.value });
    setObjRateE({ ...objRateE, [e.target.name]: false });
  };
  const handleInputChange1 = (e) => {
    setObjdRate1({ ...objRate1, [e.target.name]: e.target.value });
    setObjRateE1({ ...objRateE1, [e.target.name]: false });
  };
  const handleChanglePhone = (e) => {
    setObjdRate1({ ...objRate1, tel: e });
    setObjRateE1({ ...objRateE1, tel: false });
  };
  console.log(objRateE1);

  useEffect(() => {
    getDetail();
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, [i18n.language]);

  const getDetail = () => {
    setLoading(true);
    GetNotAuthInstance()
      .get(`/api/v1/hotel/hotel/${slug}/`)
      .then((res) => {
        console.log(res.data);
        setDetail(res.data);
      })
      .catch((err) => {})
      .finally(() => {
        setLoading(false);
      });
  };

  const showMoreRestaurant = () => {
    setRestaurantV((pValue) => pValue + 3);
  };

  const handlePost = (e) => {
    e.preventDefault();
    let t = true;
    let error = {};

    if (!objRate?.name) {
      t = false;
      error = { ...error, name: true };
    }
    if (!objRate?.username) {
      t = false;
      error = { ...error, username: true };
    }
    if (!objRate?.content) {
      t = false;
      error = { ...error, content: true };
    }

    if (t) {
      setObjdRate({
        name: '',
        username: '',
        content: '',
      });
      setModal(false);
    } else {
      setObjRateE(error);
    }
  };
  const handlePost1 = (e) => {
    e.preventDefault();
    let t1 = true;
    let error1 = {};

    if (!objRate1?.name) {
      t1 = false;
      error1 = { ...error1, name: true };
    }
    if (!objRate1?.username) {
      t1 = false;
      error1 = { ...error1, username: true };
    }
    if (!objRate1?.content) {
      t1 = false;
      error1 = { ...error1, content: true };
    }
    if (!objRate?.email) {
      t1 = false;
      error1 = { ...error1, email: true };
    }
    if (!objRate?.tel) {
      t1 = false;
      error1 = { ...error1, tel: true };
    }

    if (t1) {
      setObjdRate1({
        name: '',
        username: '',
        content: '',
        email: '',
        tel: '',
      });
      setModal1(false);
    } else {
      setObjRateE1(error1);
    }
  };

  let a = [];
  detail?.images.forEach((e) => {
    a = [
      ...a,
      {
        original: e.image,
        thumbnail: e.image,
      },
    ];
  });

  return (
    <>
      {loading ? (
        <Layer />
      ) : (
        <HotelStyle>
          <div className='links container'>
            <Link to='/'>Asosiy </Link>\<Link to='/'> Turizm mahallalari </Link>
            <span>\ {detail?.name}</span>
          </div>
          <div className='container nv'>
            <p className='t1'>{detail?.name}</p>
            <StarRatings
              rating={
                detail?.reviews_avg.reviews_avg === null
                  ? 0
                  : detail?.reviews_avg.reviews_avg
              }
              starRatedColor='#F39035'
              numberOfStars={5}
              name='rating'
              starDimension='16px'
              starSpacing='2px'
            ></StarRatings>
            <div className='rev0'>
              {detail?.reviews_avg.reviews_avg === null
                ? '0'
                : detail?.reviews_avg.reviews_avg}
            </div>
            <div className='review'>
              {detail?.reviews_avg.reviews_count} ta fikr
            </div>
          </div>
          <div className='container places-c'>
            <div className='places'>
              <ImageGallery items={a} autoPlay={false} />
            </div>
            <div className='card'>
              <p className='t1'>Qishloq haqida</p>
              <p className='t2'>{detail?.description}</p>
              <a href={detail?.location} target='_blank' className='howto'>
                Qanday borish mumkin ?
              </a>
              <button
                href=''
                className='l-review'
                onClick={() => setModal1(true)}
              >
                Ariza qoldirish
              </button>
            </div>
          </div>

          <ImpInfo h3="Muhim ma'lumot" data={detail} />
          <Lastm>
            <LastMarks
              marks={detail?.reviews}
              h3='Joylashtirish vositasi haqidagi fikrlar

              '
            />
            <div className='container'>
              <button
                href=''
                className='l-review'
                onClick={() => setModal(true)}
              >
                Baho berish
              </button>
            </div>
          </Lastm>

          {detail?.nearby_restaurants &&
          detail?.nearby_restaurants.length > 0 ? (
            <Hotels
              village={detail?.nearby_restaurants}
              h3='Atrofdagi oshxonalar'
              sub_slug={'restourant'}
              restaurantV={restaurantV}
              showMoreRestaurant={showMoreRestaurant}
            />
          ) : null}

          {detail?.latitude && detail?.longitude ? (
            <div className='container'>
              <h3>Xaritadagi joylashuvi</h3>
              <div className='map'>
                <YMaps>
                  <Map
                    width={'100%'}
                    height={'400px'}
                    defaultState={{
                      center: [detail?.latitude, detail?.longitude],
                      zoom: 15,
                    }}
                  >
                    <TypeSelector
                      options={{
                        float: 'right',
                      }}
                    />
                    <Placemark
                      geometry={[detail?.latitude, detail?.longitude]}
                    />
                  </Map>
                </YMaps>
              </div>

              <div className='cardz'>
                <a href={detail?.location} target='_blank' className='howto'>
                  Qanday borish mumkin ?
                </a>
              </div>
            </div>
          ) : null}

          {detail?.other_offers && detail?.other_offers.length > 0 ? (
            <TypesofTurizmTour
              h3='Bu qishloqlar bilan ham tanishing'
              types={detail?.other_offers}
            />
          ) : null}

          {modal === true ? (
            <Rate
              modal={setModal}
              handleRate={handleRate}
              handleInputChange={handleInputChange}
              objRate={objRate}
              handlePost={handlePost}
              setObjdRate={setObjdRate}
              objRateE={objRateE}
              setObjRateE={setObjRateE}
            />
          ) : null}
          {modal1 === true ? (
            <Request
              modal={setModal1}
              handleInputChange={handleInputChange1}
              handleChanglePhone={handleChanglePhone}
              objRate={objRate1}
              handlePost={handlePost1}
              setObjdRate={setObjdRate1}
              objRateE={objRateE1}
              setObjRateE={setObjRateE1}
            />
          ) : null}
        </HotelStyle>
      )}
    </>
  );
};

export default Hotel;
