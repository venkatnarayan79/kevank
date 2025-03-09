import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RentalRequestFlow from "./RentalRequestFlow";
import CreateListing from "./CreateListing";
import ThankYou from "./ThankYou";

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
