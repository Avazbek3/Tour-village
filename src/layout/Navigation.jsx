import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../images/Logo.svg';
import logo2 from '../images/Logo2.svg';
import menu from '../images/menuBL.svg';
import { getLanguage } from '../helpers/language';
import { useState } from 'react';
import MainNav from '../components/MainNav';

const NavigationStyle = styled.div`
  .style {
    border-bottom: 1px solid rgba(0, 0, 0, 0.06);
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 999;
    background-color: #fff;
    transition: 0.3s;
    height: 80px;
  }
  .yes {
    overflow: hidden;
  }
  .nav1 {
    margin-top: 47px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    a {
      color: rgb(0, 29, 86);
    }
    a:hover {
      color: red;
    }
  }
  .nav-no {
    margin-top: -47px !important;
    overflow: hidden;
    /* transition: 0.3s; */
  }
  .nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 23px;
    /* visibility: visible; */
    transition: 0.3s;
    .Logo {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
      img:nth-child(2) {
        width: 66px;
        height: 10px;
      }
    }
    .menu {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 24px;
      .menus,
      .menusL .lang {
        font-size: 14px;
        color: rgb(0, 29, 86);
        &:hover {
          color: red;
        }
      }
      .menusI {
        display: none;
        height: 24px;
      }
      .menusL {
        position: relative;
      }
      .menusL.active .langs {
        visibility: visible;
        opacity: 1;
      }
      .menusL .langs {
        position: absolute;
        box-shadow: rgb(0 0 0 / 16%) 0px 3px 6px, rgb(0 0 0 / 23%) 0px 3px 6px;
        display: flex;
        flex-direction: column;
        align-items: center;
        top: 20px;
        right: 10px;
        width: 70px;
        background: #fff;
        border-radius: 6px;
        visibility: hidden;
        opacity: 0;
        div {
          text-align: center;
          cursor: pointer;
          padding: 6px 0;
          width: 100%;
          font-size: 14px;
          color: rgb(0, 29, 86);
          &:hover {
            color: #fff;
            background-color: rgb(0, 29, 86);
          }
          &:nth-child(1) {
            border-top-left-radius: 6px;
            border-top-right-radius: 6px;
          }
          &:nth-child(3) {
            border-bottom-left-radius: 6px;
            border-bottom-right-radius: 6px;
          }
        }
      }
    }
  }
  .log {
    .user {
      position: relative;
      .img {
        cursor: pointer;
      }
      .active {
        visibility: 1 !important;
        opacity: 1 !important;
        transition: 0.4s;
      }
      .non {
        visibility: hidden;
        opacity: 0;
        transition: 0.4s;
      }
      .userInfo {
        position: absolute;
        box-shadow: rgb(0 0 0 / 16%) 0px 3px 6px, rgb(0 0 0 / 23%) 0px 3px 6px;
        display: flex;
        flex-direction: column;
        align-items: center;
        top: 20px;
        width: 70px;
        background: #fff;
        border-radius: 6px;
        div {
          text-align: center;
          padding: 6px 0;
          width: 100%;
          font-size: 14px;
          color: rgb(0, 29, 86);
        }
        a {
          text-align: center;
          padding: 6px 0;
          border-radius: 6px;
          font-size: 14px;
          color: rgb(0, 29, 86);
          padding: 10px 0;
          width: 100%;
          &:hover {
            background-color: rgb(0, 29, 86);
            color: #fff;
          }
        }
      }
    }
  }
  @media (max-width: 992px) and (min-width: 576px) {
    .nav {
      .menu {
        .menus {
          display: none;
        }
        .menusI {
          display: block;
        }
      }
    }
  }
  @media (max-width: 576px) and (min-width: 320px) {
    .nav {
      .menu {
        .menus {
          display: none;
        }
        .menusI {
          display: block;
        }
      }
    }
  }
`;

const Navigation = (props) => {
  const { village } = props;

  const { t, i18n } = useTranslation();
  const lan = getLanguage();
  const [isActive, setActive] = useState(false);
  const [modal, setModal] = useState(false);
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(true);
  const [tokenn, setTokenn] = useState(false);
  const [user, setUser] = useState();

  const handleShow = () => {
    if (window.scrollY >= 66) {
      setShow(true);
    } else {
      setShow(false);
    }
  };
  window.addEventListener('scroll', handleShow);

  useEffect(() => {
    let user = window.localStorage.getItem('user');
    let token = window.localStorage.getItem('token');
    user = JSON.parse(user?.length > 0 ? user : '{}');
    setUser(user);

    if (token) {
      setTokenn(true);
    }

    handleShow();
    const urlHash = window.location.hash;
    if (urlHash.length) {
      const element = document.getElementById(urlHash.substring(1));
      if (element) {
        element.scrollIntoView();
      }
    }
  }, [tokenn]);

  const onLanguageHandle = (newLang) => {
    i18n.changeLanguage(newLang);
    window.localStorage.setItem('language', newLang);
  };
  const toggle = () => {
    setActive(!isActive);
  };
  const LogOut = () => {
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('user');
  };
  console.log(user);

  return (
    <NavigationStyle>
      <div className={show ? 'style yes' : 'style'}>
        <div
          className={show && village ? 'nav nav-no container' : 'nav container'}
        >
          <Link to='/' className='Logo'>
            <img src={logo} alt='' />
            <img src={logo2} alt='' />
          </Link>
          <div className='menu'>
            <Link to='/catalog' className='menus'>
              {t('navbar.catalog')}
            </Link>
            <Link to='/route-filter' className='menus'>
              {t('navbar.trip')}
            </Link>
            <a href='/#types' className='menus'>
              {t('navbar.types')}
            </a>
            <div
              className={isActive === true ? 'menusL active' : 'menusL'}
              onClick={toggle}
            >
              <div style={{ cursor: 'pointer' }} className='lang'>
                {lan === 'uz' ? (
                  <>{t('navbar.uz')}</>
                ) : lan === 'ru' ? (
                  <>{t('navbar.ru')}</>
                ) : (
                  <>{t('navbar.en')}</>
                )}
              </div>
              <div className='langs'>
                <div onClick={() => onLanguageHandle('uz')}>
                  {t('navbar.uz')}
                </div>
                <div onClick={() => onLanguageHandle('ru')}>
                  {t('navbar.ru')}
                </div>
                <div onClick={() => onLanguageHandle('en')}>
                  {t('navbar.en')}
                </div>
              </div>
            </div>
            <div className='log'>
              {tokenn === true ? (
                <div className='user'>
                  <div className='img' onClick={() => setShow1(!show1)}>
                    Img
                  </div>
                  <div className={show1 ? 'userInfo non' : 'userInfo active'}>
                    <div>id : {user.id}</div>
                    <a
                      href='/login'
                      onClick={() => {
                        window.localStorage.removeItem('token');
                        window.localStorage.removeItem('user');
                      }}
                    >
                      Log out
                    </a>
                  </div>
                </div>
              ) : (
                <a href='/login'>Login</a>
              )}
            </div>
            <div className='menusI' onClick={() => setModal(!modal)}>
              <img src={menu} alt='' />
            </div>
          </div>
        </div>
        {village === true ? (
          <div
            className='nav1 container'
            style={show ? { visibility: 'visible' } : { visibility: 'hidden' }}
          >
            <a href='#history'>Tarixi</a>
            <a href='#about'>Etnografiyasi</a>
            <a href='#hotels'>Mehmonxonalar</a>
            <a href='#restaurant'>Tamaddixonalar</a>
            <a href='#famous'>Diqaatga sazovor joylar</a>
            <a href='#rank'>Baholar</a>
            <a href='#map'>Xaritadagi joylashuv</a>
            <a href='#prefer'>Tavsiya beramiz!</a>
          </div>
        ) : null}
        {modal ? <MainNav modal={modal} setModal={setModal} /> : null}
      </div>
    </NavigationStyle>
  );
};

export default Navigation;
