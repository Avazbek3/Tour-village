import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../images/Logo.svg';

const FooterStyle = styled.div`
  background-color: #001d56;
  footer {
    padding: 32px 0 16px;
    .panels {
      margin-top: 26px;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      .panel {
        margin: 15px;
        flex-grow: 1;
        flex-shrink: 1;
        p {
          font-size: 14px;
          line-height: 20px;
          color: rgb(128, 141, 166);
          margin-bottom: 5px;
        }
        a {
          display: block;
          font-size: 15px;
          line-height: 20px;
          color: rgb(255, 255, 255);
          margin-bottom: 8px;
          transition: all 400ms ease 0s;
        }
        a:hover {
          color: rgb(128, 141, 166);
          transition: all 400ms ease 0s;
        }
      }
    }
    .footer-sub {
      border-top: 1px solid rgb(30, 56, 107);
      padding: 16px 0px;
      font-size: 12px;
      line-height: 14px;
      color: rgb(128, 141, 166);
    }
  }
`;

const Footer = () => {
  return (
    <>
      <FooterStyle>
        <footer className='container'>
          <img src={logo} alt='' />
          <div className='panels'>
            <div className='panel'>
              <p>Asosiy qismlar</p>
              <Link to='/'>Katalog</Link>
              <Link to='/'>Turizm turlari</Link>
              <Link to='/'></Link>
              <Link to='/'></Link>
            </div>
            <div className='panel'>
              <p>Turizm mahallalari </p>
              <Link to='/'>Kumushkon</Link>
              <Link to='/'>Zarkent</Link>
              <Link to='/'></Link>
              <Link to='/'></Link>
            </div>
            <div className='panel'>
              <p>Mehmonxonalar va mehmon uylari</p>
              <Link to='/'>"EDELWEISS" dam olish zonasi</Link>
              <Link to='/'>"KUMUSHKON SPORT" dam olish zonasi</Link>
              <Link to='/'>"SAYYOX-2000" oilaviy mehmon uyi</Link>
              <Link to='/'>
                "SHONAZAROVA MARIYA ABDULRAZZOQOVNA" oilaviy mehmon uyi
              </Link>
            </div>
            <div className='panel'>
              <p>Tamaddixonalar</p>
              <Link to='/'>"KUMUSHKON SAXOVATI" OK</Link>
              <Link to='/'>"YAXYO" XK</Link>
              <Link to='/'>"DILFUZA DEHQONBOYEVA" ХК</Link>
              <Link to='/'>"ZARKENT GUZARI" MChLink</Link>
            </div>
          </div>
          <div className='footer-sub'>
            © 2022 Tourvillages. Barcha huquqlar himoyalangan.
          </div>
        </footer>
      </FooterStyle>
    </>
  );
};

export default Footer;
