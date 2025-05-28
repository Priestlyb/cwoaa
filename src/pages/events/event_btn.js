const EventBtn = ({ setCloseAddEvent }) => {
  return (
    <div onClick={() => setCloseAddEvent(false)} className="mainEvent_btn row">
      Add New Event
    </div>
  );
};

export default EventBtn;
