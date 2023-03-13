import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../config';

const EventImgDataadd = ({ setClose, event }) => {
    const id = useParams().id;
    const history = useNavigate();
    const [file, setFile] = useState(null);

    useEffect(() => {
        const fetchHandler = async () => {
            await axiosInstance
                .get(`http://localhost:9000/events/${id}`)
                .then((res) => res.data)
                .then(data => setInputs(data.event));
        };
        fetchHandler();
    }, [id]);

    const [inputs, setInputs] = useState({
        event_img: event?.event_img ?? '',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append('file', file);
        data.append('upload_preset', 'cwoaauploads');
        const uploadRes = await axiosInstance.put(
            'https://api.cloudinary.com/v1_1/priestlythedon/image/upload',
            data
        );
        const { url } = uploadRes.data;

        const response = await axiosInstance.put(`/events/${id}`, {
            event_img: url,
        });
        if (response.data) {
            setInputs({
                event_img: '',
            });
            history(`/EventSinglePage/${id}`);
        }
    };

    return (
        <div className="">
            <div className="wrapper">
                <div className="">
                    <h1>Edit Event</h1>


                    <div className="item">
                        <label className="label">Current Image</label>
                        {inputs.event_img && (
                            <img src={inputs.event_img} alt="Current Event" className="eventImg" />
                        )}
                    </div>


                    <div className="item">
                        <label className="label">Choose a new image</label>
                        <input type="file" className='' onChange={(e) => setFile(e.target.files[0])} />
                    </div>

                    <button className="btn" onClick={handleSubmit}>
                        Update
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EventImgDataadd