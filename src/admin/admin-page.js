import React, { useState, useEffect } from 'react';
import EventBtn from '../pages/events/event_btn'
import EventsAdd from '../pages/events/events_add'
import Adminsingle from './admin-single';
import { axiosInstance } from '../config';
import "./admin.css";
import Lottie from "lottie-react";
import Search from "../pages/events/search.json";

function Adminpage() {

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 8000);
  }, []);

  //Axios Request
  const URL = "/events";
  const fetchHandler = async () => {
    return await axiosInstance.get(URL).then((res) => res.data)
  }

  const [events, setEvents] = useState();
  useEffect(() => {

    fetchHandler().then((data) => setEvents(data.events));

  }, []);

  const [search, setSearch] = useState('');
  console.log(search)

  const [close, setClose] = useState(true);

  return (
    <>
      {isLoading ? (
        <div className="loading">
          <h1 className="l">L</h1>
          <h1 className="o">o</h1>
          <h1 className="a">a</h1>
          <h1 className="d">d</h1>
          <h1 className="i">i</h1>
          <h1 className="n">n</h1>
          <h1 className="g">g</h1>
          <h1 className="d1">.</h1>
          <h1 className="d2">.</h1>
          <h1 className="d3">.</h1>
        </div>
      ) : (
        <div className='container'>

          {/* Admin hamburger */}

            <button className="hamburger_cover btn" type="button" data-bs-toggle="collapse" data-bs-target="#collapseWidthExample" aria-expanded="false" aria-controls="collapseWidthExample">
              <i className="fa-brands fa-ioxhost"></i>
            </button>

          <div className='hamburger_cover_item' Style="min-height: 120px;">
            <div className="collapse collapse-horizontal" id="collapseWidthExample">
              <div className="card card-body" Style="width: 150px;">
                <a href='#events' className='p-2 text-dark'>
                  Event
                </a>
                <a href='#events' className='p-2 text-dark'>
                  News
                </a>
              </div>
            </div>
          </div>


          {/* End Admin hamburger */}

          <h1 className='db_header' data-aos="fade-down">CWOAA Dashboard</h1>

          <div className='row'>

            <div className='row col-12 p-4'>

              <div className='col-12 pt-5' id='events' data-aos="fade-right">
                <h1>Event Data</h1>
              </div>

              <EventBtn setClose={setClose} />
              {!close && <EventsAdd setClose={setClose} />}

              <div className='col-lg-12' data-aos="fade-right">



                <form className="form d-flex mt-4">

                  <Lottie animationData={Search} loop={true} className='mr-2' />
                  <input required="" autocomplete="off" placeholder="Search" id="search" type="text" onChange={(e) => setSearch(e.target.value)} className='event_search' />

                </form>

              </div>

              {events && events
                .filter((event) => {
                  const searchTerm = search.toLowerCase();
                  const eventsDesc = event.event_desc ? event.event_desc.toLowerCase() : '';
                  return searchTerm === '' ? event : eventsDesc.includes(searchTerm);
                })
                .map((event, id) => (
                  <div className='col-lg-3 col-md-4 w-5 event_cover' key={id}>
                    <Adminsingle event={event} />
                  </div>
                ))}
            </div>

            {/* End of Event Data */}

            <div className='row col-12'>
              <div className='col-12'>
                <h1 className='mt-5'>News Data</h1>
              </div>
              <div className='col-lg-12'>

                {/* <EventBtn setClose={setClose} />
            {!close && <EventsAdd setClose={setClose} />} */}

              </div>

              <div className='col-4'>Images</div>
              <div className='col-4'>Titles</div>
              <div className='col-4'>Description</div>

            </div>

          </div>
        </div>
      )}
    </>
  )
}

export default Adminpage