import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from "./component/layout";
import Navbar from "./component/navbar/navbar";
import Footer from "./component/footer/footer";
import Quickcontact from "./component/quick-contact/quick-contact";
import AdminPage from "./admin/admin-page";
import About from "./pages/about/about";
import Prayer from "./pages/prayer/prayers";
import Event from "./pages/events/events";
import News from "./pages/news/news";
import NewsPage from "./pages/news/newsPage";
import EventsEdit from "./pages/events/updateevent";
import Login from "./pages/login/Login";
import { Context } from "./context/Context";
import EventSinglePage from "./pages/events/event_singlepage";
import EventImgDataadd from "./component/eventimg_d_btn/eventimg_d_add";
import EventsAdd from "./pages/events/events_add";
import Aos from "aos"
import Bookmass from "./pages/book-mass/book_mass";
// import Register from "./pages/register/Register";
import UpdatePrayer from "./pages/prayer/updatePrayer";
import UpdateNews from "./pages/news/updatenews";

function App() {

  useEffect(() => {
    Aos.init({
      duration: 900,
      delay: 100,
    });
  }, [])

  const { user } = useContext(Context);
  return (
    <>

        < Router>
          <Navbar />
          <Routes>
            <Route path='/' exact element={<Layout />} />
            <Route path="/admin" element={user ? <AdminPage /> : <Login />} />
            {/*<Route path="/register" element={<Register />} />*/}
            <Route path="/about" element={<About />} />
            <Route path="/book&mass" element={<Bookmass />} />
            <Route path="/prayers" element={<Prayer />} />
            <Route path="/eventsinglepage/:id" element={<EventSinglePage />} />
            <Route path="/events" element={<Event />} />
            <Route path='/updateevent/:id' element={<EventsEdit />} />
            <Route path='/updateprayer/:id' element={<UpdatePrayer />} />
            <Route path="/news" element={<News />} />
            <Route path="/news/:id" element={<NewsPage />} />
            <Route path="/updatenews/:id" element={<UpdateNews />} />
            <Route path="/eventimgdataadd/:id" element={<EventImgDataadd />} />
            <Route path="/eventadd" element={<EventsAdd />} />
          </Routes>
          <Footer />
          <Quickcontact />
        </Router>

    </>
  );
}

export default App;
