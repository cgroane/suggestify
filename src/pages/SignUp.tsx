import React from 'react';

const SignUp = () => {
  
  const submitUserForm = (e: React.SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // need to ask for permission to access spotify FIRST, then try to create the account in firebase
    window.location.href = "http://localhost:3001/api/spotify-login";
  }
  return (
    <div className='container mx-auto p-24' >
              
      <button onClick={submitUserForm}>Sign Up</button>
    </div>
  )
}
export default SignUp;