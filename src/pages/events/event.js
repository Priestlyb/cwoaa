import React from "react";

const Event = (props) => {
  const { _id, event_img, event_title, createdAt } = props.event;

  return (
    <div>
      <a className="eventHerf" href={`/eventsinglepage/${_id}`}>
        <div className="col mt-3" data-aos="fade-in" data-aos-duration="900">
          <div className="card shadow-lg">
            <img
              src={event_img?.[0]?.url || "/no-image.jpg"}
              alt=""
              width="100%"
              height="225"
              className="card-img-top event_img"
            />
            <div className="card-body">
              <h4 className="card-text">{event_title}</h4>
              <div className="d-flex justify-content-between align-items-center">
                <div className="btn-group"></div>
                <small className="text-muted">
                  {new Date(createdAt).toDateString()}
                </small>
              </div>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
};

export default Event;
