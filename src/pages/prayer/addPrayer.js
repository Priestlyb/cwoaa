import React, { useState } from "react";
import { axiosInstance } from "../../config";

const AddPrayer = ({ setCloseAddPrayer }) => {
  const [prayer, setPrayer] = useState({ name: "", details: "", img: [], preview: [] });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "img") {
      const fileArray = Array.from(files);
      setPrayer((prev) => ({
        ...prev,
        img: fileArray,
        preview: fileArray.map((file) => URL.createObjectURL(file)),
      }));
    } else {
      setPrayer((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", prayer.name);
      formData.append("details", prayer.details);
      prayer.img.forEach((file) => formData.append("img", file)); // Important: must match backend multer field

      const response = await axiosInstance.post("/prayers", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("Prayer created:", response.data);
      setIsLoading(false);
      window.location.reload();
    } catch (err) {
      console.error("Upload failed:", err);
      setIsLoading(false);
    }
  };

  return (
    <div className="add_event_cover">
      <div className="wrapper scrollable">
        <span onClick={() => setCloseAddPrayer(true)} className="close">X</span>
        <h1>Add a New Prayer</h1>

        <form onSubmit={handleSubmit} className="item">
          <label className="label mt-3">Prayer Title</label>
          <input
            className="input"
            type="text"
            name="name"
            value={prayer.name}
            onChange={handleChange}
            required
          />

          <label className="label mt-3">Prayer Details</label>
          <textarea
            className="textarea"
            name="details"
            rows={5}
            value={prayer.details}
            onChange={handleChange}
            required
          />

          <label className="label mt-3">Upload Images</label>
          <input
            className="my-3"
            type="file"
            name="img"
            multiple
            accept="image/*"
            onChange={handleChange}
          />

          {prayer.preview?.length > 0 && (
            <div className="image-box">
              {prayer.preview.map((src, idx) => (
                <img
                  key={idx}
                  src={src}
                  alt={`Preview ${idx}`}
                  className="preview-img-small"
                />
              ))}
            </div>
          )}

          <button type="submit" className="addButton" disabled={isLoading}>
            {isLoading ? (
              <>
                <span className="spinner" /> Creating...
              </>
            ) : (
              "Create"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPrayer;
