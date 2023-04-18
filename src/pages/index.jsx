import React, { useState } from 'react';
import { Outlet, Route, Routes, useNavigate } from 'react-router-dom';
import UserSide from '../layout/UserSide';
import VillageDetail from './Public/VillageDetail';
import Main from './Public/Main';
import Hotel from './Public/Hotel';
import RouteFilter from './Public/RouteFilter';
import Restaurant from './Public/Restaurant';
import Famous from './Public/Famous';
import Tour from './Public/Tour';
import Catalog from './Public/Catalog';
import Login from './Public/Login';
import { useEffect } from 'react';

const Pages = () => {
  const [log, setLog] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let token = window.localStorage.getItem('token');
    if (token) {
      setLog(true);
      navigate('/');
    } else {
      setLog(false);
      navigate('/login');
    }
  }, [log]);
  return (
    <>
      <Routes>
        {log === false ? (
          <Route path='/login' element={<Login />} />
        ) : (
          <Route
            element={
              <UserSide>
                <Outlet />
              </UserSide>
            }
          >
            <Route path='/'>
              <Route index={true} element={<Main />} />
              <Route path='/catalog/:slug' element={<VillageDetail />} />
              <Route path='/catalog/hotel/:slug' element={<Hotel />} />
              <Route
                path='/catalog/restourant/:slug'
                element={<Restaurant />}
              />
              <Route path='/catalog/famous/:slug' element={<Famous />} />
              <Route path='/catalog/tour/:slug' element={<Tour />} />
              <Route path='/route-filter' element={<RouteFilter />} />
              <Route path='/catalog' element={<Catalog />} />
            </Route>
          </Route>
        )}
      </Routes>
    </>
  );
};

export default Pages;
