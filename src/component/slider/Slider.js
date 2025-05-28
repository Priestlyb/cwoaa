import { useState, useEffect } from "react";
import axios from "axios";
import "./Slider.scss";

const Slider = () => {
  const [events, setEvents] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  const slideLength = events.length;
  const autoScroll = true;
  let slideInterval;
  let intervalTime = 5000;

  const nextSlide = () => {
    setCurrentSlide(currentSlide === slideLength - 1 ? 0 : currentSlide + 1);
  };

  const auto = () => {
    slideInterval = setInterval(nextSlide, intervalTime);
  };

  useEffect(() => {
    setCurrentSlide(0);
  }, []);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get("/events");
        setEvents(res.data.events || []);
      } catch (err) {
        console.error("Failed to fetch events", err);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    if (autoScroll && slideLength > 0) {
      auto();
    }
    return () => clearInterval(slideInterval);
  }, [currentSlide, slideLength]);

  return (
    <div className="slider">
      {events.map((event, index) => {
        const firstImage = event.event_img?.[1]; // Get first image if exists
        return (
          <div
            className={index === currentSlide ? "slide current" : "slide"}
            key={event._id || index}
          >
            {index === currentSlide && (
              <div>
                {firstImage && (
                  <img src={firstImage.url} alt="event" className="image" />
                )}
                <div className="content">
                  <h2>{event.event_title}</h2>
                  <p>{event.event_desc.slice(0, 150)}...</p>
                  <p><strong>Location:</strong> {event.event_location}</p>
                  <p><strong>Date:</strong> {new Date(event.event_date).toLocaleDateString()}</p>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Slider;
