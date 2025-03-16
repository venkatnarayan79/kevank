import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RentalRequestFlow from "./RentalRequestFlow.js";
import CreateListing from "./CreateListing.js";
import ThankYou from "./ThankYou.js";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RentalRequestFlow />} />
        <Route path="/create-listing" element={<CreateListing />} />
        <Route path="/thank-you" element={<ThankYou />} />
      </Routes>
    </Router>
  );
}
