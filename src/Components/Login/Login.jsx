import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router';
import { AuthContext } from '../../context/AuthContex';
import toast, { Toaster } from 'react-hot-toast';

const Login = () => {
  const { signIn } = useContext(AuthContext);
  const naviget = useNavigate();


  const handleLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    signIn(email, password)
      .then(() => {
        toast.success("Login successful!");
        naviget('/');
      })
      .catch(error => {
        toast.error(error.message);
      })

  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Toaster position="top-center" />
      <div className="card bg-base-100 w-full max-w-sm mx-auto m-h-screen shrink-0 shadow-2xl">
        <h1 className="text-5xl font-bold text-center mt-5">Login</h1>
        <div className="card-body">
          <form onSubmit={handleLogin} className="fieldset">

            {/* Email */}
            <label className="label">Email</label>
            <input type="email" name="email" className="input" placeholder="Email" />
            {/* Password */}
            <label className="label">Password</label>
            <input type="password" name='password' className="input" placeholder="Password" />
            {/* Button */}
            <p>You don't have an account? Plase
              <Link
                to="/register"
                className='font-extrabold hover:text-blue-500'
              > Register</Link>
            </p>
            <div>
              <a className="link link-hover">Forgot password?</a>
            </div>

            <button type="submit" className=" btn btn-neutral mt-4">Login</button>
          </form>
        </div>
      </div>
    </div >
  );
};

export default Login;