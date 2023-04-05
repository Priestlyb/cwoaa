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

                    <div class="card text-white bg-dark" Style="width: 100%;">
                        <img src="https://scontent.fabv2-1.fna.fbcdn.net/v/t1.6435-9/31606566_1758498750884470_281320336413163520_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=8bfeb9&_nc_eui2=AeE_rbZH8XnEOPI9t5FS--hbyO4T22DcArXI7hPbYNwCtdscEcUleDNMgEheDbVDiquF6yygDqho7NT59RU5d1KJ&_nc_ohc=P7L1l32jfGIAX-EQAj6&_nc_ht=scontent.fabv2-1.fna&oh=00_AfAhqQVmyMbLImPIM91MB1NH6tHMWUkdsXGkvBPmywK_Jw&oe=642066CA" class="card-img-top" alt="..." />
                        <div class="card-body">
                            <h5 class="card-title">Card title</h5>
                            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        </div>
                        <div class="card-body">
                            <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                        </div>
                    </div>

                </div>

                <div className='container col-lg-5 mt-4'>

                    <div class="card" Style="width: 100%;">
                        <img src="https://scontent.fabv2-1.fna.fbcdn.net/v/t1.6435-9/31606566_1758498750884470_281320336413163520_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=8bfeb9&_nc_eui2=AeE_rbZH8XnEOPI9t5FS--hbyO4T22DcArXI7hPbYNwCtdscEcUleDNMgEheDbVDiquF6yygDqho7NT59RU5d1KJ&_nc_ohc=P7L1l32jfGIAX-EQAj6&_nc_ht=scontent.fabv2-1.fna&oh=00_AfAhqQVmyMbLImPIM91MB1NH6tHMWUkdsXGkvBPmywK_Jw&oe=642066CA" class="card-img-top" alt="..." />
                        <div class="card-body">
                            <h5 class="card-title">Card title</h5>
                            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        </div>
                        <div class="card-body">
                            <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                        </div>
                    </div>
                </div>

                <div className='col-lg-3 mt-4'>

                    <div class="card text-white bg-dark" Style="width: 100%;">
                        <img src="https://scontent.fabv2-1.fna.fbcdn.net/v/t1.6435-9/31606566_1758498750884470_281320336413163520_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=8bfeb9&_nc_eui2=AeE_rbZH8XnEOPI9t5FS--hbyO4T22DcArXI7hPbYNwCtdscEcUleDNMgEheDbVDiquF6yygDqho7NT59RU5d1KJ&_nc_ohc=P7L1l32jfGIAX-EQAj6&_nc_ht=scontent.fabv2-1.fna&oh=00_AfAhqQVmyMbLImPIM91MB1NH6tHMWUkdsXGkvBPmywK_Jw&oe=642066CA" class="card-img-top" alt="..." />
                        <div class="card-body">
                            <h5 class="card-title">Card title</h5>
                            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        </div>
                        <div class="card-body">
                            <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                        </div>
                    </div>
                </div>
            </div>


            <div class="row g-5 mt-5">

                <div class="col-md-8">
                    <h3 class="pb-4 mb-4 fst-italic border-bottom">
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
                            <img src='https://scontent.fabv2-1.fna.fbcdn.net/v/t1.6435-9/51142186_2133150436752631_4470454999675043840_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=8bfeb9&_nc_eui2=AeEF5sDKzVZjMMs2Xg6mKt-TL46SG8oSIuwvjpIbyhIi7I0FVg4nGQhF1ABtambtsRZ2MF-W5moBuv1ZE0L6T3QS&_nc_ohc=CUySoDS7tKAAX-cQzAz&_nc_ht=scontent.fabv2-1.fna&oh=00_AfAppT0g518mFmyLb7irPCD2ywm6DoF-Gvd6Vw6EuxC8Bg&oe=64209961' alt='' width="100%" />
                        </div>

                        <div className='col-lg-5 mt-5'>
                            <h2>Cross section of bishops and participant of the International Youth Conference</h2>
                            <p>{"Cross section of bishops and participant of the International Youth Conference, held in Enugu from 29th_30th, 2019. Theme: Responding to the challenges of Youth, Family and the Society : The Millennial Response. Organised by Foundation For African Cultural Heritage (FACH ) in collaboration with Catholic Women Organisation Nigeria (CWON)".slice(0, 150)}...... <a href='/'>Read more</a></p>
                        </div>
                        <div className='col-lg-7'>
                            <img src='https://scontent.fabv2-1.fna.fbcdn.net/v/t1.6435-9/51142186_2133150436752631_4470454999675043840_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=8bfeb9&_nc_eui2=AeEF5sDKzVZjMMs2Xg6mKt-TL46SG8oSIuwvjpIbyhIi7I0FVg4nGQhF1ABtambtsRZ2MF-W5moBuv1ZE0L6T3QS&_nc_ohc=CUySoDS7tKAAX-cQzAz&_nc_ht=scontent.fabv2-1.fna&oh=00_AfAppT0g518mFmyLb7irPCD2ywm6DoF-Gvd6Vw6EuxC8Bg&oe=64209961' alt='' width="100%" />
                        </div>

                    </div>



                </div>

                <div class="col-md-4">
                    <div class="position-sticky" Style="top: 2rem;">

<form class="form d-flex mt-4 mb-4">

  <Lottie animationData={Search} loop={true} className='mr-2' />
  <input required="" autocomplete="off" placeholder="Search" id="search" type="text"  className='event_search' />

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