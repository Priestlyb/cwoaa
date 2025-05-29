import React from "react";
import "./admin.css";
import { axiosInstance } from "../config";

const NewsAdmin = ({ news, onDelete }) => {
  const { _id, news_img, news_title, news_writer, news_details } = news;

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/news/${_id}`);
      if (onDelete) onDelete(_id); // Notify parent to remove from state
    } catch (err) {
      console.error("Error deleting event:", err);
    }
  };

  const firstImage =
    Array.isArray(news_img) && news_img.length > 0 ? news_img[0] : null;

    const truncateText = (text, length = 20) => {
      return text.length > length ? text.slice(0, length) + "..." : text;
    };
    

  return (
    <div
      className="row event_row d-flex justify-content-center p-3 border"
      data-aos="fade-up"
    >
      <div class="flex flex-column items-center justify-center rounded-xl bg-gradient-to-br from-white to-gray-50 bg-clip-border text-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
        <div class="relative mx-4 -mt-6 h-40 overflow-hidden rounded-xl bg-clip-border shadow-lg group">
          <div class="absolute inset-0 flex items-center justify-center">
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
        <div class="p-6">
          <h5 class="mt-3 mb-2 block font-sans text-sm font-semibold leading-snug tracking-normal text-gray-900 antialiased group-hover:text-blue-600 transition-colors duration-300">
          <h5 className="fw-bold">Title:</h5>
            {truncateText(news_title)}
          </h5>
        </div>

        <div className="bg-dark p-2 row col-12 mt-3 mb-3">
        <a
          href={`/updatenews/${_id}`}
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
          <a className="col-lg-12 btn btn-sm btn-dark edit_btn" href={`/news/${_id}`}>
          View
          </a>
        </button>
      </div>
      </div>

      
    </div>
  );
};

export default NewsAdmin;
