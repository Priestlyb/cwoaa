import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../config';

const EventsAdd = ({ setClose }) => {
  const history = useNavigate();
  const [files, setFiles] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
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

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files).slice(0, 15);
setFiles(selectedFiles);

const selectedPreviewImages = selectedFiles.map((file) => URL.createObjectURL(file));
setPreviewImages((prevImages) => [...prevImages, ...selectedPreviewImages]);

  };

  const handleRemoveImage = (index) => {
    const updatedPreviewImages = [...previewImages];
    updatedPreviewImages.splice(index, 1);
    setPreviewImages(updatedPreviewImages);

    const updatedFiles = [...files];
    updatedFiles.splice(index, 1);
    setFiles(updatedFiles);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const uploadPromises = files.map(async (file) => {
      const data = new FormData();
      data.append('file', file);
      data.append('upload_preset', 'cwoaauploads');
      const uploadRes = await axiosInstance.post(
        'https://api.cloudinary.com/v1_1/priestlythedon/image/upload',
        data
      );
      const { url } = uploadRes.data;
      return url;
    });

    try {
      const uploadedImageUrls = await Promise.all(uploadPromises);

      const response = await axiosInstance.post('http://localhost:9000/events', {
        event_img: uploadedImageUrls,
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
        setPreviewImages([]);
        setFiles([]);
        history(`/events`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="add_event_cover">
      <div className="wrapper">
        <span onClick={() => setClose(true)} className="close">
          X
        </span>
        <h1>Add a New Event</h1>
        <div className="item">
          <label className="label">Choose up to 15 images</label>
          <input type="file" multiple onChange={handleFileChange} />
        </div>

        {previewImages.length > 0 && (
          <div className="preview">
            <h3>Selected Images:</h3>
            <div className="image-container">
              {previewImages.map((previewImage, index) => (
                <div className="image-preview" key={index}>
                  <img width="20%" src={previewImage} alt={`Preview ${index}`} />
                  <span className="remove-image" onClick={() => handleRemoveImage(index)}>
                    X
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="item">
          <label className="label">Event Title</label>
          <input
            type="text"
            name="event_title"
            value={inputs.event_title}
            onChange={handleChange}
          />
        </div>

        <div className="item">
          <label className="label">Event Sub Title</label>
          <input
            type="text"
            name="event_sub_title"
            value={inputs.event_sub_title}
            onChange={handleChange}
          />
        </div>

        <div className="item">
          <label className="label">Event Description</label>
          <textarea
            rows={4}
            type="text"
            name="event_desc"
            value={inputs.event_desc}
            onChange={handleChange}
          />
        </div>

        <button className="addButton" onClick={handleSubmit}>
          Create
        </button>
      </div>
    </div>
  );
};

export default EventsAdd;
