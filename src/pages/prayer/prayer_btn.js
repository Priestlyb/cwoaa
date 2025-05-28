const PrayerBtn = ({ setCloseAddPrayer }) => {
    return (
      <div onClick={() => setCloseAddPrayer(false)} className="mainEvent_btn row">
        Add New Prayer
      </div>
    );
  };
  
  export default PrayerBtn
;
  