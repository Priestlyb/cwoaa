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

                    <div className='col-lg-6 mt-5' data-aos="fade-up" data-aos-duration="1000">

                        <input type="text" name="text" class="input w-100" placeholder="Family name"></input>
                    </div>

                    <div className='col-lg-6 mt-5' data-aos="fade-up" data-aos-duration="1000">

                        <input type="text" name="text" class="input w-100" placeholder="Email"></input>
                    </div>

                    <div className='col-lg-6 mt-2' data-aos="fade-up" data-aos-duration="1000">

                        <input type="datetime-local" id="check-out" name="check-out" min="2000-01-01T00:00" max="2500-06-14T00:00" className='input w-100'></input>
                    </div>

                    <div className='col-lg-6 mt-2' data-aos="fade-up" data-aos-duration="1000">

                        <input type="file" name="text" class="input w-100"></input>
                    </div>

                    <div className='col-12' data-aos="fade-up" data-aos-duration="600">
                        <div className="bm_input-container">
                            <textarea className="bm_input" placeholder='Write your intention' name="text" />
                            <div className="topline"></div>
                            <div className="underline"></div>
                        </div>
                    </div>

                    <div className='bm_btn_cover' data-aos="fade-up" data-aos-duration="500">
                        <button className="bm_btn">
                            <span className="bm_btn-text-one">Book now</span>
                            <span className="bm_btn-text-two">Great!</span>
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