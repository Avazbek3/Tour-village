import React, { useState } from 'react';
import styled from 'styled-components';
import du from '../../src/images/downup.svg';

const Styles = styled.div`
  user-select: none;
  margin-bottom: 20px;
  .nss {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  .btn {
    button {
      background: #f34c35;
      color: #fff;
      border: none;
      border-radius: 20px;
      width: 100%;
      padding: 10px;
      cursor: pointer;
    }
  }
  .ns {
    background: rgb(250, 250, 250);
    border-radius: 20px;
    padding: 20px;
    .h {
      margin-bottom: 0 !important;
      img {
        transform: rotate(180deg);
        transition: all 400ms ease 0s;
      }
    }
    .n {
      display: none !important;
    }
    .hs {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 15px;
      width: 220px;
      cursor: pointer;
      img {
        transition: all 400ms ease 0s;
      }
      .h1 {
        font-size: 16px;
        line-height: 20px;
        color: rgb(0, 29, 86);
        font-weight: 600;
      }
    }
    .bs {
      display: flex;
      flex-direction: column;
      gap: 15px;
      .b1 {
        font-size: 15px;
        line-height: 20px;
        color: rgb(0, 29, 86);
        cursor: pointer;
        &:hover {
          color: rgb(243, 76, 53);
        }
      }
    }
  }
  label {
    cursor: pointer;
    transition: 200ms;
    &:hover {
      color: #f34c35;
    }
  }
  .radio_input {
    display: none;
    &:checked + .t1 {
      color: #f34c35;
    }
  }
  @media only screen and (max-width: 834px) and (min-width: 320px) {
    width: 100%;
    .ns {
      .hs {
        width: 100%;
      }
    }
  }
`;

const Navbar = (props) => {
  const [upD, setUpD] = useState(true);
  const [upD1, setUpD1] = useState(true);
  const [upD2, setUpD2] = useState(true);
  const [upD3, setUpD3] = useState(true);

  const {
    villageC,
    village,
    villageV,
    categoryList,
    filters,
    filterR,
    changeFilter,
    clearFilter,
    changeFilterR,
  } = props;
  return (
    <Styles>
      <div className='nss'>
        {village ? (
          <div className='ns'>
            <div className={upD ? 'hs' : 'hs h'} onClick={() => setUpD(!upD)}>
              <div className='h1'>Filtr</div>
              <img src={du} alt='' />
            </div>
            <div className={upD ? 'bs' : 'bs n'}>
              <label>
                <input
                  type='checkbox'
                  className='radio_input'
                  name='is_popular'
                  onChange={() =>
                    changeFilter('is_popular', 'true' ? 'true' : 'false')
                  }
                  checked={filters?.is_popular?.includes('true')}
                />
                <div className='t1'>Ommabopligi</div>
              </label>
              <label>
                <input
                  type='checkbox'
                  className='radio_input'
                  name='popular'
                  onChange={() => changeFilter('popular', String(1))}
                  checked={filters?.popular?.includes(String(1))}
                />
                <div className='t1'>Yuqori reytingligi</div>
              </label>
            </div>
          </div>
        ) : null}
        {village ? (
          <div className='ns'>
            <div
              className={upD3 ? 'hs' : 'hs h'}
              onClick={() => setUpD3(!upD3)}
            >
              <div className='h1'>Turizm turlari</div>
              <img src={du} alt='' />
            </div>
            <div className={upD3 ? 'bs' : 'bs n'}>
              {categoryList
                ? categoryList?.map((e, index) => (
                    <label key={index}>
                      <input
                        type='checkbox'
                        className='radio_input'
                        name='category'
                        onChange={() => changeFilter('category', String(e.id))}
                        checked={filters?.category?.includes(String(e.id))}
                      />
                      <div className='t1'>{e.name}</div>
                    </label>
                  ))
                : null}
            </div>
          </div>
        ) : null}

        {villageC ? (
          <div className='ns'>
            <div className={upD ? 'hs' : 'hs h'} onClick={() => setUpD(!upD)}>
              <div className='h1'>Filtr</div>
              <img src={du} alt='' />
            </div>
            <div className={upD ? 'bs' : 'bs n'}>
              <label>
                <input
                  type='checkbox'
                  className='radio_input'
                  name='is_papular'
                  onChange={() => changeFilterR('is_papular', String(1))}
                  checked={filterR?.is_papular?.includes('true')}
                />
                <div className='t1'>Ommabopligi</div>
              </label>
              <label>
                <input
                  type='checkbox'
                  className='radio_input'
                  name='r'
                  onChange={() => changeFilterR('r', String(1))}
                  checked={filterR?.r?.includes(String(1))}
                />
                <div className='t1'>Yuqori reytingligi</div>
              </label>
            </div>
          </div>
        ) : null}
        {villageC ? (
          <div className='ns'>
            <div
              className={upD1 ? 'hs' : 'hs h'}
              onClick={() => setUpD1(!upD1)}
            >
              <div className='h1'>Turi</div>
              <img src={du} alt='' />
            </div>
            <div className={upD1 ? 'bs' : 'bs n'}>
              <label>
                <input
                  type='checkbox'
                  className='radio_input'
                  name='model'
                  onChange={() => changeFilterR('model', 'fp')}
                  checked={filterR?.model?.includes('fp')}
                />
                <div className='t1'>Diqqatga sazovor joy</div>
              </label>
              <label>
                <input
                  type='checkbox'
                  className='radio_input'
                  name='model'
                  onChange={() => changeFilterR('model', 'res')}
                  checked={filterR?.model?.includes('res')}
                />
                <div className='t1'>Tamaddixona</div>
              </label>
              <label>
                <input
                  type='checkbox'
                  className='radio_input'
                  name='model'
                  onChange={() => changeFilterR('model', 'hotel')}
                  checked={filterR?.model?.includes('hotel')}
                />
                <div className='t1'>Mehmonxona</div>
              </label>
              <label>
                <input
                  type='checkbox'
                  className='radio_input'
                  name='model'
                  onChange={() => changeFilterR('model', 'craft')}
                  checked={filterR?.model?.includes('craft')}
                />
                <div className='t1'>Turizm turlari</div>
              </label>
            </div>
          </div>
        ) : null}
        {villageC ? (
          <div className='ns'>
            <div
              className={upD2 ? 'hs' : 'hs h'}
              onClick={() => setUpD2(!upD2)}
            >
              <div className='h1'>Turizm mahallalari</div>
              <img src={du} alt='' />
            </div>
            <div className={upD2 ? 'bs' : 'bs n'}>
              {villageV
                ? villageV?.map((e, index) => (
                    <label key={index}>
                      <input
                        type='checkbox'
                        className='radio_input'
                        name='village'
                        onChange={() => changeFilterR('village', `${e.id}`)}
                        checked={filterR?.village?.includes(`${e.id}`)}
                      />
                      <div className='t1'>{e.name}</div>
                    </label>
                  ))
                : null}
            </div>
          </div>
        ) : null}

        {Object.keys(filters || {}).length !== 0 ||
        Object.keys(filterR || {}).length !== 0 ? (
          <div className='btn'>
            <button onClick={clearFilter}>Tozalash</button>
          </div>
        ) : null}
      </div>
    </Styles>
  );
};

export default Navbar;
