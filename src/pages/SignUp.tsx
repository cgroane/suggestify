import React from 'react';
import Carousel from '../components/Carousel';

const SignUp = () => {
  
  return (
    <div className="hero min-h-screen bg-base-200">
  <div className="hero-content text-center">
    <div className="max-w-md">
      <h1 className="text-5xl font-bold">Welcome to suggestify</h1>
      <Carousel/>
      <a href={`${process.env.REACT_APP_API_URL}/spotify-login`} className="btn btn-primary">Get Started</a>
    </div>
  </div>
</div>
  )
}
export default SignUp;