import React from 'react';
import './admin.css';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../config';

const Adminsingle = (props) => {
  const history = useNavigate();
  const { _id, event_img, event_desc, event_title } = props.event;

  const deleteHandler = async () => {
    await axiosInstance
      .delete(`http://localhost:9000/events/${_id}`)
      .then((res) => res.data)
      .then(() => history('/'))
      .then(() => history('/admin'));
  };

  const firstImage = Array.isArray(event_img) && event_img.length > 0 ? event_img[0] : null;

  return (
    <div className="row event_row d-flex justify-content-center p-3 border" data-aos="fade-up">
      {/* events */}

      <div className="col-12 mt-3">
        <h6 className="fw-bold">Titles:</h6>
        <h2 className="event_title">{event_title}</h2>
      </div>

      <div className="col-12 mt-3 d-block justify-content-center align-items-center">
        <h6 className="fw-bold">Image:</h6>
        {firstImage ? (
          <img src={firstImage} alt="" className="upload_img" />
        ) : (
          <p>No image available</p>
        )}
        <a href={`/eventimgdataadd/${_id}`} className="edit_icon">
          <i className="mt-3 fa-regular fa-pen-to-square"></i>
        </a>
      </div>

      <div className="col-12 mt-3">
        <h6 className="fw-bold">Description:</h6>
        {event_desc.slice(0, 25)}. . .
      </div>

      <div className="row col-12 mt-3">
        <a href={`/updateevent/${_id}`} type="button" className="col-lg-12 btn btn-sm btn-light edit_btn">
          Edit
        </a>

        <button type="button" className="col-lg-12 mt-2 btn btn-sm btn-danger" onClick={deleteHandler}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default Adminsingle;
