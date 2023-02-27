const EventBtn = ({ setClose }) => {
  return (
    <div onClick={() => setClose(false)} className="mainEvent_btn">
      Add New Event
    </div>
  );
};

export default EventBtn;
