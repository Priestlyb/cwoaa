import React, { useState, useEffect } from 'react';
import EventBtn from '../pages/events/event_btn'
import EventsAdd from '../pages/events/events_add'
import Adminsingle from './admin-single';
import { axiosInstance } from '../config';
import "./admin.css"

function Adminpage() {

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 3000);
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
        <div class="loading">
          <span class="l">L</span>
          <span class="o">o</span>
          <span class="a">a</span>
          <span class="d">d</span>
          <span class="i">i</span>
          <span class="n">n</span>
          <span class="g">g</span>
          <span class="d1">.</span>
          <span class="d2">.</span>
        </div>
      ) : (
        <div className='container'>

          <h1 className='db_header'>CWOAA Dashboard</h1>

          <div className='row'>

            <div className='row col-lg-6'>
              <div className='col-12'>
                <h1>Event Data</h1>
              </div>

              <div className='col-lg-12'>

                <EventBtn setClose={setClose} />
                {!close && <EventsAdd setClose={setClose} />}

              </div>

              <div className='col-lg-12'>

                <form class="form">
                  <label for="search">
                    <input required="" autocomplete="off" placeholder="Search" id="search" type="text" onChange={(e) => setSearch(e.target.value)} />
                    <div class="icon">
                      <svg stroke-width="2" stroke="currentColor" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="swap-on">
                        <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" stroke-linejoin="round" stroke-linecap="round"></path>
                      </svg>
                      <svg stroke-width="2" stroke="currentColor" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="swap-off">
                        <path d="M10 19l-7-7m0 0l7-7m-7 7h18" stroke-linejoin="round" stroke-linecap="round"></path>
                      </svg>
                    </div>
                  </label>
                </form>

              </div>

              <div className='col-4'>Images</div>
              <div className='col-4'>Titles</div>
              <div className='col-4'>Description</div>

              {events && events
                .filter((event) => {
                  const searchTerm = search.toLowerCase();
                  const eventsDesc = event.event_desc ? event.event_desc.toLowerCase() : '';
                  return searchTerm === '' ? event : eventsDesc.includes(searchTerm);
                })
                .map((event, id) => (
                  <div className='row col-lg-13' key={id}>
                    <Adminsingle event={event} />
                  </div>
                ))}
            </div>

            {/* End of Event Data */}

            <div className='row col-lg-6'>
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