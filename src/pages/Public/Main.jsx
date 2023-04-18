import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import LastMarks from '../../components/LastMarks';
import TourVillages from '../../components/TourVillages';
import TypesofTurizm from '../../components/TypesofTurizm';
import fon from '../../images/fon.jpg';
import { getLanguage } from '../../helpers/language';
import { GetNotAuthInstance } from '../../helpers/httpClient';
import Layer from '../../layout/Layer';
import { Link } from 'react-router-dom';

const MainStyle = styled.div`
  h3 {
    font-size: 20px;
    line-height: 24px;
    color: rgb(0, 29, 86);
  }
  .to {
    margin-bottom: 115px;
    a {
      color: #fff;
      margin: 24px auto;
      width: 360px;
      padding: 8px 0;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #f34c35;
      border-radius: 8px;
    }
  }
  .baner {
    margin-top: 96px;
    margin-bottom: 50px;
    border-radius: 20px;
    position: relative;
    height: 480px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    /* width: 100%; */
    /* background-image: url(${fon}); */
    /* background-size: cover; */
    /* padding: 154px 0; */
    .fon {
      object-fit: cover;
      position: absolute;
      border-radius: 20px;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
    .baner-info {
      position: absolute;
      top: 0px;
      left: 0px;
      width: 100%;
      height: 100%;
      background: rgb(0, 0, 0);
      opacity: 0.3;
      border-radius: 20px;
    }
    h2 {
      position: relative;
      text-align: center;
      color: #fff;
      margin-bottom: 48px;
      margin-left: auto;
      margin-right: auto;
      max-width: 600px;
      font-size: 32px;
      line-height: 38px;
    }
    /* input {
      position: relative;
      width: 816px;
      height: 48px;
      padding: 14px 18px;
      display: block;
      margin: 0 auto;
      border-radius: 12px;
      outline: none;
      border: 0;
    } */
    .searchPlace {
      position: relative;
      width: 816px;
      margin: 0 auto;
      input {
        border-radius: 12px;
        outline: none;
        border: 0;
        width: 100%;
        height: 48px;
        display: block;
        padding: 14px 18px;
      }
      .searchRes {
        background: #fff;
        margin-top: 2px;
        border-radius: 12px;
        position: absolute;
        width: 100%;
        .not {
          display: flex;
          justify-content: center;
          padding: 10px 0px;
        }
        .get {
          display: flex;
          flex-direction: column;
          overflow: scroll;
          overflow-x: hidden;
          overflow-y: auto;
          max-height: 150px;
          a {
            padding-top: 7px;
            padding-bottom: 7px;
            padding-left: 10px;
            width: 100%;
            display: flex;
            align-items: center;
            gap: 10px;
            border-radius: 12px;
            &:hover {
              background: #010148;
              color: #fff;
            }
            img {
              width: 70px;
              height: 30px;
              object-fit: cover;
              border-radius: 20px;
            }
          }
        }
      }
    }
  }
  @media (max-width: 992px) and (min-width: 576px) {
    .baner {
      .searchPlace {
        width: calc(100% - 40px);
      }
    }
  }
  @media only screen and (max-width: 576px) and (min-width: 320px) {
    .baner {
      .searchPlace {
        width: calc(100% - 40px);
      }
    }
    .to {
      a {
        width: 260px !important;
      }
    }
  }
`;

const Main = () => {
  const [show, setShow] = useState(false);
  const [categoriesList, setCategoriesList] = useState([]);
  const [village, setVillage] = useState([]);
  const [marks, setMarks] = useState([]);
  const [famous, setFamous] = useState([]);
  const [popularV, setPopularV] = useState([]);
  const [loading, setLoading] = useState();

  const [searchVillage, setSearchVillage] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [typingTimeOut, setTypingTimeOut] = useState(0);

  const { i18n } = useTranslation();
  const lan = getLanguage();

  useEffect(() => {
    getCategories();
    getVillages();
    getReviews();
    getFamous();
    getPopularV();
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, [i18n.language]);

  // const handleShow = () => {
  //   if (window.innerWidth > 996) {
  //     setShow(true);
  //   } else {
  //     setShow(false);
  //   }
  // };

  const getCategories = () => {
    GetNotAuthInstance()
      .get(`/api/v1/village/category/`)
      .then((result) => {
        let data = result.data;
        // console.log(data);
        setCategoriesList(data);
      })
      .catch((err) => {});
  };
  const getVillages = () => {
    setLoading(true);
    GetNotAuthInstance()
      .get('/api/v1/village/village/')
      .then((res) => {
        setVillage(res.data.results);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const getReviews = () => {
    GetNotAuthInstance()
      .get('/api/v1/village/review/')
      .then((result2) => {
        // console.log(result2);
        setMarks(result2.data.results);
      })
      .catch((err) => {});
  };
  const getFamous = () => {
    GetNotAuthInstance()
      .get('/api/v1/village/famous-places/')
      .then((res) => {
        setFamous(res.data.results);
      })
      .catch((err) => {});
  };
  const getPopularV = () => {
    GetNotAuthInstance()
      .get('/api/v1/village/village/?popular=1&page=1&page_size=4')
      .then((res) => {
        setPopularV(res.data.results);
      })
      .catch((err) => {});
  };

  let recent = window.localStorage.getItem('recent');
  recent = JSON.parse(recent?.length ? recent : '[]');
  let recent1 = [];
  for (let i = 0; i < recent.length; i++) {
    for (let m = 0; m < village.length; m++)
      if (recent[i] === village[m].id) {
        recent1.unshift(village[m]);
      }
  }

  // window.addEventListener('resize', handleShow);

  const handleSearchVillage = (e) => {
    setSearchVillage(e.target.value);
    let page = 1;
    let next_url = `api/v1/village/village/?page=${page}&page_size=30`;
    setTypingTimeOut(
      setTimeout(() => {
        getVillageByName(page, next_url, e.target.value);
      }, 300)
    );

    if (typingTimeOut) {
      clearTimeout(typingTimeOut);
    }
  };

  const getVillageByName = (
    page = 1,
    next_url = `api/v1/village/village/page=${page}&page_size=30`,
    search = ''
  ) => {
    let s = '';
    if (search) {
      s = '&search=' + search;
    }
    if (search !== '') {
      GetNotAuthInstance()
        .get(next_url + s)
        .then((res) => {
          if (res.status === 200) {
            const result = res?.data?.results;
            if (Array.isArray(result)) {
              setSearchResult(result);
            } else {
              setSearchResult([]);
            }
          }
        })
        .catch((err) => {
          setSearchResult([]);
        });
    } else {
      setSearchResult([]);
    }
  };

  return (
    <>
      {loading ? (
        <Layer />
      ) : (
        <MainStyle>
          <div className='container'>
            <div className='baner'>
              <img src={fon} alt='' className='fon' />
              <div className='baner-info'></div>
              <h2>
                O'zingiz uchun qiziqarli bo'lgan qishloqlar hayoti bilan
                tanishing
              </h2>
              <div className='searchPlace'>
                <input
                  type='search'
                  name=''
                  id=''
                  placeholder='Mahhala nomi'
                  onChange={handleSearchVillage}
                  value={searchVillage}
                />
                <div className='searchRes'>
                  {searchVillage !== '' && searchResult?.length > 0 ? (
                    <div className='get'>
                      {searchResult?.map((e, index) => (
                        <Link to={`/catalog/${e?.slug}`} key={index}>
                          <img src={e.image} alt='' />
                          <span>{e.name}</span>
                        </Link>
                      ))}
                    </div>
                  ) : searchVillage !== '' ? (
                    <div className='not'>Siz izlayotgan qishloq topilmadi</div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>

          <TourVillages h3={'Turizm mahallalari'} village={village} />

          <div className='to container' id='types'>
            <Link to='/catalog'>Katalogga o'tish</Link>
          </div>

          {recent1.length > 0 ? (
            <TourVillages h3={"Oxirgi ko'rilgan"} village={recent1} />
          ) : null}

          <TypesofTurizm
            h3={'Turizm turlari'}
            types={categoriesList}
            style={{ marginTop: '90px' }}
          />

          <LastMarks h3={"So'nggi baholar"} marks={marks} />

          {famous.length > 0 ? (
            <TourVillages h3={'Diqqatga sazovor joy'} village={famous} />
          ) : null}
          {popularV.length > 0 ? (
            <TourVillages h3={'Ommabop qishloqlar'} village={popularV} />
          ) : null}
          <div style={{ height: '40px' }}></div>
        </MainStyle>
      )}
    </>
  );
};

export default Main;
