import React from 'react';
import './App.css';
import SignUp from './pages/SignUp';
import { Route, Routes } from 'react-router';
import Password from './pages/FinishSetUp';

function App() {
  return (
    <div className="App w-screen">
      <Routes>
        <Route index element={<SignUp />} />
        <Route element={<Password />} path='/finish' />
      </Routes>
    </div>
  );
}

export default App;
