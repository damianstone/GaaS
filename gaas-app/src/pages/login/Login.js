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

  return (
    <div className='screen'>
      <div className='welcomeContainer'>
        <h3 className='welcomeText'>Welcome to GaaS</h3>
      </div>
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
        />
        {register ? (
          <Input
            onChange={(e) => setRepeatedPassword(e.target.value)}
            label='Repeat password'
            value={repeatedPassword}
          />
        ) : null}
      </div>
      <div className='createContainerButton'>
        <p className='createButton' onClick={() => {}}>
          {register ? 'Register' : 'Login'}
        </p>
        {register ? (
          <p className='text'>Already have an account ?</p>
        ) : (
          <p className='text'>Register</p>
        )}
      </div>
    </div>
  );
};

export default Login;
