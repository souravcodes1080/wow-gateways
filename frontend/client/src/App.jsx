import Homepage from "./pages/Homepage/Homepage"
import Footer from "./components/Footer/Footer"
import Navbar from "./components/Navbar/Navbar"
import Aboutus from "./pages/AboutUs/Aboutus"
import Location from "./pages/Location/Location"
import Cabservice from "./pages/Cabservice/Cabservice"
import Service from "./pages/Service/Service"
import Tourpackage from "./pages/TourPackage/Tourpackage"
import Contactus from "./pages/ContactUs/Contactus"


import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link
} from "react-router-dom";
import WhatsappButton from "./components/WhatsappButton/WhatsappButton"
import Homestay from "./pages/Homestay/Homestay"

function App() {

  return (
    <Router>
    <WhatsappButton />
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage/>}/>
        <Route path="/aboutus" element={<Aboutus/>}/>
        <Route path="/location" element={<Location/>}/>
        <Route path="/cabservice" element={<Cabservice/>}/>
        <Route path="/service" element={<Service/>}/>
        <Route path="/tourpackage" element={<Tourpackage/>}/>
        <Route path="/contactus" element={<Contactus/>}/>

        <Route path="/homestay" element={<Homestay />} />
      </Routes>
      <Footer />
    </Router>
      
  )
}

export default App
