import { useState } from "react";
import { Link } from "react-router-dom";

export default function RentalRequestFlow() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    item: "",
    startDate: "",
    endDate: "",
    zipCode: "",
    name: "",
    email: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => setStep(step + 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5001/submit-rental", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      console.log(result.message);
      setStep(step + 1);
    } catch (err) {
      console.error("Error submitting rental request:", err);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 border rounded-lg shadow-md mt-10">
      {step === 1 && (
        <div className="h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: "url('/background.jpg')" }}>
          <div className="form-container">
            <h1 className="text-4xl font-bold text-yellow-500 shadow-xl">
              Kevank - Your Own Rental Marketplace
            </h1>
          </div>
          <br />
          <div className="form-container">
            <Link to="/create-listing" className="text-lg text-yellow-500 hover:text-white font-semibold">
              Create a Listing
            </Link>
          </div>
          <div className="bg-image">
            <div className="form-container">
              <h2>Enter Rental Details</h2>
              <input name="item" placeholder="Item to Rent" onChange={handleChange} required />
              <input name="startDate" type="date" onChange={handleChange} required />
              <input name="endDate" type="date" onChange={handleChange} required />
              <input name="zipCode" placeholder="Zip Code" onChange={handleChange} required />
              <button onClick={handleNext}>Submit</button>
            </div>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="bg-image">
          <div className="form-container">
            <h2 className="text-xl font-semibold mb-4">Enter Your Details</h2>
            <input name="name" placeholder="Your Name" onChange={handleChange} className="w-full p-2 mb-2 border" required />
            <input name="email" type="email" placeholder="Your Email" onChange={handleChange} className="w-full p-2 mb-2 border" required />
            <textarea name="message" placeholder="Additional Info" onChange={handleChange} className="w-full p-2 mb-4 border"></textarea>
            <button onClick={handleSubmit} className="w-full p-2 bg-blue-500 text-white">Submit</button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-4">Thank You for Your Interest</h2>
          <p>It looks like this item is no longer available. We will contact you as soon as we have it available.</p>
        </div>
      )}
    </div>
  );
}
