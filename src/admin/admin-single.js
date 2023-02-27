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
        <>
            {/* events */}

            <div className='col-lg-3 mt-3'>
                <img src={event_img} alt=''  className='upload_img' />
            </div>
            <div className='col-lg-3 mt-3'>Titles</div>
            <div className='col-lg-3 mt-3'>{event_desc.slice(0,25)}. . .</div>
            <div className='row col-lg-3 mt-3'>

                <a href={`/updateevent/${_id}`} type="button" className="col-lg-12 btn btn-sm btn-outline-secondary edit_btn" >Edit</a>

                <button type="button" className="col-lg-12 mt-2 btn btn-sm btn-outline-secondary" onClick={deleteHandler}>Delete</button>

            </div>
        </>
    )
}

export default Adminsingle