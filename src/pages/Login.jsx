import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useT } from '../hooks/useT'; // Import the useT hook

const Login = () => {
  const t = useT(); // Get translation function
  const [currentState, setCurrentState] = useState('Login');
  const { navigate, setToken, token, backendUrl } = useContext(ShopContext);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);

    const handleScroll = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    };

    handleScroll();
  }, []);

  // Redirect if already logged in
  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token, navigate]);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (currentState === 'Sign Up') {
        const response = await axios.post(backendUrl + '/api/user/register', {
          name,
          email,
          password,
        });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token);
          toast.success(t('login_signup_success'));
        } else {
          toast.error(response.data.message);
        }
      } else {
        const response = await axios.post(backendUrl + '/api/user/login', {
          email,
          password,
        });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token);
          toast.success(t('login_success'));
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message || t('login_error_generic'));
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
    >
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="prata-regular text-3xl">
          {currentState === 'Login' ? t('login_title_login') : t('login_title_signup')}
        </p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>

      {currentState === 'Sign Up' && (
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          type="text"
          className="w-full px-3 py-2 border border-gray-800 rounded"
          placeholder={t('login_name_placeholder')}
          required
        />
      )}

      <input
        type="email"
        className="w-full px-3 py-2 border border-gray-800 rounded"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        placeholder={t('login_email_placeholder')}
        required
      />

      <input
        type="password"
        className="w-full px-3 py-2 border border-gray-800 rounded"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        placeholder={t('login_password_placeholder')}
        required
      />

      <div className="w-full flex justify-between text-sm mt-[-8px]">
        <p className="cursor-pointer">{t('login_forgot_password')}</p>
        {currentState === 'Login' ? (
          <p onClick={() => setCurrentState('Sign Up')} className="cursor-pointer">
            {t('login_create_account')}
          </p>
        ) : (
          <p onClick={() => setCurrentState('Login')} className="cursor-pointer">
            {t('login_login_here')}
          </p>
        )}
      </div>

      <button className="bg-black text-white font-light px-8 py-3 mt-4 rounded hover:bg-gray-800 transition">
        {currentState === 'Login' ? t('login_sign_in') : t('login_sign_up')}
      </button>
    </form>
  );
};

export default Login;