import React, { useState } from "react";
import axios from "axios";
import { axiosInstance } from "../../config";

const AddNews = ({ setCloseAddNews }) => {
  const [files, setFiles] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [newsTitle, setNewsTitle] = useState("");
  const [writers, setWriters] = useState([]);
  const [details, setDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // loading state

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files).slice(0, 15);
    setFiles(selectedFiles);
    const previews = selectedFiles.map((file) => URL.createObjectURL(file));
    setPreviewImages(previews);
  };

  const handleRemoveImage = (index) => {
    const updatedFiles = [...files];
    updatedFiles.splice(index, 1);
    setFiles(updatedFiles);

    const updatedPreviews = [...previewImages];
    updatedPreviews.splice(index, 1);
    setPreviewImages(updatedPreviews);
  };

  const moveImage = (index, direction) => {
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= previewImages.length) return;

    const updatedPreviews = [...previewImages];
    const updatedFiles = [...files];

    [updatedPreviews[index], updatedPreviews[newIndex]] = [
      updatedPreviews[newIndex],
      updatedPreviews[index],
    ];
    [updatedFiles[index], updatedFiles[newIndex]] = [
      updatedFiles[newIndex],
      updatedFiles[index],
    ];

    setPreviewImages(updatedPreviews);
    setFiles(updatedFiles);
  };

  const addWriter = () =>
    setWriters([
      ...writers,
      { name: "", position: "", img: null, preview: null },
    ]);

  const handleWriterChange = (index, e) => {
    const updated = [...writers];
    const { name, value, files } = e.target;
    if (name === "img") {
      const file = files[0];
      updated[index].img = file;
      updated[index].preview = URL.createObjectURL(file);
    } else {
      updated[index][name] = value;
    }
    setWriters([...updated]);
  };

  const addDetail = () =>
    setDetails([...details, { sub_title: "", details: "" }]);

  const handleDetailChange = (index, e) => {
    const updated = [...details];
    updated[index][e.target.name] = e.target.value;
    setDetails([...updated]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!newsTitle.trim()) {
      alert("News title is required.");
      return;
    }

    if (files.length === 0) {
      alert("Please upload at least one image.");
      return;
    }

    for (let i = 0; i < writers.length; i++) {
      if (!writers[i].name.trim() || !writers[i].position.trim()) {
        alert(`Writer ${i + 1} must have a name and position.`);
        return;
      }
    }

    for (let i = 0; i < details.length; i++) {
      if (!details[i].sub_title.trim() || !details[i].details.trim()) {
        alert(`News detail ${i + 1} must have a subtitle and details.`);
        return;
      }
    }

    setIsLoading(true);

    try {
      // Upload news images
      const uploadPromises = files.map((file) => {
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "cwoaauploads");

        return axios
          .post(
            "https://api.cloudinary.com/v1_1/priestlythedon/image/upload",
            data,
            {
              headers: { "Content-Type": "multipart/form-data" },
            }
          )
          .then((res) => ({
            url: res.data.secure_url,
            public_id: res.data.public_id,
          }));
      });

      // Upload writer images
      const writerUploadPromises = writers.map(async (writer) => {
        if (writer.img) {
          const data = new FormData();
          data.append("file", writer.img);
          data.append("upload_preset", "cwoaauploads");

          const res = await axios.post(
            "https://api.cloudinary.com/v1_1/priestlythedon/image/upload",
            data,
            {
              headers: { "Content-Type": "multipart/form-data" },
            }
          );

          return {
            name: writer.name,
            position: writer.position,
            img: {
              url: res.data.secure_url,
              public_id: res.data.public_id,
            },
          };
        } else {
          return {
            name: writer.name,
            position: writer.position,
            img: { url: "", public_id: "" },
          };
        }
      });

      const uploadedImages = await Promise.all(uploadPromises);
      const uploadedWriters = await Promise.all(writerUploadPromises);

      const response = await axiosInstance.post("/news", {
        news_img: uploadedImages,
        news_title: newsTitle,
        news_writer: uploadedWriters,
        news_details: details,
      });

      if (response.data) {
        setNewsTitle("");
        setFiles([]);
        setPreviewImages([]);
        setWriters([]);
        setDetails([]);
        setIsLoading(false);
        window.location.reload();
      }
    } catch (err) {
      console.error(err);
      setIsLoading(false);
    }
  };

  return (
    <div className="add_event_cover">
      <div className="wrapper scrollable">
        <span onClick={() => setCloseAddNews(true)} className="close">X</span>
        <h1>Add News</h1>

        <div className="item">
          <label className="label">Choose up to 15 images</label>
          <input type="file" multiple onChange={handleFileChange} />
        </div>

        {previewImages.length > 0 && (
          <div className="preview">
            <h3>Selected Images:</h3>
            <div className="image-preview-grid">
              {previewImages.map((src, idx) => (
                <div className="image-box" key={idx}>
                  <img src={src} alt={`Preview ${idx}`} />
                  <div className="img-actions bg-white p-2">
                    <button disabled={idx === 0} onClick={() => moveImage(idx, -1)}>←</button>
                    <button disabled={idx === previewImages.length - 1} onClick={() => moveImage(idx, 1)}>→</button>
                    <button className="remove-image" onClick={() => handleRemoveImage(idx)}>×</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="item">
          <label className="label mt-3">News Title:</label>
          <input
            type="text"
            name="news_title"
            value={newsTitle}
            onChange={(e) => setNewsTitle(e.target.value)}
            className="input"
          />
        </div>

        <div className="item mt-3">
          <h3>Writers</h3>
          {writers.map((writer, idx) => (
            <div key={idx} className="item">
              <label className="label mt-3">Name:</label>
              <input
                type="text"
                name="name"
                value={writer.name}
                onChange={(e) => handleWriterChange(idx, e)}
                className="input"
              />
              <label className="label mt-3">Position:</label>
              <input
                type="text"
                name="position"
                value={writer.position}
                onChange={(e) => handleWriterChange(idx, e)}
                className="input"
              />
              <label className="label mt-3">Writer Image:</label>
              {writer.preview && (
                <img src={writer.preview} alt="Writer Preview" className="preview-img-small mb-3" />
              )}
              <input
                type="file"
                name="img"
                onChange={(e) => handleWriterChange(idx, e)}
              />
            </div>
          ))}
          <button onClick={addWriter}>Add Writer</button>
        </div>

        <div className="item mt-3">
          <h3>News Details</h3>
          {details.map((detail, idx) => (
            <div key={idx} className="item mt-3">
              <label className="label mt-3">Sub Title:</label>
              <input
                type="text"
                name="sub_title"
                value={detail.sub_title}
                onChange={(e) => handleDetailChange(idx, e)}
                className="input"
              />
              <label className="label mt-3">Details:</label>
              <textarea
                name="details"
                value={detail.details}
                onChange={(e) => handleDetailChange(idx, e)}
                className="textarea"
                rows={3}
              />
            </div>
          ))}
          <button onClick={addDetail}>Add Detail</button>
        </div>

        <button
          className="addButton mt-4"
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? "Creating..." : "Create"}
        </button>
      </div>
    </div>
  );
};

export default AddNews;
