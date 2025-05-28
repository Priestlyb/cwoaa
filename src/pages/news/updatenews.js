// UpdatedNews.jsx
import React, { useState, useEffect } from "react";
import { axiosInstance } from "../../config";
import { useParams } from "react-router-dom";

const UpdateNews = () => {
  const { id } = useParams();
  const [newWriterImages, setNewWriterImages] = useState({});
  const [newImages, setNewImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [inputs, setInputs] = useState({
    news_img: [],
    news_title: "",
    news_writer: [],
    news_details: [],
  });

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const { data } = await axiosInstance.get(`/news/${id}`);
        if (!data.news.news_writer.length) {
          data.news.news_writer = [{ name: "", position: "", img: null }];
        }
        if (!data.news.news_details.length) {
          data.news.news_details = [{ sub_title: "", details: "" }];
        }
        setInputs(data.news);
      } catch (err) {
        setError("Failed to fetch news data.");
      }
    };
    fetchNews();
  }, [id]);

  const handleNewsDetailsChange = (index, field, value) => {
    setInputs((prev) => ({
      ...prev,
      news_details: prev.news_details.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      ),
    }));
  };

  const handleAddNewsDetail = () => {
    setInputs((prev) => ({
      ...prev,
      news_details: [...prev.news_details, { sub_title: "", details: "" }],
    }));
  };

  const handleDeleteNewsDetail = (index) => {
    setInputs((prev) => ({
      ...prev,
      news_details: prev.news_details.filter((_, i) => i !== index),
    }));
  };

  const handleWriterChange = (index, field, value) => {
    setInputs((prev) => ({
      ...prev,
      news_writer: prev.news_writer.map((writer, i) =>
        i === index ? { ...writer, [field]: value } : writer
      ),
    }));
  };

  const handleAddWriter = () => {
    setInputs((prev) => ({
      ...prev,
      news_writer: [...prev.news_writer, { name: "", position: "", img: null }],
    }));
  };

  const handleDeleteWriter = async (index, writer) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this writer?"
    );
    if (!confirm) return;

    // If the writer has no image or identifiable ID, treat it as a new, unsaved entry
    if (!writer.img || !writer.img.public_id) {
      setInputs((prev) => ({
        ...prev,
        news_writer: prev.news_writer.filter((_, i) => i !== index),
      }));
      handleDeleteNewWriterImage(index);
      return;
    }

    // Otherwise, proceed with deleting from backend
    try {
      await axiosInstance.delete(`/news/${id}/writer/${index}`);

      setInputs((prev) => ({
        ...prev,
        news_writer: prev.news_writer.filter((_, i) => i !== index),
      }));
      handleDeleteNewWriterImage(index);
    } catch (error) {
      console.error("❌ Failed to delete writer:", error);
      alert("Failed to delete writer. Please try again.");
    }
  };

  const handleWriterFileChange = (e, index) => {
    const file = e.target.files[0];
    const preview = URL.createObjectURL(file);
    setNewWriterImages((prev) => ({ ...prev, [index]: { file, preview } }));
  };

  const handleInputChange = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const previewFiles = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setNewImages((prev) => [...prev, ...previewFiles]);
  };

  const handleDeleteNew = (index) => {
    const updated = [...newImages];
    URL.revokeObjectURL(updated[index].preview);
    updated.splice(index, 1);
    setNewImages(updated);
  };

  const handleDeleteExistingNewsImg = async (publicId) => {
    if (!window.confirm("Are you sure you want to delete this image?")) return;
    try {
      const encodedPublicId = encodeURIComponent(publicId);
      await axiosInstance.delete(`/news/${id}/${encodedPublicId}`);
      setInputs((prev) => ({
        ...prev,
        news_img: prev.news_img.filter(
          (img) => (img?.public_id || img?.img?.public_id) !== publicId
        ),
      }));
    } catch (err) {
      console.error("❌ Failed to delete image:", err);
      alert("Failed to delete image. Please try again.");
    }
  };

  const handleDeleteExistingWriterImage = async (publicId, writerIndex) => {
    if (!window.confirm("Are you sure you want to delete this writer image?"))
      return;
    try {
      const encodedPublicId = encodeURIComponent(publicId);
      await axiosInstance.delete(`/delete-writer-image/${encodedPublicId}`);
      setInputs((prev) => ({
        ...prev,
        news_writer: prev.news_writer.map((writer, i) =>
          i === writerIndex ? { ...writer, img: null } : writer
        ),
      }));
    } catch (err) {
      console.error("❌ Failed to delete writer image:", err);
      alert("Failed to delete writer image. Please try again.");
    }
  };

  const handleDeleteNewWriterImage = (index) => {
    if (newWriterImages[index]) {
      URL.revokeObjectURL(newWriterImages[index].preview);
    }
    const updated = { ...newWriterImages };
    delete updated[index];
    setNewWriterImages(updated);
  };

  const handleMakePrimary = (index, isExisting) => {
    if (isExisting) {
      const updated = [...inputs.news_img];
      const [img] = updated.splice(index, 1);
      updated.unshift(img);
      setInputs((prev) => ({ ...prev, news_img: updated }));
    } else {
      const updated = [...newImages];
      const [img] = updated.splice(index, 1);
      updated.unshift(img);
      setNewImages(updated);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("news_title", inputs.news_title);

    Object.entries(newWriterImages).forEach(([index, data]) => {
      formData.append(`replacement_writer_img_${index}`, data.file);
    });

    newImages.forEach(({ file }) => {
      formData.append("news_img", file);
    });

    formData.append("news_writer_existing", JSON.stringify(inputs.news_writer));
    formData.append("news_details", JSON.stringify(inputs.news_details));
    formData.append("news_img_existing", JSON.stringify(inputs.news_img));

    try {
      await axiosInstance.put(`/news/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        timeout: 10000,
      });
      setNewImages([]);
      setNewWriterImages({});
      window.location.reload();
    } catch (err) {
      setError("Failed to update the news. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="eventsEdit">
      <h1>Edit News</h1>

      <div className="item">
        <label>Add New Images</label>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileChange}
        />
        <div className="image-preview-grid">
          {[
            ...inputs.news_img.map((img, index) => ({
              type: "existing",
              src: img.url,
              public_id: img.public_id,
              index,
            })),
            ...newImages.map((img, index) => ({
              type: "new",
              src: img.preview,
              index,
            })),
          ].map((img, i) => {
            const isPrimary =
              (img.type === "existing" && img.index === 0) ||
              (img.type === "new" &&
                inputs.news_img.length === 0 &&
                img.index === 0);
            return (
              <div
                key={i}
                className={`image-box ${isPrimary ? "primary" : ""}`}
              >
                <img src={img.src} alt={`news-${i}`} className="image" />
                {isPrimary && <span className="primary-label">Primary</span>}
                <div className="img-actions bg-white">
                  <button
                    onClick={() =>
                      img.type === "existing"
                        ? handleDeleteExistingNewsImg(img.public_id)
                        : handleDeleteNew(img.index)
                    }
                  >
                    Delete
                  </button>
                  <button
                    onClick={() =>
                      handleMakePrimary(img.index, img.type === "existing")
                    }
                  >
                    ⭐
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="item">
        <label className="label">News Title</label>
        <input
          type="text"
          name="news_title"
          value={inputs.news_title}
          onChange={handleInputChange}
          className="input"
        />
      </div>
      <hr />

      <h3>Writers</h3>
      {inputs.news_writer.map((writer, index) => (
        <div key={index} className="item">
          <h3 className="label">Name:</h3>
          <input
            type="text"
            className="input"
            placeholder="Name"
            value={writer.name}
            onChange={(e) => handleWriterChange(index, "name", e.target.value)}
          />
          <h3 className="label">Designation:</h3>
          <input
            type="text"
            className="input"
            placeholder="Designation"
            value={writer.position}
            onChange={(e) =>
              handleWriterChange(index, "position", e.target.value)
            }
          />
          <label className="label">Image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleWriterFileChange(e, index)}
          />

          <div className="image-preview-grid">
            {writer.img?.url && (
              <div className="image-box">
                <img src={writer.img.url} alt="writer-img" className="image" />
                <button
                  className="img-actions border-0 p-2"
                  onClick={() =>
                    handleDeleteExistingWriterImage(writer.img.public_id, index)
                  }
                >
                  🗑️
                </button>
              </div>
            )}

            {newWriterImages[index] && (
              <div className="image-box">
                <img
                  src={newWriterImages[index].preview}
                  alt="new-writer"
                  className="image"
                />
                <button
                  className="img-actions border-0 p-2"
                  onClick={() => handleDeleteNewWriterImage(index)}
                >
                  🗑️
                </button>
              </div>
            )}
          </div>
          <button
            onClick={() => handleDeleteWriter(index, writer)}
            className="w-20 border-none mb-2"
          >
            🗑️ Remove Writer
          </button>
        </div>
      ))}
      <button
        onClick={handleAddWriter}
        className="bg-dark text-white p-2 border-none"
      >
        + Add Writer
      </button>
      <hr />
      <h3>News Body</h3>
      {inputs.news_details.map((detail, index) => (
        <div key={index} className="item">
          <h3 className="label">Sub Title</h3>
          <input
            className="input"
            type="text"
            placeholder="Sub Title"
            value={detail.sub_title}
            onChange={(e) =>
              handleNewsDetailsChange(index, "sub_title", e.target.value)
            }
          />
          <h3 className="label">Details</h3>
          <textarea
            className="textarea"
            rows={4}
            placeholder="Details"
            value={detail.details}
            onChange={(e) =>
              handleNewsDetailsChange(index, "details", e.target.value)
            }
          />
          <button
            onClick={() => handleDeleteNewsDetail(index)}
            className="w-20 border-none mb-2"
          >
            🗑️ Remove
          </button>
        </div>
      ))}
      <button
        onClick={handleAddNewsDetail}
        className="bg-dark text-white p-2 border-none"
      >
        + Add Section
      </button>

      <hr />
      {loading && (
        <p className="bg-warning p-2 font-bold mt-3">
          Updating news, please wait...
        </p>
      )}

      <button className="eventsEdit_btn" onClick={handleSubmit}>
        Update
      </button>
    </div>
  );
};

export default UpdateNews;
