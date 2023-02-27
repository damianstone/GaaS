import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as f from '../../store/actions/actions';

import Input from '../../components/Input';
import './Login.css';

const Login = () => {
  const disptach = useDispatch();
  const [register, setRegister] = useState(false);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [repeatedPassword, setRepeatedPassword] = useState(null);

  useEffect(() => {}, []);

  const handleOnchange = () => {};
  return (
    <div className='screen'>
      <div className='welcomeContainer'>
        <h3 className='welcomeText'>Welcome to GaaS</h3>
      </div>
      <div className='inputContainer'>
        <Input
          onChange={handleOnchange}
          value={email}
          defaultValue='hello@gmail.com'
        />
        <Input
          onChange={handleOnchange}
          value={password}
          defaultValue='hello@gmail.com'
        />
        <Input
          onChange={handleOnchange}
          value={repeatedPassword}
          defaultValue='hello@gmail.com'
        />
      </div>
    </div>
  );
};

export default Login;
