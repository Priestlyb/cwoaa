import React from "react";
import "./admin.css";
import { axiosInstance } from "../config";

const prayerAdmin = ({ id, name, details, img, onDelete }) => {
  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/prayers/${id}`);
      if (onDelete) onDelete(id); // Notify parent to remove from state
    } catch (err) {
      console.error("Error deleting event:", err);
    }
  };

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
          <div className="absolute inset-0 flex items-center justify-center">
            {img && img.length > 0 ? (
              <img src={img[0].url} alt="Prayer" className="upload_img" />
            ) : (
              <p>No image available</p>
            )}
          </div>
        </div>
        <div class="p-6">
          <h5 class="mt-3 mb-2 block font-sans text-sm font-semibold leading-snug tracking-normal text-gray-900 antialiased group-hover:text-blue-600 transition-colors duration-300">
            <h5 className="fw-bold">Title:</h5>
            {truncateText(name)}
          </h5>
          <p class="block font-sans text-base font-light leading-relaxed text-gray-700 antialiased">
            <h5 className="fw-semibold">Prayer details:</h5>
            {truncateText(details)}
          </p>
        </div>

        <div className="row col-12 mt-3 mb-3">
          <a
            href={`/updateprayer/${id}`}
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
        </div>
      </div>
    </div>
  );
};

export default prayerAdmin;
