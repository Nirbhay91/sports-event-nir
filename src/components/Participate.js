import React, { useEffect, useState } from 'react'
import NavBar from './NavBar'
import { useSelector } from "react-redux";
import {useNavigate} from "react-router-dom";
import { backendUrl } from '../App';

const Participate = () => {
  const token = useSelector(state=> state.token);
  const navigate = useNavigate();
  const [partEvents,setPartEvents] = useState([]);
  const getParticipatedEvents = async()=> {
    if(!token) return navigate('/login');
    const res = await fetch(`${backendUrl}/event/participated`,{
      headers:{'Content-Type':'application json',token:token}
    })
    const data = await res.json();
    console.log(data);
    // setEvents(data)
  }

  useEffect(()=>{
    getParticipatedEvents();
  },[])

  return (
    <div>
      <NavBar />
      <div className="container mt-3">
        <h2 className='mb-3'>Your Participated Events</h2>




        {partEvents.length===0 && <h5>No participated events</h5>}
      </div>
    </div>
  )
}

export default Participate