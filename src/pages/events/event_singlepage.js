import React, { useEffect, useState } from "react";
import "./event_singlepage.css";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../../config";

const EventSinglePage = () => {
  const id = useParams().id;
  const [event, setEvent] = useState(null);
  useEffect(() => {
    axiosInstance.get(`/events/${id}`).then((res) => {
      setEvent(res.data.event); // Make sure to access `.event`
    });
  }, [id]);

  return (
    <>
      {event && (
        <div className="container mb-3">
          <div className="row featurette">
            <div className="col-md-7  mb-3">
              <h2 className="featurette-heading">
                <h6 className="bg-dark text-light p-3 rounded">HOST:</h6>
                <div className="d-flex border-none flex-column gap-2 my-2">
                  <div className="row border-none">
                    {event.event_host?.map((host, index) => (
                      <div
                        key={index}
                        className="col-6 border-none col-sm-4 col-md-3 col-lg-2 mb-4 d-flex justify-content-center"
                      >
                        <div
                          className="card border-none text-center"
                          style={{ width: "8rem" }}
                        >
                          <img
                            src={host.img?.url || "/no-image.jpg"}
                            alt={host.name || `Host ${index + 1}`}
                            className="card-img-top rounded-circle mt-3"
                            style={{
                              width: "80px",
                              height: "80px",
                              objectFit: "cover",
                              margin: "0 auto",
                            }}
                          />
                          <div className="card-body p-2">
                            <h6 className="card-title mb-0">{host.name}</h6>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <hr />
                {event.event_title}, <br />{" "}
                <span className="text-muted"> {event.event_sub_title}.</span>
              </h2>{" "}
              <hr />
              <h3>Speakers:</h3>
              <div className="row">
                {event.event_speakers?.map((speaker, index) => (
                  <div
                    key={index}
                    className="col-12 col-sm-6 col-md-6 col-lg-6 mb-3"
                  >
                    <div
                      className="d-flex align-items-center gap-3 p-3 border rounded shadow-sm"
                      style={{ minHeight: "70px" }}
                    >
                      <img
                        src={speaker.img?.url || "/no-image.jpg"}
                        alt={speaker.name || `Speaker ${index + 1}`}
                        width="50"
                        height="50"
                        className="rounded-circle"
                        style={{ objectFit: "cover", flexShrink: 0 }}
                      />
                      <div style={{ overflowWrap: "break-word" }}>
                        <p className="mb-1 fw-semibold">{speaker.name}</p>
                        <p
                          className="mb-0 text-muted"
                          style={{ fontSize: "0.875rem" }}
                        >
                          {speaker.email}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <hr />
              <p className="lead">{event.event_desc}</p>
              <h4>Contacts details</h4>
              <hr />
              <div className="d-flex flex-column mb-2 justify-items-center ">
                <p className="text-dark text-sm">
                  <span className="fw-bold">Contact Number:</span>{" "}
                  {event.event_phone_number}
                </p>
                <p className="text-dark text-sm">
                  <span className="fw-bold">Contact email:</span>{" "}
                  {event.event_email}
                </p>
                <p className="text-dark text-sm">
                  <span className="fw-bold">Event location:</span>{" "}
                  {event.event_location}
                </p>
                <p className="text-dark text-sm">
                  <span className="fw-bold">Event time:</span>{" "}
                  {event.event_time}
                </p>
                <p className="text-dark text-sm">
                  <span className="fw-bold">Event date:</span>{" "}
                  {new Date(event.event_date).toLocaleDateString("en-GB")}
                </p>
              </div>
              <small className="text-muted">
                Created at: {new Date(event.createdAt).toDateString()}, Updated
                at: {new Date(event.updatedAt).toDateString()}
              </small>
            </div>

            <div className="col-md-5 d-none d-sm-block">
              <img
                src={event.event_img?.[0]?.url || "/no-image.jpg"}
                alt=""
                width="100%"
                className="featurette-image"
              />
            </div>

            <h2 className="featurette-heading fw-normal lh-1">Gallery</h2>

            {Array.isArray(event.event_img) && event.event_img.length > 0 && (
              <div className="col-12">
                <div className="card_esp mt-5 scroll-container">
                  {event.event_img.map((imgObj, index) => (
                    <p className="card_esp_overlay" key={index}>
                      <span className="card_esp_span">
                        <img
                          src={imgObj.url}
                          alt={`Event ${index + 1}`}
                          width="100%"
                          height="100%"
                        />
                      </span>
                    </p>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default EventSinglePage;
