import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { backendUrl } from '../App';
import './SingleEvent.css';
// import {backendUrl} from ''

const SingleEvent = ({event}) => {
  const token = useSelector(state => state.token);
  // const user = useSelector(state => state.user);
  const navigate = useNavigate();
  const isPast = new Date(event.startDate)<Date.now();
  // console.log(event);
  const [status,setStatus] = useState('Request to Join');
  const handleAction = async ()=> {
    try {
      if(status==='Request to Join'){
        const res = await fetch(`${backendUrl}/event/joinevent/${event._id.toString()}`,{
          method:'put',
          headers:{'Content-Type':'application json',token:token}
        })
        const data = await res.json();
        // console.log(data);
        getStatus();
      }
  
      if(status==='Pending..') {
        setStatus('Cancel Join');
      }
      if(status==='Cancel Join'){
        const res = await fetch(`${backendUrl}/event/canceljoin/${event._id.toString()}`,{
          method:'put',
          headers:{'Content-Type':'application json',token:token}
        })
        const data = await res.json();
        // console.log(data);
        getStatus();
      }
    } catch (error) {
      alert(error.message);
      // return navigate('/login');
    }
    
  }
  const getStatus = async ()=> {
    if(!token) {return navigate('/login')}
    const res = await fetch(`${backendUrl}/event/eventstatus/${event._id.toString()}`,{
      method:'post',
      headers:{'Content-Type':'application json',token:token}
    })
    const data = await res.json();
    // console.log(data);
    setStatus(data);
  }

  useEffect(()=>{
    getStatus();
  },[])
  return (
    <div className='col-md-3 mb-4'>
      <div className='card' style={{overflow:'hidden'}}>
        <img src={event.image} alt="event pic" style={{height:'200px'}} />
        <div className='card-body'>
          <h5 className="card-title">{event.eventName}</h5>
          <p>Orgainsed by - {event.createdBy.username}</p>
          {!isPast && <p>Start Date: {new Date(event.startDate).toLocaleDateString()}</p>}
          {isPast && <p>Event Finished</p>}
          <p>Total Seats : {event.totalSeats}</p>
          <p>Available Seats : {event.totalSeats - event.currentParticipants.length}</p>
        <Link className='card-link btn-outline-primary btn' to={`/myevents/${event._id}`}>More Details</Link>
        {!isPast && <button className='card-link btn-outline-success btn' onClick={handleAction}>{status}</button>}
        {isPast && <button className='card-link btn-outline-success btn disabled'>Finished</button>}
        </div>
        </div>
    </div>
  )
}

export default SingleEvent