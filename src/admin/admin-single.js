import React from 'react'
import "./admin.css"
import { useNavigate } from "react-router-dom";
import { axiosInstance } from '../config';

const Adminsingle = (props) => {

    const history = useNavigate();
    const { _id, event_img, event_desc } = props.event;

    const deleteHandler = async () => {
        await axiosInstance.delete(`/events/${_id}`)
            .then((res) => res.data)
            .then(() => history("/"))
            .then(() => history("/cawa411"));
    }
    return (
        <div className='row d-flex justify-content-center align-items-center p-4'>
            {/* events */}

            <div className='col-4 mt-3 d-flex justify-content-center align-items-center'>
                <img src={event_img} alt=''  className='upload_img' />
            </div>
            <div className='col-4 mt-3'>Titles</div>
            <div className='col-4 mt-3'>{event_desc.slice(0,25)}. . .</div>
            <div className='row col-12 mt-3'>

                <a href={`/updateevent/${_id}`} type="button" className="col-lg-12 btn btn-sm btn-light edit_btn" >Edit</a>

                <button type="button" className="col-lg-12 mt-2 btn btn-sm btn-danger" onClick={deleteHandler}>Delete</button>

            </div>
        </div>
    )
}

export default Adminsingle