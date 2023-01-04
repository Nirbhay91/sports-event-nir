import React, { useEffect, useState } from 'react'
import { backendUrl } from '../App';
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';
import Login from './Login';

const CreateEvent = () => {
  const navigate = useNavigate();

  const token = useSelector(state=>state.token);
  const user = useSelector(state=>state.user);

  const [eventName,setEventName] = useState('cricket');
  const [totalSeats,setTotalSeats] = useState('');
  const [description,setDescription] = useState('');
  const [venue,setVenue] = useState('');
  const [date,setDate] = useState(new Date().toLocaleDateString());
  console.log(date);

  const submitHandler = async (e)=> {
    e.preventDefault();
    if(!token) {
        alert('please login first');
        return navigate('/login');
    }
    if(!totalSeats){
        return alert('please enter total participants');
    }
    if(description.length<8){
        return alert('Please add a description upto 8 characters')
    }
    if(!venue) {
      return alert('Please enter a venue')
    }
    if(new Date(date) < Date.now()-3600) {
      return alert('date can not be smaller than today');
    }
    const res = await fetch(`${backendUrl}/event/createevent`,{
        method:'post',
        headers:{
          'Content-Type':'application/json',
          token
        },
        body:JSON.stringify({eventName,totalSeats,description,startDate:date,venue})
    });
    const data = await res.json();
    console.log(data);
    alert('event created successfully');
  }
  useEffect(()=>{
    if(!token || !user) navigate('/login');
  },[])
  return (
    <>
    <NavBar/>
    <div className='container mt-3 mb-3'>
        <h2 className='mob-3'>Create an Event</h2>
        <form onSubmit={submitHandler}>
        <p>Select Sport :</p>
        <select className='form-select form-select-lg mb-3' value={eventName} onChange={(e)=>setEventName(e.target.value)}>
            <option value="cricket">Cricket</option>
            <option value="volleyball">Vollyball</option>
            <option value="badminton">Badminton</option>
            <option value="football">Football</option>
            <option value="basketball">Basketball</option>
        </select>
        <div className="mb-3">
          <label htmlFor="totalseats" className="form-label">Total Participants</label>
          <input type="number" className="form-control" id="totalseats" placeholder="enter number of participants"
            value={totalSeats} onChange={(e)=>setTotalSeats(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="venue" className="form-label">Venue</label>
          <input type="text" className="form-control" id="venue" placeholder="enter venue of event"
            value={venue} onChange={(e)=>{setVenue(e.target.value)}}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="dateevent" className="form-label">Start Date</label>
          <input type="date" className="form-control" id="dateevent"
            value={date} onChange={(e)=>setDate(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description-area" className="form-label">Description</label>
          <textarea className="form-control" id="description-area" rows="3"
            value={description} onChange={(e)=>setDescription(e.target.value)}
            placeholder='Enter description about event minimun 8 characters'
          ></textarea>
        </div>
        <button className='btn btn-outline-success' type='submit'>Create Event</button>
        </form>
    </div>
    </>
  )
}

const form = ()=> {
  return (
    <>
      <div className="mb-3">
      <label htmlFor="exampleFormControlInput1" className="form-label">Email address</label>
      <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
    </div>
    <div className="mb-3">
      <label htmlFor="exampleFormControlTextarea1" className="form-label">Example textarea</label>
      <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
    </div>
    </>
  )
}

export default CreateEvent