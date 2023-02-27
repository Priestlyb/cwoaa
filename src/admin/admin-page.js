import React, { useState, useEffect } from 'react';
import EventBtn from '../pages/events/event_btn'
import EventsAdd from '../pages/events/events_add'
import Adminsingle from './admin-single';
import { axiosInstance } from '../config';

function Adminpage() {

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
    <div className='container'>

      <h1 className='db_header'>CWOAA Dashboard</h1>

      <div className='row'>

        <div className='row col-lg-6'>
          <div className='col-12'>
            <h1>Event Data</h1>
          </div>

          <div className='col-lg-12'>

            <form class="form">
                            <label for="search">
                                <input required="" autocomplete="off" placeholder="search" id="search" type="text" onChange={(e) => setSearch(e.target.value)} />
                                <div class="icon">
                                    <svg stroke-width="2" stroke="currentColor" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="swap-on">
                                        <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" stroke-linejoin="round" stroke-linecap="round"></path>
                                    </svg>
                                    <svg stroke-width="2" stroke="currentColor" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="swap-off">
                                        <path d="M10 19l-7-7m0 0l7-7m-7 7h18" stroke-linejoin="round" stroke-linecap="round"></path>
                                    </svg>
                                </div>
                                <button type="reset" class="close-btn">
                                    <svg viewBox="0 0 20 20" class="h-5 w-5" xmlns="http://www.w3.org/2000/svg">
                                        <path clip-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" fill-rule="evenodd"></path>
                                    </svg>
                                </button>
                            </label>
                        </form>

          </div>

          <div className='col-lg-12'>

            <EventBtn setClose={setClose} />
            {!close && <EventsAdd setClose={setClose} />}

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
  )
}

export default Adminpage