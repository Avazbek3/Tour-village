import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { GetAuthInstance, GetNotAuthInstance } from '../../helpers/httpClient';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Main = styled.div`
  width: 300px;
  height: 300px;
  margin: 100px auto;
  background-color: #8aecff;
  border-radius: 12px;
  padding: 20px;
  form {
    label {
      input {
        outline: none;
        border: none;
        border-radius: 6px;
        padding: 6px;
        margin-left: 10px;
        margin-bottom: 10px;
        background-color: #fff !important;
        color: black;
      }
    }
    .submit {
      outline: none;
      border: none;
      border-radius: 6px;
      padding: 12px;
      background-color: blue;
      color: #fff;
      width: 100px;
      margin: 10px auto;
      display: block;
      cursor: pointer;
    }
  }
`;

const Login = () => {
  const [obj, setObj] = useState({});
  const [err, setErr] = useState('');
  const [user, setUser] = useState({});

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setObj({ ...obj, [e.target.name]: e.target.value });
  };
  const handlePost = (e) => {
    e.preventDefault();
    GetAuthInstance()
      .post(`https://api.puzzleapp.uz/api/v1/dashboard/login/`, obj)
      .then((res) => {
        console.log(res.data.user);
        window.localStorage.setItem('token', res.data.token);
        window.localStorage.setItem('user', JSON.stringify(res.data.user));
        navigate('/');
        console.log(user);
        window.location.reload();
      })
      .catch((err) => {
        setErr(err.response.data.msg);
      });
  };
  console.log(obj);
  return (
    <Main>
      <>
        <h3>Login</h3>
        <form onSubmit={handlePost}>
          <label htmlFor=''>
            Login
            <input
              type='text'
              name='username'
              id=''
              onChange={handleInputChange}
            />
          </label>
          <br />
          <label htmlFor=''>
            Password
            <input
              type='password'
              name='password'
              id=''
              onChange={handleInputChange}
            />
          </label>
          {err.length > 0 ? (
            <>
              <br />
              <div style={{ color: 'red' }}>{err}</div>
            </>
          ) : (
            <br />
          )}

          <input type='submit' value='Submit' className='submit' />
        </form>
      </>
    </Main>
  );
};

export default Login;
