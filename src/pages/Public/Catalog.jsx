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
import CatalogVillages from '../../components/CatalogVillages';
import { forIn, get } from 'lodash';

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
    justify-content: space-between;
    gap: 30px;
  }
  @media only screen and (max-width: 834px) and (min-width: 320px) {
    .main {
      flex-wrap: wrap;
    }
  }
`;

const Catalog = () => {
  const [loading, setLoading] = useState(false);
  const [detail, setDetail] = useState();
  const [categoryList, setCategoryList] = useState();
  const [filters, setFilters] = useState({
    category: [],
    is_popular: [],
    popular: [],
  });
  const [searchParams] = useSearchParams();

  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const lan = getLanguage();

  const changeFilter = (name = '', value) => {
    let f = { ...filters };

    if (get(f, name, []).includes(value)) {
      let lll = [];
      get(f, name, []).forEach((e) => {
        if (e !== value) lll.push(e);
      });
      f = { ...f, [name]: lll }; // in active
    } else {
      f = { ...f, [name]: [...get(f, name, []), value] }; // active uchun
    }

    setFilters(f);

    let params = '/catalog/?';
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
    setFilters({});
    let query = '/catalog';
    navigate(query);
  };

  useEffect(() => {
    let f = {};

    const s = [...searchParams];

    s.forEach((e) => {
      const [name, value] = e;

      let nVName = ['is_popular', 'popular', 'category'];

      let nvv = [];

      if (nVName.includes(name)) {
        value.split(',').forEach((i) => {
          nvv = [...nvv, i];
        }); // ko`plik uchun
      } else {
        nvv = value.split(','); // birlik uchun
      }

      if (name && value) f = { ...f, [name]: nvv };
    });

    setFilters(f);
    getDetail();
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, [i18n.language, window.location.search]);

  useEffect(() => {
    getFilter();
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, [i18n.language]);

  const getDetail = (next_url = ``) => {
    const windowUrl = window.location.search;
    const newStr = windowUrl.replaceAll(',', '&category=');
    setLoading(true);

    const urrr = next_url
      ? next_url
      : `api/v1/village/village/${newStr ? newStr : ''}`;
    // ${
    //     newStr ? '&' : '?'
    //   }page=${page}&page_size=10
    //   `;
    GetNotAuthInstance()
      .get(urrr)
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
      .get(`/api/v1/village/category/`)
      .then((res) => {
        setCategoryList(res.data);
      })
      .catch((err) => {});
  };

  return (
    <>
      {loading ? (
        <Layer />
      ) : (
        <Styles>
          <div className='links container'>
            <Link to='/'>Asosiy </Link>\ Turizm mahallalari
          </div>
          <div className='nv container'>
            <p className='h1'>Qishloqlar katalogi</p>
          </div>
          <div className='container'>
            <div className='main'>
              <Navbar
                filters={filters}
                clearFilter={clearFilter}
                changeFilter={changeFilter}
                categoryList={categoryList}
                village={detail}
              />
              <CatalogVillages
                village={detail}
                // addLatLong={addLatLong}
                // removeLatLong={removeLatLong}
                // strRoute={strRoute}
              />
            </div>
          </div>
        </Styles>
      )}
    </>
  );
};

export default Catalog;
