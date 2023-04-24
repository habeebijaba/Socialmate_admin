import './App.css';
import React from 'react';
import {BrowserRouter as Router, Routes, Route,Navigate} from 'react-router-dom'
import LoginPage from './Pages/Login';
import HomePage from './Pages/Home';
import Users from './Pages/Users';
import Posts from './Pages/Posts';
import { useSelector } from 'react-redux';
import Login from './Components/Login/Login';
import Notification from './Pages/Notification';

function App() {
  const isAdmin = Boolean(useSelector((state)=>state.token))

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={isAdmin ? <HomePage /> : <Navigate to="/login" />}/>
          {/* <Route path='/' element={} */}
          <Route path='/dashboard' element={isAdmin ? <HomePage /> : <Navigate to="/login" />}/>
          <Route path='/login' element={isAdmin ? <Navigate to="/" /> : <Login/>}/>
          <Route path='/usermanage' element={isAdmin ? <Users /> : <Navigate to="/login" />}/>
          <Route path='/postmanage'element={isAdmin ? <Posts /> : <Navigate to="/login" />}/>
          <Route path='/notifications'element={isAdmin ? <Notification /> : <Navigate to="/login" />}/>

        </Routes>
      </Router>
    </div>
  );
}

export default App;
