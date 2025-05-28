import React from "react";
import "./prayer.css";

const Prayer = ({ prayer }) => {
  const { img, name, details } = prayer;

  return (
    <div className="container mt-3">
      <div className="row featurette">
        <div className="col-md-5 mb-5" data-aos="fade-down" data-aos-duration="700">
          <img
            src={img?.[0]?.url || "/no-image.jpg"}
            alt={name || "Prayer image"}
            className="bd-img-img-lg featurette-image img-fluid rounded"
          />
        </div>

        <div className="col-md-7" data-aos="fade-up" data-aos-duration="900">
          <h2 className="featurette-heading fw-normal lh-1">{name}</h2>
          <p className="lead">{details}</p>
        </div>
      </div>

      <hr className="featurette-divider" />
    </div>
  );
};

export default Prayer;
