import React from 'react';
import Carousel from '../components/Carousel';

const SignUp = () => {
  
  const submitUserForm = (e: React.SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // need to ask for permission to access spotify FIRST, then try to create the account in firebase
    window.location.href = `${process.env.REACT_APP_API_URL}/spotify-login`;
  }
  return (
    <div className="hero min-h-screen bg-base-200">
  <div className="hero-content text-center">
    <div className="max-w-md">
      <h1 className="text-5xl font-bold">Welcome to suggestify</h1>
      <Carousel/>
      <button onClick={submitUserForm} className="btn btn-primary">Get Started</button>
    </div>
  </div>
</div>
  )
}
export default SignUp;