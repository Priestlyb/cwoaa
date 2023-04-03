import React from 'react';
import { useState, useEffect } from 'react';
import { axiosInstance } from '../../config';
import { useParams, useNavigate } from 'react-router-dom';

const EventsEdit = ({ event }) => {
  const id = useParams().id;
  const history = useNavigate();

  useEffect(() => {
    const fetchHandler = async () => {
      await axiosInstance
        .get(`/events/${id}`)
        .then((res) => res.data)
        .then(data => setInputs(data.event));
    };
    fetchHandler();
  }, [id]);

  const [inputs, setInputs] = useState({
    event_img: event?.event_img ?? '',
    event_desc: event?.event_desc ?? '',
    event_title: event?.event_title ?? '',
    event_sub_title: event?.event_sub_title ?? ''
  });

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await axiosInstance.put(`/events/${id}`, {
      event_title: inputs.event_title,
      event_sub_title: inputs.event_sub_title,
      event_desc: inputs.event_desc,
    });
    if (response.data) {
      setInputs({
        event_title: '',
        event_sub_title: '',
        event_desc: '',
      });
      history(`/EventSinglePage/${id}`);
    }
  };


  return (
    <div className="eventsEdit">
      <h1>Edit Event</h1>

      <div className="item">
        <label className="label">Event Title</label>
        <input type="text" name="event_title" value={inputs.event_title} onChange={handleChange} className='input' />
      </div>

      <div className="item">
        <label className="label">Event Sub Title</label>
        <input type="text" name="event_sub_title" value={inputs.event_sub_title} onChange={handleChange} className='input' />
      </div>

      <label className="label">Event Description</label>
      <textarea rows={4} type="text" name="event_desc" value={inputs.event_desc} onChange={handleChange} className='textarea' />

      <button className="eventsEdit_btn" onClick={handleSubmit}>
        Update
      </button>
    </div>
  );
};

export default EventsEdit;
