import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config";
import FeatureItems from "./featureItems"
import "./feature.css";

function Feature() {

  //Axios Request
   const URL = "/events";
   const fetchHandler = async () => {
     return await axiosInstance.get(URL).then((res) => res.data);
   };
 
   const [events, setEvents] = useState();

   useEffect(() => {
     fetchHandler().then((data) => setEvents(data.events));
   }, []);

  return (
    <div>
      <div className="container px-4 py-5" id="custom-cards">
        <h2 className="pb-3 border-bottom">Event Gallery</h2>

        <div
          className="row row-cols-1 row-cols-lg-3 align-items-stretch g-4 py-5"
          data-aos="fade-down"
          data-aos-duration="5000"
        >
        {events &&
                      events
                        .map((event, id) => (
                          <div key={id}>
                            <FeatureItems event={event} />
                          </div>
                        ))}
      </div>
    </div>
    </div>
  );
}

export default Feature;
