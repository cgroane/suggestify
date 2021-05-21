import React, { useState, FormEvent } from 'react';
import fb from '../config/firebase';
import Input from './input';
import axios from 'axios';
import { environments } from '../config/environments';

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
  console.log(cookies);
  const submitUserForm = (e: FormEvent) => {
    // need to ask for permission to access spotify FIRST, then try to create the account in firebase
    e.preventDefault()
    const {firstName, lastName, email, phone, password, spotify} = userInformation;
    axios.get(`http://localhost:3001/api/spotify-login`).then((response) => {
      axios.get(`http://localhost:3001/api/callback`);
    })
    // fb.auth().createUserWithEmailAndPassword(email, password).then(() => {
    //   let user = fb.auth().currentUser
    //   fb.database().ref('users/' + user?.uid).set({
    //     firstName: firstName,
    //     lastName: lastName,
    //     email: email,
    //     phone: phone,
    //     id: user?.uid,
    //     spotify
    //   }).then(() => axios.post(`${environments.serverUrl}/new-account`, { phone }))
    // })
    .catch((err) => console.log(err))
  }
  const onInputChange = (name: string, value: string) => {
    setUserInformation(prevState => ({ ...prevState, [name]: value }))
  }
  return (
    <div>
      <form className="signup-form" onSubmit={(e) => submitUserForm(e)}>
        <Input onChange={onInputChange} label="First Name" name="firstName" value={userInformation.firstName} />
        <Input onChange={onInputChange} label="Last Name" name="lastName" value={userInformation.lastName} />
        <Input onChange={onInputChange} label="Phone Number" name="phone" value={userInformation.phone} />
        <Input onChange={onInputChange} label="Email" name="email" value={userInformation.email} />
        <Input onChange={onInputChange} label="Password" name="password" value={userInformation.password} />
        <div>Don't know your spotify URI? Go to your profile and click share, then click 'Copy Spotify URI'. Paste that value in here</div>
        <Input onChange={onInputChange} label="Spotify Profile URI" name="spotify" value={userInformation.spotify} />
        <a href="http://localhost:3001/api/spotify-login">Sign Up</a>
      </form>
    </div>
  )
}
export default SignUp;