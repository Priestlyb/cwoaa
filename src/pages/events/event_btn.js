const EventBtn = ({ setClose }) => {
  return (
    <div onClick={() => setClose(false)} className="mainEvent_btn row">
      Add New Event
    </div>
  );
};

export default EventBtn;
