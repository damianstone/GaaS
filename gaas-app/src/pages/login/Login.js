import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import * as f from '../../store/actions/actions';
import './Login.css';

const Login = () => {
  const disptach = useDispatch();

  useEffect(() => {}, []);
  return <div className='screen'></div>;
};

export default Login;
