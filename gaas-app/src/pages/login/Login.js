import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as f from '../../store/actions/actions';

import Input from '../../components/Input';
import './Login.css';

const Login = () => {
  const disptach = useDispatch();
  const history = useHistory();
  const [register, setRegister] = useState(false);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [repeatedPassword, setRepeatedPassword] = useState(null);

  const user = useSelector((state) => state.userLogin);
  const { loading: loadingLogin, data: userLogin, error: loginError } = user;

  console.log(loginError);

  const registerReducer = useSelector((state) => state.userRegister);
  const {
    loading: loadingRegister,
    data: registerUser,
    error: registerError,
  } = registerReducer;

  console.log(registerUser);

  useEffect(() => {}, []);

  const handleLogin = () => {
    console.log('login');
    if (email && password) {
      disptach(f.login(email, password));
    }
  };

  const handleRegister = () => {
    if (email && password && repeatedPassword) {
      disptach(f.register(email, password, repeatedPassword));
    }
  };

  if (registerUser || userLogin) {
    history.goBack();
  }

  return (
    <div className='screen'>
      <div className='welcomeContainer'>
        <h3 className='welcomeText'>Welcome to GaaS</h3>
      </div>
      {registerError ||
        (loginError && <p className='text'>Ups there is an error</p>)}
      {loadingLogin || loadingRegister ? (
        <p className='text'>Loading...</p>
      ) : (
        <>
          <div className='inputContainer'>
            <Input
              onChange={(e) => setEmail(e.target.value)}
              label='email'
              value={email}
            />
            <Input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              label='password'
              type='password'
            />
            {register ? (
              <Input
                onChange={(e) => setRepeatedPassword(e.target.value)}
                label='Repeat password'
                value={repeatedPassword}
                type='password'
              />
            ) : null}
          </div>
          <div className='createContainerButton'>
            <p
              className='createButton'
              onClick={register ? handleRegister : handleLogin}
            >
              {register ? 'Register' : 'Login'}
            </p>
          </div>
          <div>
            {register ? (
              <p className='text' onClick={() => setRegister(false)}>
                Already have an account ?
              </p>
            ) : (
              <p className='text' onClick={() => setRegister(true)}>
                Register
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Login;
