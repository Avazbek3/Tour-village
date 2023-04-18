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
import {
  Map,
  Panorama,
  Placemark,
  TypeSelector,
  YMaps,
} from 'react-yandex-maps';
import Navigation from '../../layout/Navigation';

const KumushkanStyle = styled.div`
  .map {
    width: calc(100% - 359px);
    ymaps {
      border-radius: 20px;
    }
  }
  h3 {
    font-size: 20px;
    line-height: 24px;
    color: rgb(0, 29, 86);
    margin-bottom: 20px;
    margin-top: 30px;
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
      min-height: 450px;
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
    margin-bottom: 0 !important;
    padding-bottom: 0 !important;
  }
`;

const VillageDetail = () => {
  const [loading, setLoading] = useState(false);
  const [village, setVillage] = useState(false);

  const [modal, setModal] = useState(false);
  const [detail, setDetail] = useState();
  const [objRate, setObjdRate] = useState({
    rate: 0,
    name: '',
    username: '',
    content: '',
  });

  const [objRateE, setObjRateE] = useState({});
  const [textHide, setTextHide] = useState(true);
  const [textHide1, setTextHide1] = useState(true);
  const [hotelV, setHotelV] = useState(3);
  const [restaurantV, setRestaurantV] = useState(3);
  const [tourV, setTourV] = useState(3);
  const [famousV, setFamousV] = useState(3);

  const showMoreHotel = () => {
    setHotelV((pValue) => pValue + 3);
  };
  const showMoreRestaurant = () => {
    setRestaurantV((pValue) => pValue + 3);
  };
  const showMoreTour = () => {
    setTourV((pValue) => pValue + 3);
  };
  const showMoreFamous = () => {
    setFamousV((pValue) => pValue + 3);
  };

  const { t, i18n } = useTranslation();
  const lan = getLanguage();

  const { slug } = useParams();

  const handleRate = (num) => {
    setObjdRate({ ...objRate, rate: num });
  };

  const handleInputChange = (e) => {
    setObjdRate({ ...objRate, [e.target.name]: e.target.value });
    setObjRateE({ ...objRateE, [e.target.name]: false });
  };

  useEffect(() => {
    getDetail();
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, [i18n.language]);

  const addToRecent = (village__id = 0) => {
    let recent = window.localStorage.getItem('recent');
    recent = JSON.parse(recent?.length ? recent : '[]');
    if (!recent.includes(village__id)) recent = [village__id, ...recent];
    if (recent.length > 4) recent = recent.splice(0, 4);
    window.localStorage.setItem('recent', JSON.stringify(recent));
  };

  const getDetail = () => {
    setLoading(true);
    setVillage(true);
    GetNotAuthInstance()
      .get(`/api/v1/village/village/${slug}/`)
      .then((res) => {
        console.log(res.data);
        setDetail(res.data);
        addToRecent(res.data.id);
      })
      .catch((err) => {})
      .finally(() => {
        setLoading(false);
      });
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
        rate: 0,
        name: '',
        username: '',
        content: '',
      });
      setModal(false);
    } else {
      setObjRateE(error);
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
        <KumushkanStyle>
          <Navigation village={village} />
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
              {detail?.reviews_avg.reviews_count} {t('village.review')}
            </div>
          </div>
          <div className='container places-c'>
            <div className='places'>
              <ImageGallery items={a} autoPlay={false} />
            </div>
            <div className='card'>
              <p className='t1'>Qishloq haqida</p>
              <p className='t2'>{detail?.description}</p>
              <div className='t3'>
                <span>Mehmonxonalar soni</span>
                <div className='i'>
                  <u>{detail?.hotels.length}</u>
                </div>
              </div>
              <div className='t3'>
                <span>Tamaddixonalar soni</span>
                <div className='i'>
                  <u>{detail?.restaurants.length}</u>
                </div>
              </div>
              <div className='t3'>
                <span>Diqqatga sazovor joylar soni</span>
                <div className='i'>
                  <u>{detail?.famous_places.length}</u>
                </div>
              </div>
              <div className='t3'>
                <span>Joylashgan joyi</span>
                <a className='i' href='#'>
                  Xaritada ko'rish
                </a>
              </div>
              <a href={detail?.location} target='_blank' className='howto'>
                Qanday borish mumkin ?
              </a>
              <button
                href=''
                className='l-review'
                onClick={() => setModal(true)}
                id='history'
              >
                Baho qoldirish
              </button>
            </div>
          </div>

          <div className='container'>
            <div className='information'>
              <div className='h1'>Qishloq tarixi</div>
              <div className={textHide === true ? 'h2 h2non' : ' h2 h2active'}>
                {detail?.village_history}
                {detail?.village_history.length >= 1000 ? (
                  <img src={opac} />
                ) : (
                  <div id='about'></div>
                )}
              </div>
              {detail?.village_history.length >= 1000 ? (
                <div
                  className='stretch'
                  onClick={() => setTextHide(!textHide)}
                  id='about'
                >
                  {textHide === true ? 'Batafsil' : 'Yopish'}
                </div>
              ) : null}
            </div>
          </div>
          <div className='container'>
            <div className='information'>
              <div className='h1'>Qishloq etnografiyasi</div>
              <div
                className={textHide1 === true ? 'h2 h2non' : ' h2 h2active'}
                id='hotels'
              >
                {detail?.village_ethnography}
                {detail?.village_ethnography.length >= 1000 ? (
                  <img src={opac} />
                ) : null}
              </div>
              {detail?.village_ethnography.length >= 1000 ? (
                <div
                  className='stretch'
                  onClick={() => setTextHide1(!textHide1)}
                >
                  {textHide1 === true ? 'Batafsil' : 'Yopish'}
                </div>
              ) : null}
            </div>
          </div>

          {detail?.hotels && detail?.hotels.length > 0 ? (
            <Hotels
              village={detail?.hotels}
              h3='Mehmonxonalar va mehmon uylari'
              sub_slug={'hotel'}
              hotelV={hotelV}
              showMoreHotel={showMoreHotel}
            />
          ) : null}
          {detail?.restaurants && detail?.restaurants.length > 0 ? (
            <Hotels
              village={detail?.restaurants}
              h3='Tamaddixonalar'
              sub_slug={'restourant'}
              restaurantV={restaurantV}
              showMoreRestaurant={showMoreRestaurant}
              id='restaurant'
            />
          ) : null}
          {detail?.famous_places && detail?.famous_places.length > 0 ? (
            <Hotels
              village={detail?.famous_places}
              h3='Diqqatga sazovor joylar'
              sub_slug={'famous'}
              famousV={famousV}
              showMoreFamous={showMoreFamous}
            />
          ) : null}
          {detail?.tours && detail?.tours.length > 0 ? (
            <Hotels
              village={detail?.tours}
              h3='Qishloqqa turlar'
              sub_slug={'tour'}
              tourV={tourV}
              showMoreTour={showMoreTour}
            />
          ) : null}

          <Lastm>
            <LastMarks
              marks={detail?.reviews}
              h3='Qishloqqa berilgan baholar'
            />

            <div className='container'>
              <button
                href=''
                className='l-review'
                onClick={() => setModal(true)}
              >
                Baho qoldirish
              </button>
            </div>
          </Lastm>

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
        </KumushkanStyle>
      )}
    </>
  );
};

export default VillageDetail;
