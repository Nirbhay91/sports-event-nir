import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {BrowserRouter,Routes,Route, useNavigate} from 'react-router-dom';
import CreateEvent from './components/CreateEvent';
import EventDetail from './components/EventDetail';
import Home from './components/Home';
import Login from './components/Login';
import MyEvents from './components/MyEvents';
import Participate from './components/Participate';
import Pending from './components/Pending';
import SignUp from './components/SignUp';
import { addUser, setToken } from './redux/userSlice';
export const backendUrl = 'https://sport-app-rahul77.onrender.com';
// export const backendUrl = 'http://localhost:5000';

function App() {
  const token = useSelector(state=> state.token);
  const user = useSelector(state=> state.user);
  const dispatch = useDispatch();
  const getUserInfo = async ()=> {
    try {
      // if(!token) return window.location.replace('/login');
      const res = await fetch(`${backendUrl}/user/info`, {
        headers: {
          token: token
        },
      });
      if(!res.ok) return;
      const data = await res.json();
      // console.log(data);
      dispatch(addUser(data))
    } catch (error) {
      console.log(error.message,'error');
      dispatch(addUser(''));
      dispatch(setToken(''));
      // return window.location.replace('/login');
    }
  }

  useEffect(()=>{
    getUserInfo();
  },[])
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={user?<Home />:<Login />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/createevent' element={user?<CreateEvent />:<Login />} />
          <Route path='/myevents' element={<MyEvents />} />
          <Route path='/participate' element={<Participate />} />
          <Route path='/pending' element={<Pending />} />
          <Route path='/myevents/:eventId' element={<EventDetail />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App