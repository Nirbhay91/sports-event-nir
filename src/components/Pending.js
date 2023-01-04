import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { backendUrl } from '../App';
import NavBar from './NavBar'
import SingleEvent from './SingleEvent';

const Pending = () => {
  const token = useSelector(state => state.token);
  const navigate = useNavigate();
  const [events,setEvents] = useState([])
  const getMyPendingEvents = async ()=> {
    if(!token) return navigate('/login');
    const res = await fetch(`${backendUrl}/event/pending`,{
      headers:{'Content-Type':'application json',token:token}
    })
    const data = await res.json();
    setEvents(data)
    // console.log(data);
  }

  useEffect(()=>{
    getMyPendingEvents();
  },[])
  return (
    <div>
      <NavBar />
      <div className="container mt-3">
        <h2 className='mb-3'>Your Pending Events</h2>
        <p>You will added to sport once admin approve your request</p>
        <div className="row d-flex justify-content-start">
          {events.map((event) => {
            return <SingleEvent key={event._id} event={event} />;
          })}
        </div>
        {events.length===0 && <h5>No Pending Events</h5>}
    </div>
    </div>
  )
}

export default Pending