import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { GetNotAuthInstance } from '../../helpers/httpClient';
import Navbar from '../../components/Navbar';
import { getLanguage } from '../../helpers/language';
import Layer from '../../layout/Layer';
import Filters from '../../components/Filters';
import { get } from 'lodash';

const Styles = styled.div`
  .links {
    margin-top: 105px;
    margin-bottom: 40px;
    font-size: 14px;
    color: rgb(128, 141, 166) !important;
  }
  .nv .h1 {
    margin-bottom: 32px;
    font-size: 24px;
    font-weight: 700;
    line-height: 28px;
    color: rgb(0, 29, 86);
  }
  .main {
    display: flex;
    gap: 30px;
  }
  @media only screen and (max-width: 834px) and (min-width: 320px) {
    .main {
      flex-wrap: wrap;
    }
  }
`;

const getLocalStorage = () => {
  let infor = localStorage.getItem('infor');
  if (infor) {
    return (infor = JSON.parse(localStorage.getItem('infor')));
  } else {
    return [];
  }
};

const RouteFilter = () => {
  const [loading, setLoading] = useState(false);
  const [detail, setDetail] = useState();
  const [listV, setListV] = useState();

  const [latLongList, setLatLongList] = useState(getLocalStorage());

  const { i18n } = useTranslation();
  const lan = getLanguage();

  useEffect(() => {
    getFilter();
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, [i18n.language]);

  useEffect(() => {
    localStorage.setItem('infor', JSON.stringify(latLongList));
  }, [latLongList]);

  const getDetail = (next_url = ``) => {
    const windowUrl = window.location.search;
    const newM = windowUrl.replaceAll(',', '&model=');
    const newV = windowUrl.replaceAll(',', '&village=');
    setLoading(true);

    const ur = next_url
      ? next_url
      : `/api/v1/village/all-services${newV ? newV : newV ? newV : ''}`;
    GetNotAuthInstance()
      .get(ur)
      .then((res) => {
        setDetail(res.data.results);
      })
      .catch((err) => {})
      .finally(() => {
        setLoading(false);
      });
  };
  const getFilter = () => {
    GetNotAuthInstance()
      .get(`/api/v1/village/village/`)
      .then((res) => {
        setListV(res.data.results);
      })
      .catch((err) => {});
  };

  const addLatLong = (id, lat, long) => {
    let latLongV = window.localStorage.getItem('getLatLong');
    latLongV = JSON.parse(latLongV?.length ? latLongV : '[]');

    if (!(latLongV?.filter((i) => i?.unique_id === id)).length > 0)
      latLongV = [
        ...latLongV,
        { unique_id: id, latitude: lat, longitude: long },
      ];
    window.localStorage.setItem('getLatLong', JSON.stringify(latLongV));

    setLatLongList(latLongV);
  };

  const removeLatLong = (id) => {
    let latLongV = window.localStorage.getItem('getLatLong');
    latLongV = JSON.parse(latLongV?.length ? latLongV : '[]');
    let latLongVFiltered = latLongV.filter((i) => i?.unique_id !== id);

    window.localStorage.setItem('getLatLong', JSON.stringify(latLongVFiltered));

    setLatLongList(latLongVFiltered);
  };

  var lLongResult = '';

  if (latLongList.length > 0) {
    for (let i = 0; i < latLongList.length; i++) {
      lLongResult += `${latLongList[i].latitude}%2C${latLongList[i].longitude}~`;
    }
  }

  var strRoute = `https://yandex.com/maps/?mode=routes&rtext=${lLongResult.slice(
    0,
    -1
  )}&rtt=auto&z=7.7`;

  //   https://yandex.com/maps/?mode=routes&rtext=41.275968%2C69.800198~41.192640%2C69.764926&rtt=auto&z=12

  //  `41.275968%2C69.800198~41.192640%2C69.764926`

  //   [
  //     { id: 'FamousPlaces_3', latitude: 41.275968, longitude: 69.800198 },
  //     { id: 'FamousPlaces_2', latitude: 41.19264, longitude: 69.764926 },
  //   ];

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [filterR, setFilterR] = useState({
    is_papular: [],
    r: [],
    model: [],
    village: [],
  });

  const changeFilter = (name = '', value) => {
    let f = { ...filterR };

    if (get(f, name, []).includes(value)) {
      let lll = [];
      get(f, name, []).forEach((e) => {
        if (e !== value) lll.push(e);
      });
      f = { ...f, [name]: lll }; // in active
    } else {
      f = { ...f, [name]: [...get(f, name, []), value] }; // active uchun
    }

    setFilterR(f);

    let params = '/route-filter/?';
    for (const p in f) {
      let s = '';

      f[p].forEach((i) => {
        s += i + ',';
      });
      s = s.slice(0, -1);
      if (s) params += `&${p}=${s}`;
    }
    navigate(params);
  };

  const clearFilter = () => {
    setFilterR({});
    let query = '/route-filter';
    navigate(query);
  };

  useEffect(() => {
    let f = {};

    const s = [...searchParams];

    s.forEach((e) => {
      console.log(e);
      const [name, value] = e;

      let nVName = ['is_papular', 'r', 'model', 'village'];

      let nvv = [];

      if (nVName.includes(name)) {
        value.split(',').forEach((i) => {
          nvv = [...nvv, i];
        });
      } else {
        nvv = value.split(',');
      }

      if (name && value) f = { ...f, [name]: nvv };
    });

    setFilterR(f);
    getDetail();
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, [i18n.language, window.location.search]);

  return (
    <>
      {loading ? (
        <Layer />
      ) : (
        <Styles>
          <div className='links container'>
            <Link to='/'>Asosiy </Link>\ Marshrutni filtrlash
          </div>
          <div className='nv container'>
            <p className='h1'>Marshrutni filtrlash</p>
          </div>
          <div className='container'>
            <div className='main'>
              <Navbar
                villageC={detail}
                villageV={listV}
                changeFilterR={changeFilter}
                clearFilter={clearFilter}
                filterR={filterR}
              />
              <Filters
                village={detail}
                addLatLong={addLatLong}
                removeLatLong={removeLatLong}
                strRoute={strRoute}
              />
            </div>
          </div>
        </Styles>
      )}
    </>
  );
};

export default RouteFilter;
