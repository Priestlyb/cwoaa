import React, { useState } from "react";
import axios from "axios";
import { axiosInstance } from "../../config";

const EventsAdd = ({ setCloseAddEvent }) => {
  const [eventTitle, setEventTitle] = useState("");
  const [eventSubTitle, setEventSubTitle] = useState("");
  const [eventDesc, setEventDesc] = useState("");
  const [eventHost, setEventHost] = useState([]);
  const [eventSpeakers, setEventSpeakers] = useState([]);
  const [eventPhone, setEventPhone] = useState("");
  const [eventEmail, setEventEmail] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [files, setFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // loading state

  const handleImages = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const filesWithPreview = selectedFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setFiles(filesWithPreview);
  };

  const handleWriterChange = (index, e) => {
    const updated = [...eventHost];
    const { name, value, files } = e.target;
    if (name === "img") {
      const file = files[0];
      updated[index].img = file;
      updated[index].preview = URL.createObjectURL(file);
    } else {
      updated[index][name] = value;
    }
    setEventHost(updated);
  };

  const addEventHost = () =>
    setEventHost([
      ...eventHost,
      { name: "", title: "", img: null, preview: null },
    ]);

  const handleSpeakerChange = (index, e) => {
    const updated = [...eventSpeakers];
    const { name, value, files } = e.target;
    if (name === "img") {
      const file = files[0];
      updated[index].img = file;
      updated[index].preview = URL.createObjectURL(file);
    } else {
      updated[index][name] = value;
    }
    setEventSpeakers(updated);
  };

  const addEventSpeaker = () =>
    setEventSpeakers([
      ...eventSpeakers,
      { name: "", email: "", img: null, preview: null },
    ]);

  const deleteEventHost = (index) => {
    const updated = [...eventHost];
    updated.splice(index, 1);
    setEventHost(updated);
  };

  const deleteEventSpeaker = (index) => {
    const updated = [...eventSpeakers];
    updated.splice(index, 1);
    setEventSpeakers(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      // Upload event images
      const uploadPromises = files.map((fileObj) => {
        const data = new FormData();
        data.append("file", fileObj.file);
        data.append("upload_preset", "cwoaauploads");
        return axios.post(
          "https://api.cloudinary.com/v1_1/priestlythedon/image/upload",
          data
        );
      });

      // Upload event hosts
      const hostUploadPromises = eventHost.map(async (host) => {
        if (host.img) {
          const data = new FormData();
          data.append("file", host.img);
          data.append("upload_preset", "cwoaauploads");
          const res = await axios.post(
            "https://api.cloudinary.com/v1_1/priestlythedon/image/upload",
            data
          );
          return {
            name: host.name,
            title: host.title,
            img: {
              url: res.data.secure_url,
              public_id: res.data.public_id,
            },
          };
        } else {
          return {
            name: host.name,
            title: host.title,
            img: { url: "", public_id: "" },
          };
        }
      });

      // Upload speakers
      const speakerUploadPromises = eventSpeakers.map(async (spk) => {
        if (spk.img) {
          const data = new FormData();
          data.append("file", spk.img);
          data.append("upload_preset", "cwoaauploads");
          const res = await axios.post(
            "https://api.cloudinary.com/v1_1/priestlythedon/image/upload",
            data
          );
          return {
            name: spk.name,
            email: spk.email,
            img: {
              url: res.data.secure_url,
              public_id: res.data.public_id,
            },
          };
        } else {
          return {
            name: spk.name,
            email: spk.email,
            img: { url: "", public_id: "" },
          };
        }
      });

      const uploadedImages = await Promise.all(uploadPromises);
      const uploadedHosts = await Promise.all(hostUploadPromises);
      const uploadedSpeakers = await Promise.all(speakerUploadPromises);

      const response = await axiosInstance.post("/events", {
        event_img: uploadedImages.map((res) => ({
          url: res.data.secure_url,
          public_id: res.data.public_id,
        })),
        event_title: eventTitle,
        event_sub_title: eventSubTitle,
        event_desc: eventDesc,
        event_host: uploadedHosts,
        event_speakers: uploadedSpeakers,
        event_phone_number: eventPhone,
        event_email: eventEmail,
        event_location: eventLocation,
        event_date: eventDate,
        event_time: eventTime,
      });

      console.log("Event created:", response.data);
      setIsLoading(false);
      window.location.reload();
    } catch (err) {
      console.error("Upload failed:", err);
      setIsLoading(false);
    }
  };

  const handleImageDelete = (index) => {
    const updatedFiles = [...files];
    updatedFiles.splice(index, 1);
    setFiles(updatedFiles);
  };

  const handleStarImage = (index) => {
    if (index === 0) return;
    const updatedFiles = [...files];
    const [starred] = updatedFiles.splice(index, 1);
    setFiles([starred, ...updatedFiles]);
  };

  return (
    <div className="add_event_cover">
      <div className="wrapper scrollable">
        <span onClick={() => setCloseAddEvent(true)} className="close  mt-3">
          X
        </span>
        <h2 className=" mt-3">Add New Event</h2>
        <form onSubmit={handleSubmit}>
          <div className="item">
            <label className="label">Title</label>
            <input
              className="input"
              type="text"
              value={eventTitle}
              onChange={(e) => setEventTitle(e.target.value)}
            />
          </div>
          <div className="item">
            <label className="label">Subtitle</label>
            <input
              className="input"
              type="text"
              value={eventSubTitle}
              onChange={(e) => setEventSubTitle(e.target.value)}
            />
          </div>
          <div className="item">
            <label className="label">Description</label>
            <textarea
              className="textarea"
              rows={5}
              value={eventDesc}
              onChange={(e) => setEventDesc(e.target.value)}
            />
          </div>
          <div className="item">
            <label className="label">Phone Number</label>
            <input
              className="input"
              type="text"
              value={eventPhone}
              onChange={(e) => setEventPhone(e.target.value)}
            />
          </div>
          <div className="item">
            <label className="label">Email</label>
            <input
              className="input"
              type="email"
              value={eventEmail}
              onChange={(e) => setEventEmail(e.target.value)}
            />
          </div>
          <div className="item">
            <label className="label">Location</label>
            <input
              className="input"
              type="text"
              value={eventLocation}
              onChange={(e) => setEventLocation(e.target.value)}
            />
          </div>
          <div className="item">
            <label className="label">Date</label>
            <input
              className="input"
              type="date"
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
            />
          </div>
          <div className="item">
            <label className="label text-5xl">Time</label>
            <input
              className="input"
              type="text"
              value={eventTime}
              onChange={(e) => setEventTime(e.target.value)}
            />
          </div>
          <div className="item">
            <label className="label">Event Images</label>
            <input type="file" multiple onChange={handleImages} />
            <div className="image-preview-grid">
              {files.map((file, idx) => (
                <div className="image-box" key={idx}>
                  <img src={file.preview} alt={`Preview ${idx}`} />
                  <div className="img-actions bg-white rounded p-1">
                    <button
                      type="button"
                      onClick={() => handleImageDelete(idx)}
                    >
                      Delete
                    </button>
                    <button type="button" onClick={() => handleStarImage(idx)}>
                      {idx === 0 ? "⭐" : "☆"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="item mt-3">
            <h3>Event Hosts</h3>
            {eventHost.map((host, idx) => (
              <div className="item gap-3" key={idx}>
                <label className="label mt-3">Name</label>
                <input
                  className="input"
                  type="text"
                  name="name"
                  value={host.name}
                  onChange={(e) => handleWriterChange(idx, e)}
                />
                <label className="label mt-3">Title</label>
                <input
                  className="input"
                  type="text"
                  name="title"
                  value={host.title}
                  onChange={(e) => handleWriterChange(idx, e)}
                />
                <label className="label mt-3">Image</label>
                {host.preview && (
                  <img
                    src={host.preview}
                    alt="Host Preview"
                    className="preview-img-small"
                  />
                )}
                <input
                  className="my-3"
                  type="file"
                  name="img"
                  onChange={(e) => handleWriterChange(idx, e)}
                />
                <button
                  type="button"
                  onClick={() => deleteEventHost(idx)}
                  className=" bg-danger addButton"
                >
                  Delete Host
                </button>
              </div>
            ))}

            <button className="addButton" type="button" onClick={addEventHost}>
              Add Host
            </button>
          </div>

          <div className="item mt-3">
            <h3>Event Speakers</h3>
            {eventSpeakers.map((spk, idx) => (
              <div className="item gap-3" key={idx}>
                <label className="label mt-3">Name</label>
                <input
                  className="input"
                  type="text"
                  name="name"
                  value={spk.name}
                  onChange={(e) => handleSpeakerChange(idx, e)}
                />
                <label className="label">Email</label>
                <input
                  className="input"
                  type="email"
                  name="email"
                  value={spk.email}
                  onChange={(e) => handleSpeakerChange(idx, e)}
                />
                <label className="label">Image</label>
                {spk.preview && (
                  <img
                    src={spk.preview}
                    alt="Speaker Preview"
                    className="preview-img-small"
                  />
                )}
                <input
                  className="my-3"
                  type="file"
                  name="img"
                  onChange={(e) => handleSpeakerChange(idx, e)}
                />
                <button
                className="bg-danger addButton"
                  type="button"
                  onClick={() => deleteEventSpeaker(idx)}
                >
                  Delete Speaker
                </button>
              </div>
            ))}

            <button
              type="button"
              onClick={addEventSpeaker}
              className="addButton"
            >
              Add Speaker
            </button>
          </div>

          <button type="submit" className="addButton" disabled={isLoading}>
            {isLoading ? (
              <div disabled={isLoading}>
                <span className="spinner" disabled={isLoading} /> Creating...
              </div >
            ) : (
              "Create"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EventsAdd;
