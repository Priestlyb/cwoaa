const addNewBtn = ({ setCloseAddNews }) => {
    return (
      <div onClick={() => setCloseAddNews(false)} className="mainEvent_btn row">
        Add News
      </div>
    );
  };
  
  export default addNewBtn
;
  