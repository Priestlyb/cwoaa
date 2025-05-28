import React, { useState, useEffect } from "react";
import PrayerBtn from "../pages/prayer/prayer_btn";
import EventBtn from "../pages/events/event_btn";
import EventsAdd from "../pages/events/events_add";
import EventAdmin from "./EventAdmin";
import PrayerAdmin from "./prayerAdmin";
import AddNews from "../pages/news/addNews";
import AddNewsBtn from "../pages/news/addNewsBtn";
import { axiosInstance } from "../config";
import "./admin.css";
import Lottie from "lottie-react";
import Search from "../pages/events/search.json";
import AddPrayer from "../pages/prayer/addPrayer";
import NewsAdmin from "./newsAdmin";
import BookingAdmin from "./BookingAdmin";

function Adminpage() {
  const [isLoading, setIsLoading] = useState(true);
  const [prayers, setPrayers] = useState([]);
  const [events, setEvents] = useState([]);
  const [news, setNews] = useState([]);
  const [search, setSearch] = useState("");
  const [closeAddEvent, setCloseAddEvent] = useState(true);
  const [closeAddPrayer, setCloseAddPrayer] = useState(true);
  const [closeAddNews, setCloseAddNews] = useState(true);

  const letters = ["C", "W", "O", "A", "A", "🔊"];

  // Set a timeout to simulate loading
  useEffect(() => {
    setTimeout(() => setIsLoading(false), 2000);
  }, []);

  // Fetch events from the server
  const fetchHandler = async () => {
    try {
      const res = await axiosInstance.get("/events");
      setEvents(res.data.events);
    } catch (error) {
      console.error("Failed to fetch events:", error);
    }
  };

  useEffect(() => {
    fetchHandler();
  }, []);

  const handleDelete = (id) => {
    setEvents((prev) => prev.filter((event) => event._id !== id));
  };

  // Fetch Prayers from the server
  useEffect(() => {
    const fetchPrayerHandler = async () => {
      try {
        const res = await axiosInstance.get("/prayers");
        setPrayers(res.data.prayers); // Make sure this matches your backend shape
      } catch (err) {
        console.error("Error fetching prayers:", err);
      }
    };

    fetchPrayerHandler();
  }, []);

  const handlePrayerDelete = (id) => {
    setPrayers((prev) => prev.filter((prayer) => prayer._id !== id));
  };

  // Fetch News from the server
  const fetchNewsHandler = async () => {
    try {
      const res = await axiosInstance.get("/news");
      setNews(res.data.news);
    } catch (error) {
      console.error("Failed to fetch News:", error);
    }
  };

  useEffect(() => {
    fetchNewsHandler();
  }, []);

  const handleNewsDelete = (id) => {
    setNews((prev) => prev.filter((news) => news._id !== id));
  };

  return (
    <>
      {isLoading ? (
        <div className="cwoaa-loader">
          {letters.map((letter, index) => (
            <div
              key={index}
              className="cwoaa-letter"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {letter}
            </div>
          ))}
        </div>
      ) : (
        <div className="container">
          {/* Admin Hamburger */}
          <button
            className="hamburger_cover btn"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseWidthExample"
            aria-expanded="false"
            aria-controls="collapseWidthExample"
          >
            <i className="fa-brands fa-ioxhost"></i>
          </button>

          <div className="hamburger_cover_item" style={{ minHeight: "120px" }}>
            <div
              className="collapse collapse-horizontal"
              id="collapseWidthExample"
            >
              <div className="card card-body" style={{ width: "150px" }}>
                <a href="#events" className="p-2 text-dark">
                  Event
                </a>
                <a href="#prayers" className="p-2 text-dark">
                  Prayers
                </a>
                <a href="#news" className="p-2 text-dark">
                  News
                </a>
                <a href="#BookedMasses" className="p-2 text-dark">
                  Booked Masses
                </a>
              </div>
            </div>
          </div>

          {/* Header */}
          <h1 className="db_header" data-aos="fade-down">
            CWOAA Dashboard
          </h1>

          {/* Event Data */}
          <div className="row col-12 p-4">
            <div className="col-12 pt-5" id="events" data-aos="fade-right">
              <h1>Event Data</h1>
            </div>

            <EventBtn setCloseAddEvent={setCloseAddEvent} />
            {!closeAddEvent && (
              <EventsAdd setCloseAddEvent={setCloseAddEvent} />
            )}

            <div className="col-lg-12" data-aos="fade-right">
              <form className="form d-flex mt-4">
                <Lottie animationData={Search} loop={true} className="mr-2" />
                <input
                  required
                  autoComplete="off"
                  placeholder="Search"
                  id="search"
                  type="text"
                  onChange={(e) => setSearch(e.target.value)}
                  className="event_search"
                />
              </form>
            </div>

            {events.length === 0 ? (
              <div className="col-12 mt-3">
                <p>No events available</p>{" "}
                {/* Display this when there are no events */}
              </div>
            ) : events.filter((event) => {
                const searchTerm = search.toLowerCase();
                const eventTitle = event.event_title?.toLowerCase() || "";
                return eventTitle.includes(searchTerm);
              }).length === 0 ? (
              <div className="col-12">
                <p>No events found for your search</p>{" "}
                {/* Display this when the search returns no results */}
              </div>
            ) : (
              events
                .filter((event) => {
                  const searchTerm = search.toLowerCase();
                  const eventTitle = event.event_title?.toLowerCase() || "";
                  return eventTitle.includes(searchTerm);
                })
                .map((event, id) => (
                  <div className="col-lg-3 col-md-4 w-5 event_cover" key={id}>
                    <EventAdmin event={event} onDelete={handleDelete} />
                  </div>
                ))
            )}
          </div>

          {/* Prayer Data */}
          <div className="row col-12">
            <div className="col-12" id="prayers">
              <h1 className="mt-5">Prayer Data</h1>
            </div>

            <PrayerBtn setCloseAddPrayer={setCloseAddPrayer} />
            {!closeAddPrayer && (
              <AddPrayer setCloseAddPrayer={setCloseAddPrayer} />
            )}

            <div className="col-lg-12" data-aos="fade-right">
              <form className="form d-flex mt-4">
                <Lottie animationData={Search} loop={true} className="mr-2" />
                <input
                  required
                  autoComplete="off"
                  placeholder="Search"
                  id="search"
                  type="text"
                  onChange={(e) => setSearch(e.target.value)}
                  className="event_search"
                />
              </form>
            </div>

            {prayers.length === 0 ? (
              <div className="col-12 mt-3">
                <p>No prayers available</p>{" "}
                {/* Display this when there are no prayers */}
              </div>
            ) : prayers.filter((prayer) => {
                const searchTerm = search.toLowerCase();
                const prayerTitle = prayer.prayer_title?.toLowerCase() || "";
                return prayerTitle.includes(searchTerm);
              }).length === 0 ? (
              <div className="col-12">
                <p>No prayers found for your search</p>{" "}
                {/* Display this when the search returns no results */}
              </div>
            ) : (
              prayers.map((prayer) => (
                <PrayerAdmin
                  key={prayer._id}
                  id={prayer._id}
                  name={prayer.name}
                  details={prayer.details}
                  img={prayer.img}
                  onDelete={handlePrayerDelete}
                />
              ))
            )}
          </div>

          {/* News Data */}
          <div className="row col-12">
            <div className="col-12" id="news">
              <h1 className="mt-5">News Data</h1>
            </div>

            <AddNewsBtn setCloseAddNews={setCloseAddNews} />
            {!closeAddNews && <AddNews setCloseAddNews={setCloseAddNews} />}

            <div className="col-lg-12" data-aos="fade-right">
              <form className="form d-flex mt-4">
                <Lottie animationData={Search} loop={true} className="mr-2" />
                <input
                  required
                  autoComplete="off"
                  placeholder="Search"
                  id="search"
                  type="text"
                  onChange={(e) => setSearch(e.target.value)}
                  className="event_search"
                />
              </form>
            </div>

            {news.length === 0 ? (
              <div className="col-12 mt-3">
                <p>No News Available</p>{" "}
                {/* Display this when there are no prayers */}
              </div>
            ) : news.filter((news) => {
                const searchTerm = search.toLowerCase();
                const newsTitle = news.news_title?.toLowerCase() || "";
                return newsTitle.includes(searchTerm);
              }).length === 0 ? (
              <div className="col-12">
                <p>No news found for your search</p>{" "}
                {/* Display this when the search returns no results */}
              </div>
            ) : (
              news
                .filter((news) => {
                  const searchTerm = search.toLowerCase();
                  const newsTitle = news.prayer_title?.toLowerCase() || "";
                  return newsTitle.includes(searchTerm);
                })
                .map((news, id) => (
                  <div className="col-lg-3 col-md-4 event_cover" key={id}>
                    <NewsAdmin news={news} onDelete={handleNewsDelete} />
                  </div>
                ))
            )}
          </div>

          {/* Booked Masses Section */}
          <div className="row col-12" id="BookedMasses">
            <h1 className="mt-5">Booked Masses</h1>
            {/* This component will handle the display and management of booked masses */}  
          <BookingAdmin />
          </div>
        </div>
      )}
    </>
  );
}

export default Adminpage;
