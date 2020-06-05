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
    password: ''
    // spotify acct username / number?
  })
  const submitUserForm = (e: FormEvent) => {
    e.preventDefault()
    const {firstName, lastName, email, phone, password} = userInformation;
    fb.auth().createUserWithEmailAndPassword(email, password).then(() => {
      let user = fb.auth().currentUser
      fb.database().ref('users/' + user?.uid).set({
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
        id: user?.uid
      }).then(() => axios.post(`${environments.serverUrl}/new-account`, { phone }))
    })
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
        <button type="submit" >Sign Up</button>
      </form>
    </div>
  )
}
export default SignUp;