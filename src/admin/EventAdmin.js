import React from "react";
import "./admin.css";
import { axiosInstance } from "../config";

const Adminsingle = ({ event, onDelete }) => {
  const { _id, event_img, event_desc = "", event_title } = event;

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/events/${_id}`);
      if (onDelete) onDelete(_id); // Notify parent to remove from state
    } catch (err) {
      console.error("Error deleting event:", err);
    }
  };

  const firstImage =
    Array.isArray(event_img) && event_img.length > 0 ? event_img[0] : null;

    const truncateText = (text, length = 20) => {
      return text.length > length ? text.slice(0, length) + "..." : text;
    };
    

  return (
    <div
      className="row event_row d-flex justify-content-center p-3 border"
    >
      <div clasNames="flex flex-column items-center justify-center rounded-xl bg-gradient-to-br from-white to-gray-50 bg-clip-border text-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
        <div className="relative mx-4 -mt-6 h-40 overflow-hidden rounded-xl bg-clip-border shadow-lg group">
          <div classame="absolute inset-0 flex items-center justify-center">
            {firstImage ? (
              <img
                src={firstImage.url || "/no-image.jpg"}
                alt="Event"
                className="upload_img"
              />
            ) : (
              <p>No image available</p>
            )}
          </div>
        </div>
        <div className="p-10">
          <h5 className="mt-3 mb-2 block font-sans text-sm font-semibold leading-snug tracking-normal text-gray-900 antialiased group-hover:text-blue-600 transition-colors duration-300">
          <h5 className="fw-bold">Title:</h5>
            {truncateText(event_title)}
          </h5>
          <p className="block font-sans text-base font-light leading-relaxed text-gray-700 antialiased">
            <h5 className="fw-semibold">Event details:</h5>
            {truncateText(event_desc)}
          </p>
        </div>

        <div className="bg-dark p-2 row col-12 mt-3 mb-3 flex items-center justify-center">
        <a
          href={`/updateevent/${_id}`}
          className="col-lg-12 btn btn-sm btn-light edit_btn"
        >
          Edit
        </a>
        <button
          className="col-lg-12 mt-2 btn btn-sm btn-danger"
          onClick={handleDelete}
        >
          Delete
        </button>
        <button
          className="col-lg-12 mt-2 btn btn-sm btn-dark"
        >
          <a className="col-lg-12 btn btn-sm btn-dark edit_btn" href={`/eventsinglepage/${_id}`}>
          View
          </a>
        </button>
      </div>
      </div>

      
    </div>
  );
};

export default Adminsingle;
