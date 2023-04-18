import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import { getLanguage } from '../helpers/language';

const Mainstyle = styled.div`
  position: fixed;
  display: flex;
  justify-content: end;
  width: 100%;
  height: 100vh;
  z-index: 99;
  .layerM {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 29, 86, 0.5);
    z-index: 99;
  }
  .navM {
    position: relative;
    height: 100%;
    background: #fff;
    z-index: 200;
    padding-top: 20px;
  }
  .tm {
    width: 200px;
    transition: 4s;
    visibility: visible;
    opacity: 1;
    transition: 0.5s;
  }
  .nm {
    width: 0px;
    visibility: hidden;
    opacity: 0;
    transition: 0.5s;
  }
  .nList {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    a {
      font-size: 14px;
      color: rgb(0, 29, 86);
      font-size: 16px;
      &:hover,
      &:focus {
        color: red;
      }
    }
  }
  @media only screen and (max-width: 520px) {
    .tm {
      width: 100%;
    }
  }
`;
const BodyHidden = createGlobalStyle`
    body{
        overflow: hidden;
    }
`;

const MainNav = (props) => {
  const { t } = useTranslation();
  const lan = getLanguage();
  const { modal, setModal } = props;
  return (
    <Mainstyle>
      {modal ? <div className='layerM' /> : null}
      <div className={modal ? 'navM tm' : 'navM nm'}>
        <div className='nList'>
          <Link to='/catalog' className='m' onClick={() => setModal(false)}>
            {t('navbar.catalog')}
          </Link>
          <Link
            to='/route-filter'
            className='m'
            onClick={() => setModal(false)}
          >
            {t('navbar.trip')}
          </Link>
          <a href='#types' className='menus' onClick={() => setModal(false)}>
            {t('navbar.types')}
          </a>
        </div>
      </div>
    </Mainstyle>
  );
};

export default MainNav;
