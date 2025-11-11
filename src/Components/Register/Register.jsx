import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { updateProfile, GoogleAuthProvider } from "firebase/auth";
import { AuthContext } from '../../context/AuthContex';
import toast from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';

const Register = () => {
  const { createUser, logInWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();


  const handleRegister = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const photo = form.photo.value;
    const email = form.email.value;
    const password = form.password.value;

    createUser(email, password)
      .then(result => {
        const currentUser = result.user;

        // Update user profile
        return updateProfile(currentUser, {
          displayName: name,
          photoURL: photo
        });
      })
      .then(() => {
        toast.success("Registration successful!");
        navigate("/");
      })
      .catch(error => toast.error(error.message));
  };

  const handleGoogleSignIn = () => {
    logInWithGoogle()
      .then(() => {
        toast.success("Google login successful!");
        navigate("/");
      })
      .catch(error => toast.error(error.message));
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Toaster position="top-center" ></Toaster>
      <div className="card bg-base-100 w-full max-w-sm mx-auto m-h-screen shrink-0 shadow-2xl">
        <h1 className="text-5xl font-bold text-center mt-5">Register</h1>
        <div className="card-body">
          <form onSubmit={handleRegister} className="fieldset">
            <label className="label">Name</label>
            <input type="text" name="name" className="input" placeholder="Name" />
            <label className="label">Photo Url</label>
            <input type="text" name="photo" className="input" placeholder="Photo Url" />
            <label className="label">Email</label>
            <input type="email" name="email" className="input" placeholder="Email" />
            <label className="label">Password</label>
            <input type="password" name="password" className="input" placeholder="Password" />

            <p>You have an account? Please
              <Link to="/login" className='font-extrabold hover:text-blue-500'> Login</Link>
            </p>

            <button type="submit" className="btn btn-neutral mt-4">Register</button>
            <button type="button" onClick={handleGoogleSignIn} className="btn bg-white text-black border-[#e5e5e5]">
              Login with Google
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
