import React from 'react';
import Footer from './Footer';
import Navigation from './Navigation';

const UserSide = (props) => {
  return (
    <>
      <Navigation />
      {props.children}
      <Footer />
    </>
  );
};

export default UserSide;
