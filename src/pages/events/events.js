import React, { useState, useEffect } from 'react'
import "./events.css"
import Event from './event';
import { axiosInstance } from '../../config';

function Events() {
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

  return (
    <div id='events' className='container'>

      <h1> Events</h1>

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

      <div class="album py-5">

      {isLoading ? (
          <div class="loader"></div>
        ) : (

        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
          {events && events
            .filter((event) => {
              const searchTerm = search.toLowerCase();
              const eventsDesc = event.event_desc ? event.event_desc.toLowerCase() : '';
              return searchTerm === '' ? event : eventsDesc.includes(searchTerm);
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
  )
}

export default Events