import "./styles/global.css";

import ForgotPassword from "./Component/ForgotPassword";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import { Route, Routes } from "react-router-dom";

import CitySelectionExample from "./Component/CitySelectionDropdown";
// import SeatSelection from "./Component/SeatSelection";
// import BookSeat from "./Pages/bookSeat";
import Passengerdetail from "./Component/PassengerDetail";
import FrontPage from "./Pages/bookSeat";
function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/Forgotpassword" element={<ForgotPassword />}></Route>
        <Route path="/City" element={<CitySelectionExample />}></Route>
        {/* <Route path="/seat" element={<SeatSelection />}></Route> */}
        <Route path="/seat-book" element={<FrontPage />}></Route>
        <Route path="/Passengerdetail" element={<Passengerdetail />}></Route>
      </Routes>
    </>
  );
}

export default App;
