import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../config';

const EventsAdd = (props, { setClose }) => {

  const {  id, } = props.event;
  const history = useNavigate();
  const [file, setFile] = useState(null);
  // const [extra_event_img, setExtraOption] = useState([]);
  // const [extra, setExtra] = useState(null);
  const [inputs, setInputs] = useState({
    event_img: '',
    event_title: '',
    event_sub_title: '',
    event_desc: '',
  });

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // const handleExtraInput = (e) => {
  //   setExtra({ ...extra, [e.target.name]: e.target.value });
  // };

  // const handleExtra = (e) => {
  //   setExtraOption((prev) => [...prev, extra]);
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'cwoaauploads');
    const uploadRes = await axiosInstance.post(
      'https://api.cloudinary.com/v1_1/priestlythedon/image/upload',
      data
    );
    const { url } = uploadRes.data;

    const response = await axiosInstance.post('/events', {
      event_img: url,
      event_title: inputs.event_title,
      event_sub_title: inputs.event_sub_title,
      event_desc: inputs.event_desc,
    });
    if (response.data) {
      setInputs({
        event_img: '',
        event_title: '',
        event_sub_title: '',
        event_desc: '',
      });
      history(`/eventsinglepage/${id}`);
    }
  };

  return (
    <div className="event">
      <div className="wrapper">
        <span onClick={() => setClose(true)} className="close">
          X
        </span>
        <h1>Add a New Event</h1>
        <div className="item">
          <label className="label">Choose an image</label>
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        </div>
        
        <div className="item">
          <label className="label">Event Title</label>
          <input type="text" name="event_title" value={inputs.event_title} onChange={handleChange} />
        </div>
        
        <div className="item">
          <label className="label">Event Sub Title</label>
          <input type="text" name="event_sub_title" value={inputs.event_sub_title} onChange={handleChange} />
        </div>

        <div className="item">
          <label className="label">Event Description</label>
          <textarea rows={4} type="text" name="event_desc" value={inputs.event_desc} onChange={handleChange} />
        </div>

        <button className="addButton" onClick={handleSubmit}>
          Create
        </button>
      </div>
    </div>
  );
};

export default EventsAdd;
