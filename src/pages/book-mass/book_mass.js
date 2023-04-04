import React from 'react'
import "./book_mass.css"
import Lottie from "lottie-react";
import groovyWalkAnimation from "./form.json";


function Bookmass() {

    return (
        <div className='container mb-5 mt-5'>

            <div className='row bm_row'>
                <div className=' row col-lg-6'>

                    <h1 className='fw-bold'>Book Mass</h1>

                    <p>Please make your payment to the below account and upload your Receipt, thank you for compliance.</p>

                    <strong>Bank: <span>Wema Bank</span></strong>
                    <strong>Account: <span>0434908920</span></strong>


                    <div className='col-lg-6 mt-3'>

                        <div class="subscribe">
                            <input placeholder="Family name" class="subscribe-input" name="Family name" type="text" data-aos="fade-up" data-aos-duration="600" data-aos-delay="2" />
                            <input placeholder="Your e-mail" class="subscribe-input" name="email" type="email" data-aos="fade-up" data-aos-duration="600" data-aos-delay="3" />
                            <div>
                            <label>Date For Mass</label>
                            <input placeholder="Date" class="subscribe-input" type="datetime-local"  name="Date" min="2000-01-01T00:00" max="2500-06-14T00:00" data-aos="fade-up" data-aos-duration="800" data-aos-delay="4" />
                            </div>
                            <div>
                            <label>Upload Receipt</label>
                            <input accept=".jpg, .jpeg, .png, .gif, .pdf" class="subscribe-input" name="arquivo" type="file" data-aos="fade-up" data-aos-duration="800" data-aos-delay="5" />
                            </div>
                            <textarea placeholder="Write your Intention" class="subscribe-textarea" name="email" type="email" data-aos="fade-up" data-aos-duration="800" data-aos-delay="3" />
                            <div class="submit-btn" data-aos="fade-up" data-aos-duration="900" data-aos-delay="2">
                                <button className="bm_btn">
                                    <span className="bm_btn-text-one">Book now</span>
                                    <span className="bm_btn-text-two">Great!</span>
                                </button>
                            </div>
                        </div>

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