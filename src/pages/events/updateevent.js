import React, { useState, useEffect } from "react";
import { axiosInstance } from "../../config";
import { useParams } from "react-router-dom";

const EventsEdit = () => {
  const { id } = useParams();
  const [newHostImages] = useState([]); // For new host images
  const [newSpeakerImages, setNewSpeakerImages] = useState([]); // For new speaker images

  const [inputs, setInputs] = useState({
    event_img: [], // existing Cloudinary images
    event_title: "",
    event_sub_title: "",
    event_desc: "",
    event_phone_number: "",
    event_email: "",
    event_location: "",
    event_date: "",
    event_time: "",
    event_host: [],
    event_speakers: [],
  });
  const [newImages, setNewImages] = useState([]); // local new images (File + preview)
  const [loading, setLoading] = useState(false); // For loading state
  const [error, setError] = useState(null); // For error state

  useEffect(() => {
    const fetchEvent = async () => {
      const { data } = await axiosInstance.get(`/events/${id}`);
      setInputs(data.event);
    };
    fetchEvent();
  }, [id]);

  const handleRemoveHost = (hostIdOrIndex) => {
    setInputs((prev) => {
      const updatedHosts = [...prev.event_host];

      // Check if it's an index (for new, unsaved hosts)
      if (typeof hostIdOrIndex === "number") {
        updatedHosts.splice(hostIdOrIndex, 1);
      } else {
        // It's an existing host ID, call API and filter it
        fetch(`http://localhost:9000/events/${id}/host/${hostIdOrIndex}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data.message);
          })
          .catch((err) => {
            console.error("Error deleting host:", err);
          });

        return {
          ...prev,
          event_host: updatedHosts.filter((host) => host._id !== hostIdOrIndex),
        };
      }

      return { ...prev, event_host: updatedHosts };
    });
  };

  const handleHostDetailChange = (e, index) => {
    const { name, value } = e.target;
    setInputs((prev) => {
      const updatedHosts = [...prev.event_host];
      updatedHosts[index][name] = value;
      return { ...prev, event_host: updatedHosts };
    });
  };

  const handleSpeakerDetailChange = (e, index) => {
    setInputs((prev) => ({
      ...prev,
      event_speakers: prev.event_speakers.map((speaker, i) =>
        i === index ? { ...speaker, [e.target.name]: e.target.value } : speaker
      ),
    }));
  };

  const handleSpeakerImageChange = async (e, index) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "cwoaauploads"); // replace
    formData.append("folder", "cwoaauploads"); // optional folder

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/priestlythedon/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();

      if (data.secure_url && data.public_id) {
        setInputs((prev) => {
          const updatedSpeakers = [...prev.event_speakers];
          updatedSpeakers[index] = {
            ...updatedSpeakers[index],
            img: {
              url: data.secure_url,
              public_id: data.public_id,
            },
          };
          return {
            ...prev,
            event_speakers: updatedSpeakers,
          };
        });
      } else {
        console.error("Upload failed", data);
      }
    } catch (err) {
      console.error("Cloudinary upload error:", err);
    }
  };

  const handleAddSpeakerField = () => {
    setInputs((prev) => ({
      ...prev,
      event_speakers: [
        ...prev.event_speakers,
        { name: "", email: "", img: null },
      ],
    }));
  };

  const handleDeleteSpeakerById = async (speakerId, publicId, index) => {
    // If speaker has no _id, just remove from state
    if (!speakerId) {
      setInputs((prev) => ({
        ...prev,
        event_speakers: prev.event_speakers.filter((_, i) => i !== index),
      }));
      return;
    }

    try {
      const res = await fetch(`http://localhost:9000/speakers/${speakerId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ public_id: publicId }),
      });

      const data = await res.json();

      if (res.ok) {
        setInputs((prev) => ({
          ...prev,
          event_speakers: prev.event_speakers.filter(
            (s) => s._id !== speakerId
          ),
        }));
      } else {
        console.error("Delete failed:", data.message || "Unknown error");
      }
    } catch (err) {
      console.error("Error deleting speaker:", err);
    }
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

  const handleDeleteExistingEventImg = async (publicId) => {
    if (!publicId) return;

    try {
      const response = await fetch("/delete-event-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ eventId: inputs._id, publicId }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Failed to delete");

      // Update local state if server deletion succeeded
      setInputs((prev) => {
        const updatedImages = prev.event_img.filter(
          (img) => img.public_id !== publicId
        );
        return { ...prev, event_img: updatedImages };
      });

      console.log(`🗑️ Successfully deleted image with publicId: ${publicId}`);
    } catch (err) {
      console.error("Error deleting image:", err.message);
    }
  };

  const handleDeleteNewEventImg = (index) => {
    const updated = [...newImages];
    URL.revokeObjectURL(updated[index].preview); // Clean up the preview URL
    updated.splice(index, 1);
    setNewImages(updated);
  };

  const handleHostImageUpload = async (e, index) => {
    const file = e.target.files[0];
    if (!file) return;

    // Show preview immediately
    const previewUrl = URL.createObjectURL(file);
    setInputs((prev) => {
      const updatedHosts = [...prev.event_host];
      updatedHosts[index].img = {
        url: previewUrl,
        public_id: "",
        isPreview: true,
      };
      return { ...prev, event_host: updatedHosts };
    });

    // Upload to Cloudinary
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "cwoaauploads");

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/priestlythedon/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();

      // Update with real Cloudinary image URL and public_id
      setInputs((prev) => {
        const updatedHosts = [...prev.event_host];
        updatedHosts[index].img = {
          url: data.secure_url,
          public_id: data.public_id,
          isPreview: false,
        };
        return { ...prev, event_host: updatedHosts };
      });
    } catch (err) {
      console.error("Image upload failed:", err);
    }
  };

  const handleReplaceHostImage = async (publicId, hostIndex) => {
    if (!publicId) return;
    if (!window.confirm("Are you sure you want to replace this host image?"))
      return;

    // Step 1: Trigger file selection
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";

    fileInput.onchange = async (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const formData = new FormData();
      formData.append("image", file);

      try {
        // Step 2: Delete the old image
        await axiosInstance.post("/delete-host-image", { publicId });
        console.log(`✅ Old image with publicId ${publicId} deleted.`);

        // Step 3: Upload new image
        const { data } = await axiosInstance.post(
          "/upload-host-image",
          formData
        );

        // Step 4: Update the UI
        setInputs((prev) => ({
          ...prev,
          event_host: prev.event_host.map((host, i) =>
            i === hostIndex ? { ...host, img: data } : host
          ),
        }));

        console.log("✅ New image uploaded and UI updated.");
      } catch (err) {
        console.error(
          "Error during image replacement:",
          err.response?.data?.message || err.message
        );
        alert("Failed to replace image. See console.");
      }
    };

    fileInput.click();
  };

  const handleReplaceSpeakerImage = async (publicId, speakerIndex) => {
    if (!publicId) return;
    if (!window.confirm("Are you sure you want to replace this host image?"))
      return;

    try {
      // Step 1: Delete the old image
      await axiosInstance.post("/delete-speaker-image", { publicId });
      console.log(`✅ Old image with publicId ${publicId} deleted.`);

      // Step 2: Trigger file selection
      const fileInput = document.createElement("input");
      fileInput.type = "file";
      fileInput.accept = "image/*";

      fileInput.onchange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("image", file);

        try {
          // Step 3: Upload new image to backend (Cloudinary + DB)
          const { data } = await axiosInstance.post(
            "/upload-speaker-image",
            formData
          );

          // Step 4: Update the UI with the new image
          setInputs((prev) => ({
            ...prev,
            event_speakers: prev.event_speakers.map((host) =>
              host.img?.public_id === publicId ? { ...host, img: data } : host
            ),
          }));

          console.log("✅ New image uploaded and UI updated.");
        } catch (uploadErr) {
          console.error(
            "Error uploading new image:",
            uploadErr.response?.data?.message || uploadErr.message
          );
          alert("Image upload failed. See console.");
        }
      };

      fileInput.click();
    } catch (error) {
      console.error(
        "Error deleting image:",
        error.response?.data?.message || error.message
      );
      alert("Image deletion failed. See console.");
    }
  };

  const handleMakePrimary = (index, isExisting) => {
    if (isExisting) {
      const updated = [...inputs.event_img];
      const [img] = updated.splice(index, 1);
      updated.unshift(img); // Move the selected image to the top
      setInputs((prev) => ({ ...prev, event_img: updated }));
    } else {
      const updated = [...newImages];
      const [img] = updated.splice(index, 1);
      updated.unshift(img); // Move the selected image to the top
      setNewImages(updated);
    }
  };

  function formatDateToInput(dateString) {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  }

  const uploadHostsToCloudinary = async () => {
    const updatedHosts = await Promise.all(
      inputs.event_host.map(async (host) => {
        if (host.img?.file && !host.img.public_id) {
          const formData = new FormData();
          formData.append("image", host.img.file);

          try {
            const { data } = await axiosInstance.post(
              "/upload-host-image",
              formData
            );
            return { ...host, img: data }; // Replace blob with Cloudinary URL and public_id
          } catch (err) {
            console.error("Failed to upload host image:", err.message);
            return host; // fallback: return original
          }
        } else {
          return host; // Already has valid Cloudinary image
        }
      })
    );

    return updatedHosts;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // 🔼 Step 1: Upload host images to Cloudinary (if needed)
      const updatedHosts = await uploadHostsToCloudinary();

      const formData = new FormData();

      // 📝 Basic event data
      formData.append("event_title", inputs.event_title);
      formData.append("event_sub_title", inputs.event_sub_title);
      formData.append("event_desc", inputs.event_desc);
      formData.append("event_phone_number", inputs.event_phone_number);
      formData.append("event_email", inputs.event_email);
      formData.append("event_location", inputs.event_location);
      formData.append("event_date", inputs.event_date);
      formData.append("event_time", inputs.event_time);

      // 🖼️ New image files
      newHostImages.forEach(({ file }) => {
        formData.append("event_host_img", file);
      });

      newSpeakerImages.forEach(({ file }) => {
        formData.append("event_speaker_img", file);
      });

      newImages.forEach(({ file }) => {
        formData.append("event_img", file);
      });

      // 🔁 Existing data with updated hosts (with Cloudinary images)
      formData.append("event_host_existing", JSON.stringify(updatedHosts));
      formData.append(
        "event_speakers_existing",
        JSON.stringify(inputs.event_speakers)
      );
      formData.append("event_img_existing", JSON.stringify(inputs.event_img));

      // 🚀 Submit the form
      await axiosInstance.put(`/events/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // ✅ Reset preview images and reload
      setNewImages([]);
      window.location.reload();
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        err.message ||
        "Something went wrong. Try again.";
      console.error("Update failed:", msg);
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="eventsEdit">
      <h1>Edit Event</h1>

      {loading && <p>Updating...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className="item">
        <label className="label">Event Images</label>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileChange}
        />

        <div className="image-preview-grid">
          {[
            ...inputs.event_img.map((img, index) => ({
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
                inputs.event_img.length === 0 &&
                img.index === 0);

            return (
              <div
                key={i}
                className={`image-box ${isPrimary ? "primary" : ""}`}
              >
                <img src={img.src} alt={`event-${i}`} className="image" />
                {isPrimary && <span className="primary-label">Primary</span>}

                <div className="img-actions bg-white">
                  <button
                    onClick={() => {
                      if (img.type === "existing") {
                        handleDeleteExistingEventImg(img.public_id);
                      } else {
                        handleDeleteNewEventImg(img.index);
                      }
                    }}
                  >
                    Delete
                  </button>

                  <button
                    onClick={() => {
                      handleMakePrimary(img.index, img.type === "existing");
                    }}
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
        <label className="label">Event Title</label>
        <input
          type="text"
          name="event_title"
          value={inputs.event_title}
          onChange={handleInputChange}
          className="input"
        />
      </div>

      <div className="item">
        <label className="label">Event Sub Title</label>
        <input
          type="text"
          name="event_sub_title"
          value={inputs.event_sub_title}
          onChange={handleInputChange}
          className="input"
        />
      </div>

      <label className="label">Event Description</label>
      <textarea
        rows={4}
        name="event_desc"
        value={inputs.event_desc}
        onChange={handleInputChange}
        className="textarea"
      />

      <div className="item">
        <label className="label">Event Contact Number</label>
        <input
          type="text"
          name="event_phone_number"
          value={inputs.event_phone_number}
          onChange={handleInputChange}
          className="input"
        />
      </div>

      <div className="item">
        <label className="label">Event Contact Email</label>
        <input
          type="email"
          name="event_email"
          value={inputs.event_email}
          onChange={handleInputChange}
          className="input"
        />
      </div>

      <div className="item">
        <label className="label">Event Location</label>
        <input
          type="text"
          name="event_location"
          value={inputs.event_location}
          onChange={handleInputChange}
          className="input"
        />
      </div>

      <div className="item">
        <label className="label">Event date</label>
        <input
          type="date"
          name="event_date"
          value={formatDateToInput(inputs.event_date)}
          onChange={handleInputChange}
          className="input"
        />
      </div>

      <div className="item">
        <label className="label">Event time</label>
        <input
          type="text"
          name="event_time"
          value={inputs.event_time}
          onChange={handleInputChange}
          className="input"
        />
      </div>

      <div className="item">
        <hr />
        <label className="label">
          <h3>Event Hosts</h3>
        </label>
        {inputs.event_host.map((host, index) => (
          <div key={index} className="item">
            <label className="label">Name</label>
            <input
              type="text"
              name="name"
              value={host.name || ""}
              onChange={(e) => handleHostDetailChange(e, index)}
              className="input"
            />

            <label className="label">Image</label>

            {/* Show image preview if available */}
            {host.img?.url ? (
              <div className="image-box">
                <img
                  src={host.img.url}
                  alt={`host-${index}`}
                  className="image"
                />
                <button
                  className="img-actions border-0 p-2 text-red-500 hover:text-red-700"
                  onClick={() =>
                    handleReplaceHostImage(host.img.public_id, index)
                  }
                  title="Delete Host Image"
                >
                  🗑️
                </button>
              </div>
            ) : (
              // File input for uploading new host image
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleHostImageUpload(e, index)}
                className="input"
              />
            )}
            <button
              type="button"
              onClick={() => handleRemoveHost(host._id ? host._id : index)}
              className=" border-none text-dark px-3 py-1 rounded hover:bg-red-600"
            >
              ➖ Remove Host
            </button>
          </div>
        ))}

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() =>
              setInputs((prev) => ({
                ...prev,
                event_host: [...prev.event_host, { name: "", img: {} }],
              }))
            }
            className="btn"
          >
            ➕ Add Host
          </button>
        </div>
      </div>

      <div className="item">
        <hr />
        <label className="label">
          <h3>Event Speakers</h3>
        </label>
        {inputs.event_speakers.map((speaker, index) => (
          <div key={`speaker-${index}`} className="item mb-4">
            <label className="label">
              Name<span className="text-danger">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={speaker.name || ""}
              onChange={(e) => handleSpeakerDetailChange(e, index)}
              className="input mb-2"
            />

            <label className="label">Email</label>
            <input
              type="text"
              name="email"
              value={speaker.email || ""}
              onChange={(e) => handleSpeakerDetailChange(e, index)}
              className="input mb-2"
            />

            <label className="label">Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleSpeakerImageChange(e, index)}
              className="mb-3"
            />

            {/* Image Preview */}
            {speaker.img?.url && (
              <div className="image-box">
                <img
                  src={speaker.img.url}
                  alt={`speaker-${index}`}
                  className="preview-img-small"
                />
                <button
                  className="img-actions border-0 p-2"
                  onClick={() =>
                    handleReplaceSpeakerImage(speaker.img?.public_id)
                  }
                >
                  🗑️
                </button>
              </div>
            )}

            <button
              type="button"
              className="bg-danger border-none text-white px-3 py-1 rounded hover:bg-red-600"
              onClick={() =>
                handleDeleteSpeakerById(
                  speaker._id,
                  speaker.img?.public_id,
                  index
                )
              }
            >
              Delete Speaker
            </button>
          </div>
        ))}

        <div className="flex gap-2 mb-4">
          <button
            type="button"
            className="border-none text-dark px-3 py-1 rounded"
            onClick={handleAddSpeakerField}
          >
            ➕ Add Speaker
          </button>
        </div>
      </div>

      <button
        className="eventsEdit_btn"
        onClick={handleSubmit}
        disabled={loading} // Disable button while submitting
      >
        {loading ? "Updating..." : "Update"}
      </button>
    </div>
  );
};

export default EventsEdit;
