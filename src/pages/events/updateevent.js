import React from 'react';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EventsEdit = ({ event }) => {
  const id = useParams().id;
  const history = useNavigate();
  const [file, setFile] = useState(null);

  useEffect(() => {
    const fetchHandler = async () => {
      await axios
        .get(`http://localhost:9000/events/${id}`)
        .then((res) => res.data)
        .then(data => setInputs(data.event));
    };
    fetchHandler();
  }, [id]);

  const [inputs, setInputs] = useState({
    event_img: event?.event_img ?? '',
    event_desc: event?.event_desc ?? '',
  });

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'uploads');
    const uploadRes = await axios.post(
      'https://api.cloudinary.com/v1_1/priestlythedon/image/upload',
      data
    );
    const { url } = uploadRes.data;

    const response = await axios.put(`http://localhost:9000/events/${id}`, {
      event_img: url,
      event_desc: inputs.event_desc,
    });
    if (response.data) {
      setInputs({
        event_img: '',
        event_desc: '',
      });
      history('/cawa411');
    }
  };
  

  return (
    <div className="eventsEdit">
      <h1>Edit Event</h1>

      
      <div className="item">
          <label className="label">Current Image</label>
          {inputs.event_img && (
            <img src={inputs.event_img} alt="Current Event" className="eventImg" />
          )}
        </div>


      <div className="item">
        <label className="label">Choose a new image</label>
        <input type="file" className='input' onChange={(e) => setFile(e.target.files[0])} />
      </div>

      {/* <div className="item">
        <label className="label">Event Title</label>
        <input type="text" className='input' />
      </div> */}

      <label className="label">Event Description</label>
      <textarea rows={4} type="text" name="event_desc" value={inputs.event_desc} onChange={handleChange} className='textarea' />

      <button className="eventsEdit_btn" onClick={handleSubmit}>
          Update
        </button>
    </div>
  );
};

export default EventsEdit;
