import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthLayout from '../../components/layouts/AuthLayout'
import Input from '../../components/inputs/Input';
import { validEmail } from '../../utils/helper';
import axiosInstance from "../../utils/axiosInstance.js"
import { API_PATH } from '../../utils/apiPath.js';
import { UserContext } from '../../context/userContext.jsx';

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const { updateUser } = useContext(UserContext);

  const navigate = useNavigate();

  // Handle Login Form Submission
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (!password) {
      setError("Please enter a password ");
      return;
    }

    setError("");

    // Login API call
    try {
      const response = await axiosInstance.post(API_PATH.AUTH.LOGIN, {
        email,
        password,
      });
      const { token, user } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(user);
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError(`${error.message}, please try again later`)
      }
    }
  }

  return (
    <AuthLayout>
      <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center">
        <h3 className='text-2xl font-semibold text-black'>Welcome Back</h3>
        <p className='text-[13px] text-slate-700 mt-[5px] mb-6'>
          Enter your details to login
        </p>

        <form onSubmit={handleLogin}>

          <Input
            type="text"
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            label="Email Address"
            placeholder='tejassonawanework@gmail.com'
          />

          <Input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            label="Password"
            placeholder='password'
          />

          {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}

          <button type='submit' className='btn-primary cursor-pointer'>
            LOGIN
          </button>

          <p className='text-[13px] text-slate-800 mt-3'>
            Don't have an account?
            <Link className='font-medium text-primary underline' to="/signUp"> Sign Up</Link>
          </p>

        </form>

      </div>
    </AuthLayout>
  )
}

export default Login