import React, {Suspense} from 'react';

import { Navigate, Route, Routes } from 'react-router-dom';
import Settings from './pages/Settings';
import Login from './pages/Login';
import Macro from './pages/Macro';
import SignUp from './pages/SignUp';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Navigate to='/signup' />} />
      <Route path='/signup' element={<SignUp />} />
      <Route path='/login/*' element={<Login />} />
      <Route path='/macro-calculator' element={<Macro />} />
     
      <Route path='/signup' element={<SignUp />} />
    </Routes>
  );
}

export default App;
