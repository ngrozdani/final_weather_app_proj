import React from 'react'
import Login from './Login'
import Register from './Register'
import { BrowserRouter, Routes, Route } from 'react-router-dom'


function App() {
  return (
    // <div className="App">
    //   <Login />
    // </div>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />}> </Route>
        {/* path is GET Requests */}
        <Route path='/login' element={<Login />}> </Route>
        <Route path='/register' element={<Register />}> </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
