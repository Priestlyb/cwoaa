import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from "./component/layout";
import Navbar from "./component/navbar/navbar";
import Footer from "./component/footer/footer";
import Quickcontact from "./component/quick-contact/quick-contact";
import AdminPage from "./admin/admin-page";
import LoginForm from "./admin/login-form";
import About from "./pages/about/about";
import Prayer from "./pages/prayer/prayer";
import Event from "./pages/events/events";
import News from "./pages/news/news";
import EventsEdit from "./pages/events/updateevent";

function App() {
  return (
    <>
      < Router>
        <Navbar />
        <Routes>
          <Route path='/' exact element={<Layout />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/cawa411" element={<AdminPage />} />
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
