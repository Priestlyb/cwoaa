import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from "./component/layout";
import Navbar from "./component/navbar/navbar";
import Footer from "./component/footer/footer";
import Quickcontact from "./component/quick-contact/quick-contact";
import AdminPage from "./admin/admin-page";
import About from "./pages/about/about";
import Prayer from "./pages/prayer/prayer";
import Event from "./pages/events/events";
import News from "./pages/news/news";
import EventsEdit from "./pages/events/updateevent";
import Login from "./pages/login/Login";
import { Context } from "./context/Context";

function App() {
  const { user } = useContext(Context);
  return (
    <>
      < Router>
        <Navbar />
        <Routes>
          <Route path='/' exact element={<Layout />} />
          <Route path="/admin" element={user ? <AdminPage /> : <Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/prayer" element={<Prayer />} />
          <Route path="/events" element={<Event />} />
          <Route path='/updateevent/:id' element={<EventsEdit />} />
          <Route path="/news" element={<News />} />
        </Routes>
        <Footer />
        <Quickcontact />
      </Router>
    </>
  );
}

export default App;
