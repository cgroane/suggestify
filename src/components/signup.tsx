import React, { useState, FormEvent } from 'react';
import Input from './input';
import axiosInstance from '../config/axios';

const SignUp = () => {
  const [userInformation, setUserInformation] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    password: '',
    spotify: ''
    // spotify acct username / number?
  })
  const cookies = document.cookie;
  console.log(cookies)
  const {firstName, lastName, email, phone, password, spotify} = userInformation;
  const submitUserForm = (e: FormEvent) => {
    // need to ask for permission to access spotify FIRST, then try to create the account in firebase
    e.preventDefault()
    axiosInstance.get(`api/spotify-login`).then((response) => {
      // axiosInstance.get(`http://localhost:3001/api/callback`);
    })
    .catch((err) => console.log(err))
  }
  const onInputChange = (name: string, value: string) => {
    setUserInformation(prevState => ({ ...prevState, [name]: value }))
  }
  return (
    <div>
      <form className="signup-form" onSubmit={(e) => submitUserForm(e)}>
        <Input onChange={onInputChange} label="First Name" name="firstName" value={firstName} />
        <Input onChange={onInputChange} label="Last Name" name="lastName" value={lastName} />
        <Input onChange={onInputChange} label="Phone Number" name="phone" value={phone} />
        <Input onChange={onInputChange} label="Email" name="email" value={email} />
        <Input onChange={onInputChange} label="Password" name="password" value={password} />
        <div>Don't know your spotify URL? Go to your profile and click share, then click 'Copy Spotify URL'. Paste that value in here</div>
        <Input onChange={onInputChange} label="Spotify Profile URL" name="spotify" value={spotify} />
        <a href="http://localhost:3001/api/spotify-login">Sign Up</a>
        {/* <button type='submit'>Sign Up</button> */}
      </form>
    </div>
  )
}
export default SignUp;