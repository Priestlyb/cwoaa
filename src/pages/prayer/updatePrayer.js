import React, { useState, useEffect } from "react";
import { axiosInstance } from "../../config";
import { useParams } from "react-router-dom";

const UpdatePrayer = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [details, setDetails] = useState("");
  const [existingImages, setExistingImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [deletedImages, setDeletedImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchPrayer = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.get(`/prayers/${id}`);
        const data = res.data.prayer;

        setName(data.name || "");
        setDetails(data.details || "");
        setExistingImages(Array.isArray(data.img) ? data.img : []);
      } catch (err) {
        console.error("Failed to fetch prayer:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPrayer();
  }, [id]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const previews = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setNewImages((prev) => [...prev, ...previews]);
  };

  const handleRemoveExistingImage = (public_id) => {
    setExistingImages((prev) =>
      prev.filter((img) => img.public_id !== public_id)
    );
    setDeletedImages((prev) => [...prev, public_id]);
  };

  const handleRemoveNewImage = (index) => {
    URL.revokeObjectURL(newImages[index].preview);
    setNewImages((prev) => prev.filter((_, i) => i !== index));
  };

  const uploadImages = async () => {
    const results = await Promise.all(
      newImages.map(async ({ file }) => {
        const formData = new FormData();
        formData.append("image", file);
        try {
          const res = await axiosInstance.post(
            "/upload-prayer-image",
            formData,
            {
              headers: { "Content-Type": "multipart/form-data" },
            }
          );
          return res.data;
        } catch (err) {
          console.error("Image upload failed:", err);
          return null;
        }
      })
    );
    return results.filter(Boolean);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const uploaded = await uploadImages();
      const allImages = [...existingImages, ...uploaded];

      const payload = {
        name: name.trim(),
        details: details.trim(),
        img: allImages,
        deletedImages,
      };

      const res = await axiosInstance.put(`/prayers/${id}`, payload);
      if (res.data.success) {
        window.location.reload();
      } else {
        throw new Error(res.data.message);
      }
    } catch (err) {
      console.error("Update failed:", err);
      alert("❌ Failed to update prayer.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container py-5">
      {loading ? (
        <p>Loading prayer data...</p>
      ) : (
        <>
          <h2 className="mb-4">Edit Prayer</h2>
          <form onSubmit={handleSubmit}>
            <div className="item mb-3">
              <label>Name:</label>
              <input
                className="input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                disabled={submitting}
              />
            </div>

            <div className="mb-3">
              <label>Details:</label>
              <textarea
                className="textarea"
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                required
                disabled={submitting}
              />
            </div>

            <label>Existing Images:</label>
            <div className="d-flex flex-wrap gap-3 mb-3">
              {existingImages.length > 0 ? (
                existingImages.map((img, i) => (
                  <div key={i} className="position-relative image-box">
                    <img
                      src={img.url}
                      alt=""
                      className="preview-img-small"
                      width={100}
                    />
                    <button
                      type="button"
                      className="btn btn-sm btn-danger position-absolute top-0 end-0"
                      onClick={() => handleRemoveExistingImage(img.public_id)}
                      disabled={submitting}
                    >
                      🗑️
                    </button>
                  </div>
                ))
              ) : (
                <p>No images</p>
              )}
            </div>

            <div className="d-flex flex-wrap gap-3 mt-2">
              {newImages.map((img, i) => (
                <div key={i} className="position-relative image-box">
                  <img
                    src={img.preview}
                    alt="Preview"
                    className="preview-img-small"
                    width={100}
                  />
                  <button
                    type="button"
                    className="btn btn-sm btn-danger position-absolute top-0 end-0"
                    onClick={() => handleRemoveNewImage(i)}
                    disabled={submitting}
                  >
                    🗑️
                  </button>
                </div>
              ))}
            </div>

            <div className="mb-3">
              <label>Upload New Images:</label>
              <input
                className="form-control"
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileChange}
                disabled={submitting}
              />
            </div>

            <button className="addButton" type="submit" disabled={submitting}>
              {submitting ? "Updating Prayer..." : "Update Prayer"}
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default UpdatePrayer;
