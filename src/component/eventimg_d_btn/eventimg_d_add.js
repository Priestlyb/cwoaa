import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../config";

const EventImgDataadd = ({ setClose, event }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [inputs, setInputs] = useState({
    event_img: event?.event_img ?? [],
  });

  // Fetch event data
  useEffect(() => {
    const fetchHandler = async () => {
      try {
        const res = await axiosInstance.get(`/events/${id}`);
        setInputs(res.data.event); // assumes event_img is an array
      } catch (err) {
        console.error("Error fetching event:", err);
      }
    };
    fetchHandler();
  }, [id]);

  // Upload new image
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    try {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "cwoaauploads");

      const uploadRes = await axiosInstance.put(
        "https://api.cloudinary.com/v1_1/priestlythedon/image/upload",
        data
      );
      const { url } = uploadRes.data;

      const updatedImages = [...inputs.event_img, url];

      const response = await axiosInstance.put(`/events/${id}`, {
        event_img: updatedImages,
      });

      if (response.data) {
        setInputs((prev) => ({
          ...prev,
          event_img: updatedImages,
        }));
        setFile(null);
      }
    } catch (err) {
      console.error("Image upload error:", err);
    }
  };

  // Delete an image
  const handleDeleteImage = async (imgUrl) => {
    try {
      const filteredImages = inputs.event_img.filter((img) => img !== imgUrl);

      const response = await axiosInstance.put(`/events/${id}`, {
        event_img: filteredImages,
      });

      if (response.data) {
        setInputs((prev) => ({
          ...prev,
          event_img: filteredImages,
        }));
      }
    } catch (err) {
      console.error("Failed to delete image:", err);
    }
  };

  return (
    <div className="wrapper">
      <h1>Edit Event Images</h1>

      {/* Display current images */}
      <div className="images-container d-flex flex-wrap gap-3">
        {inputs.event_img?.map((imgUrl, index) => (
          <div key={index} className="position-relative">
            <img src={imgUrl} alt={`event-${index}`} className="eventImg w-50" />
            <button
              onClick={() => handleDeleteImage(imgUrl)}
              className="position-absolute top-0 end-0 bg-danger text-white border-0 rounded-circle"
              style={{ width: "24px", height: "24px" }}
              title="Delete image"
            >
              ×
            </button>
          </div>
        ))}
      </div>

      {/* Upload new image */}
      <div className="mt-4">
        <label>Choose a new image</label>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button
          className="btn mt-3 border bg-dark text-light"
          onClick={handleSubmit}
        >
          Upload Image
        </button>
      </div>
    </div>
  );
};

export default EventImgDataadd;
