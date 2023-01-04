import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { backendUrl } from '../App';
import './SingleEvent.css';
// import {backendUrl} from ''

const MyEvDetail = ({event}) => {
  const token = useSelector(state => state.token);
  // const user = useSelector(state => state.user);
  const navigate = useNavigate();
  const isPast = new Date(event.startDate)<Date.now();

  console.log(event);
  const [status,setStatus] = useState('Request to Join');
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
    <div className=' mb-4'>
      <div className='card w-60' style={{overflow:'hidden'}}>
        <img src={event.image} alt="event pic" style={{height:'500px'}} />
        <div className='card-body'>
          <h5 className="card-title">{event.eventName}</h5>
          {!isPast && <p>Start Date: {new Date(event.startDate).toLocaleDateString()}</p>}
          {isPast && <p>Event Finished</p>}
          <p>Total Seats : {event.totalSeats}</p>
          <p>Available Seats : {event.totalSeats - event.currentParticipants.length}</p>
          <p>Description : {event.description}</p>
          <div>
            <p>Pending Users</p>
            <ul className="list-group">
                {/* <li className="list-group-item">An item</li> */}
                {event?.pending?.map(user=>{
                    return (
                        <div class="input-group mb-3">
                            <span type="text" className="form-control" value={user.username}>{user.username}</span>
                            <button className="btn btn-outline-success mx-3" type="button">Confirm</button>
                            <button className="btn btn-outline-danger" type="button">Cancel</button>
                        </div>
                    )
                })}
                {event?.pending?.length===0 && <p>No Pending Participants</p>}
            </ul>
          </div>
          <div>
            <p>Current Participants</p>
            <ul className="list-group">
                {/* <li className="list-group-item">An item</li> */}
                {event?.currentParticipants?.map(user=>{
                    return (
                        <div class="input-group mb-3">
                            <span type="text" className="form-control" value={user.username}>{user.username}</span>
                            <button className="btn btn-outline-success mx-3" type="button">Confirm</button>
                            <button className="btn btn-outline-danger" type="button">Cancel</button>
                        </div>
                    )
                })}
                {event?.currentParticipants?.length===0 && <p>No Participants Joined Yet</p>}
            </ul>
          </div>
        {isPast && <button className='card-link btn-outline-success btn disabled'>Finished</button>}
        </div>
        </div>
    </div>
  )
}

export default MyEvDetail