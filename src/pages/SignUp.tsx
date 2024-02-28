import React from 'react';

const SignUp = () => {
  
  const submitUserForm = (e: React.SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // need to ask for permission to access spotify FIRST, then try to create the account in firebase
    window.location.href = "http://localhost:3001/api/spotify-login";
  }
  return (
    <div className="hero min-h-screen bg-base-200">
  <div className="hero-content text-center">
    <div className="max-w-md">
      <h1 className="text-5xl font-bold">Welcome to suggestify</h1>
      <p className="py-6">This is an app built with Node, React (although only a little), Express, Firebase, Twilio, and the Spotify Web API</p>
      <p className="py-6">The goal is to enable users to text a number with a link to a song from Spotify and add that song to someone else's playlist</p>
      <p className="py-6">When you click the button below, you will be directed to authorize this application with Spotify</p>
      <p className="py-6">After you have authorized Suggestify, it will create a playlist for you in it's own name and will allow songs to be added to that playlist via text</p>
      <button onClick={submitUserForm} className="btn btn-primary">Get Started</button>
    </div>
  </div>
</div>
  )
}
export default SignUp;