import React from 'react'
import "./book_mass.css"
import Lottie from "lottie-react";
import groovyWalkAnimation from "./form.json";


function Bookmass() {

    return (
        <div className='container mb-5 mt-5'>

            <div className='row bm_row'>
                <div className=' row col-lg-6'>

                    <h1>Book Mass</h1>

                    <p>Please make your payment to the below account and upload your Receipt, thank you for compliance.</p>

                    <strong>Bank: <span>Wema Bank</span></strong>
                    <strong>Account: <span>0434908920</span></strong>

                    <div className='col-lg-6' data-aos="fade-up" data-aos-duration="1000">
                        <div class="bm_input-container">
                            <input class="bm_input" name="text" type="text" />
                            <label class="label" for="input">Family Name</label>
                            <div class="topline"></div>
                            <div class="underline"></div>
                        </div>
                    </div>

                    <div className='col-lg-6' data-aos="fade-up" data-aos-duration="900">
                        <div class="bm_input-container">
                            <input class="bm_input" name="text" type="text" />
                            <label class="label" for="input">Email address</label>
                            <div class="topline"></div>
                            <div class="underline"></div>
                        </div>
                    </div>

                    <div className='col-lg-6' data-aos="fade-up" data-aos-duration="800">
                        <div class="bm_input-container">
                            <input class="bm_input" name="text" type="datetime-local" min="2000-01-01T00:00" max="2500-06-14T00:00" />
                            <label class="label" for="input">Date</label>
                            <div class="topline"></div>
                            <div class="underline"></div>
                        </div>
                    </div>

                    <div className='col-lg-6' data-aos="fade-up" data-aos-duration="700">
                        <div class="bm_input-container">
                            <input class="bm_input" placeholder='Receipt' name="text" type="file" />
                            <label class="label" for="input">Receipt</label>
                            <div class="topline"></div>
                            <div class="underline"></div>
                        </div>
                    </div>

                    <div className='col-12' data-aos="fade-up" data-aos-duration="600">
                        <div class="bm_input-container">
                            <textarea class="bm_input" placeholder='Write your intention' name="text" />
                            <div class="topline"></div>
                            <div class="underline"></div>
                        </div>
                    </div>

                    <div className='bm_btn_cover' data-aos="fade-up" data-aos-duration="500">
                        <button class="bm_btn">
                            <span class="bm_btn-text-one">Book now</span>
                            <span class="bm_btn-text-two">Great!</span>
                        </button>
                    </div>

                </div>

                <div className='col-lg-6 bm_col_right' data-aos="zoom-in" data-aos-duration="900">
                    <Lottie animationData={groovyWalkAnimation} loop={true} />
                </div>
                
            </div>
        </div>
    )
}

export default Bookmass