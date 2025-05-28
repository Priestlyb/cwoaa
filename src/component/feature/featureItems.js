import React from "react";
import "./feature.css";

const FeatureItems = (props) => {
  const { _id, event_img, event_title, event_location, createdAt } = props.event;

  const imgUrl = event_img?.[0]?.url || "/default-event.jpg";
const backgroundStyle = {
  backgroundImage: `linear-gradient(180deg, rgba(255, 255, 255, 0.54), rgba(0, 0, 150, 0.69)), url('${imgUrl}')`,
};


  return (
    <div>
          <div className="col pb-4 margin-bottom">
            <a className="eventHerf" href={`/eventsinglepage/${_id}`}>
              <div
                className="card card-cover h-100 overflow-hidden text-bg-dark rounded-4 shadow-lg"
                style={backgroundStyle}
              >
                <div className="d-flex flex-column h-100 p-5 pb-3 text-white text-shadow-1">
                  <h3 className="pt-5 mt-5 mb-4 display-6 lh-5 fw-bold fs-5">
                    {event_title}
                  </h3>
                  <div className="row">
                    <div className="col-6">Location: {event_location}</div>
                    <div className="col-6">
                      {new Date(createdAt).toDateString()}
                    </div>
                  </div>
                </div>
              </div>
            </a>
          </div>
        </div>
  );
};

export default FeatureItems;
