import React from 'react';
import './App.css';
import SignUp from './pages/SignUp';
import { Route, Routes } from 'react-router';
import FinishSetUp from './pages/FinishSetUp';
import Complete from './pages/Complete';

function App() {
  return (
    <div className="App w-screen">
      <Routes>
        <Route index element={<SignUp />} />
        <Route element={<FinishSetUp />} path='/finish' />
        <Route element={<Complete />} path='/done' />
      </Routes>
    </div>
  );
}

export default App;
