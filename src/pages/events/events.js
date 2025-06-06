import React, { useState, useEffect } from "react";
import "./events.css";
import Event from "./event";
import { axiosInstance } from "../../config";
import Lottie from "lottie-react";
import Search from "./search.json";

function Events() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 3000);
  }, []);

  //Axios Request
  const URL = "/events";
  const fetchHandler = async () => {
    return await axiosInstance.get(URL).then((res) => res.data);
  };

  const [events, setEvents] = useState();
  useEffect(() => {
    fetchHandler().then((data) => setEvents(data.events));
  }, []);

  const [search, setSearch] = useState("");
  console.log(search);

  return (
    <div id="events" className="container">
      <h1> Events</h1>

      <form className="form d-flex mt-4">
        <Lottie animationData={Search} loop={true} className="mr-2" />
        <input
          required=""
          autoComplete="off"
          placeholder="Search"
          id="search"
          type="text"
          onChange={(e) => setSearch(e.target.value)}
          className="event_search"
        />
      </form>

      <div className="album py-5">
        {isLoading ? (
          <div className="loader"></div>
        ) : (
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
            {events &&
              events
                .filter((event) => {
                  const searchTerm = search.toLowerCase();
                  const eventTitle = event.event_title
                    ? event.event_title.toLowerCase()
                    : "";
                  return searchTerm === ""
                    ? event
                    : eventTitle.includes(searchTerm);
                })
                .map((event, id) => (
                  <div key={id}>
                    <Event event={event} />
                  </div>
                ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Events;
