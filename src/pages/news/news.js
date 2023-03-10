import React from 'react'
import "./news.css"

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
                            <p>{"Cross section of bishops and participant of the International Youth Conference, held in Enugu from 29th_30th, 2019. Theme: Responding to the challenges of Youth, Family and the Society : The Millennial Response. Organised by Foundation For African Cultural Heritage (FACH ) in collaboration with Catholic Women Organisation Nigeria (CWON)".slice(0, 150)}...... <a>Read more</a></p>
                        </div>
                        <div className='col-lg-7'>
                            <img src='https://scontent.fabv2-1.fna.fbcdn.net/v/t1.6435-9/51142186_2133150436752631_4470454999675043840_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=8bfeb9&_nc_eui2=AeEF5sDKzVZjMMs2Xg6mKt-TL46SG8oSIuwvjpIbyhIi7I0FVg4nGQhF1ABtambtsRZ2MF-W5moBuv1ZE0L6T3QS&_nc_ohc=CUySoDS7tKAAX-cQzAz&_nc_ht=scontent.fabv2-1.fna&oh=00_AfAppT0g518mFmyLb7irPCD2ywm6DoF-Gvd6Vw6EuxC8Bg&oe=64209961' alt='' width="100%" />
                        </div>

                        <div className='col-lg-5 mt-5'>
                            <h2>Cross section of bishops and participant of the International Youth Conference</h2>
                            <p>{"Cross section of bishops and participant of the International Youth Conference, held in Enugu from 29th_30th, 2019. Theme: Responding to the challenges of Youth, Family and the Society : The Millennial Response. Organised by Foundation For African Cultural Heritage (FACH ) in collaboration with Catholic Women Organisation Nigeria (CWON)".slice(0, 150)}...... <a>Read more</a></p>
                        </div>
                        <div className='col-lg-7'>
                            <img src='https://scontent.fabv2-1.fna.fbcdn.net/v/t1.6435-9/51142186_2133150436752631_4470454999675043840_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=8bfeb9&_nc_eui2=AeEF5sDKzVZjMMs2Xg6mKt-TL46SG8oSIuwvjpIbyhIi7I0FVg4nGQhF1ABtambtsRZ2MF-W5moBuv1ZE0L6T3QS&_nc_ohc=CUySoDS7tKAAX-cQzAz&_nc_ht=scontent.fabv2-1.fna&oh=00_AfAppT0g518mFmyLb7irPCD2ywm6DoF-Gvd6Vw6EuxC8Bg&oe=64209961' alt='' width="100%" />
                        </div>

                    </div>



                </div>

                <div class="col-md-4">
                    <div class="position-sticky" Style="top: 2rem;">

                        <form class="form">
                            <label for="search">
                                <input required="" autocomplete="off" placeholder="search" id="search" type="text" />
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