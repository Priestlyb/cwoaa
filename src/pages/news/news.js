import React from 'react'
import "./news.css"
import Lottie from "lottie-react";
import Search from "./search.json";

function News() {
    return (
        <div className='container'>
            <h1>Lastest News</h1>
            <div className='row mt-3'>
                <div className='col-lg-3 mt-4'>

                    <div className="card text-white" Style="width: 100%; background-color: #07176C;">
                        <img src="https://www.wucwo.org/images/images/The_Nat_President_of_CWON_Barr_Mrs_Nwanneka_Okolo_with_the_Depty_Govr_of_Enugu_State_Cecilia_Ezeilo_after_receiving_the_parliative.jpg" className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">Card title</h5>
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        </div>
                        <div className="card-body">
                            <p className="update_date card-text"><small>Last updated 3 mins ago</small></p>
                        </div>
                    </div>

                </div>

                <div className='container col-lg-5 mt-4'>

                    <div className="card" Style="width: 100%;">
                        <img src="https://www.wucwo.org/images/images/The_Nat_President_of_CWON_Barr_Mrs_Nwanneka_Okolo_with_the_Depty_Govr_of_Enugu_State_Cecilia_Ezeilo_after_receiving_the_parliative.jpg" className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">Card title</h5>
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        </div>
                        <div className="card-body">
                            <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                        </div>
                    </div>
                </div>

                <div className='col-lg-3 mt-4'>

                    <div className="card text-white" Style="width: 100%; background-color: #07176C;">
                        <img src="https://www.wucwo.org/images/images/The_Nat_President_of_CWON_Barr_Mrs_Nwanneka_Okolo_with_the_Depty_Govr_of_Enugu_State_Cecilia_Ezeilo_after_receiving_the_parliative.jpg" className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">Card title</h5>
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        </div>
                        <div className="card-body">
                            <p className="card-text"><small>Last updated 3 mins ago</small></p>
                        </div>
                    </div>
                </div>
            </div>


            <div className="news_row row g-5">

                <div className="col-md-8">
                    <h3 className="pb-4 mb-4 fst-italic border-bottom">
                        More news
                    </h3>

                    <div className='row'>
                        <div className='col-2'>
                            <h6>Full Story</h6>
                        </div>
                        <div className='col-8'>
                            <hr />
                        </div>
                        <div className='col-2'>See All</div>

                        <div className='col-lg-5 mt-5'>
                            <h2>Cross section of bishops and participant of the International Youth Conference</h2>
                            <p>{"Cross section of bishops and participant of the International Youth Conference, held in Enugu from 29th_30th, 2019. Theme: Responding to the challenges of Youth, Family and the Society : The Millennial Response. Organised by Foundation For African Cultural Heritage (FACH ) in collaboration with Catholic Women Organisation Nigeria (CWON)".slice(0, 150)}...... <a href='/'>Read more</a></p>
                        </div>
                        <div className='col-lg-7'>
                            <img src='https://www.wucwo.org/images/images/The_Nat_President_of_CWON_Barr_Mrs_Nwanneka_Okolo_with_the_Depty_Govr_of_Enugu_State_Cecilia_Ezeilo_after_receiving_the_parliative.jpg' alt='' width="100%" />
                        </div>

                        <div className='col-lg-5 mt-5'>
                            <h2>Cross section of bishops and participant of the International Youth Conference</h2>
                            <p>{"Cross section of bishops and participant of the International Youth Conference, held in Enugu from 29th_30th, 2019. Theme: Responding to the challenges of Youth, Family and the Society : The Millennial Response. Organised by Foundation For African Cultural Heritage (FACH ) in collaboration with Catholic Women Organisation Nigeria (CWON)".slice(0, 150)}...... <a href='/'>Read more</a></p>
                        </div>
                        <div className='col-lg-7'>
                            <img src='https://www.wucwo.org/images/images/The_Nat_President_of_CWON_Barr_Mrs_Nwanneka_Okolo_with_the_Depty_Govr_of_Enugu_State_Cecilia_Ezeilo_after_receiving_the_parliative.jpg' alt='' width="100%" />
                        </div>

                    </div>



                </div>

                <div class="col-md-4">
                    <div class="position-sticky news_search">

                        <form class="form d-flex mt-4 mb-4">

                            <Lottie animationData={Search} loop={true} className='mr-2' />
                            <input required="" autocomplete="off" placeholder="Search" id="search" type="text" className='event_search' />

                        </form>

                        <div class="p-4 mb-3 bg-light rounded">
                            <h4 class="fst-italic">About</h4>
                            <p class="mb-0">Customize this section to tell your visitors a little bit about your publication, writers, content, or something else entirely. Totally up to you.</p>
                        </div>

                    </div>
                </div>


            </div>
        </div>
    )
}

export default News