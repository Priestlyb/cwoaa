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

          <h1 className='db_header' data-aos="fade-down">CWOAA Dashboard</h1>

          <div className='row'>

            <div className='row col-lg-6 p-4'>
              
              <div className='col-12' data-aos="fade-right">
                <h1>Event Data</h1>
              </div>

              <div className='col-lg-12' data-aos="fade-left">

                <EventBtn setClose={setClose} />
                {!close && <EventsAdd setClose={setClose} />}

              </div>

              <div className='col-lg-12' data-aos="fade-right">

                

      <form class="form d-flex mt-4">

<Lottie animationData={Search} loop={true} className='mr-2' />
<input required="" autocomplete="off" placeholder="Search" id="search" type="text" onChange={(e) => setSearch(e.target.value)}  className='event_search' />

</form>

              </div>

              {events && events
                .filter((event) => {
                  const searchTerm = search.toLowerCase();
                  const eventsDesc = event.event_desc ? event.event_desc.toLowerCase() : '';
                  return searchTerm === '' ? event : eventsDesc.includes(searchTerm);
                })
                .map((event, id) => (
                  <div className='col-12 event_cover' key={id}>
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