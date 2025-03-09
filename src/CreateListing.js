import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection

export default function CreateListing() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    productName: '',
    description: '',
    rentalPrice: '',
    zipCode: ''
  });

  const navigate = useNavigate(); // Initialize navigation

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5001/api/listings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        navigate("/thank-you"); // Redirect to Thank You page
      } else {
        alert("Failed to submit listing.");
      }
    } catch (error) {
      console.error("Error submitting listing:", error);
      alert("An error occurred.");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: "url('/lawnmover.jpg')" }}>
    <div>
      {/* Title */}
      <div className="white-bar">
            <b>
              Kevank - Create a Product Listing
            </b>
      </div>
    <br/> <br/>
      {/* White Card Container */}
      <div className="form-container items-center">
        <form onSubmit={handleSubmit} className="space-y-5">
        <table className="w-full">
        <tbody>
          {/* Row 1 */}
          <tr>
            <td className="p-2">
              <label className="block font-medium">Your Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </td>
            <td className="p-2">
              <label className="block font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </td>
          </tr>
          {/* Row 2 */}
          <tr>
            <td className="p-2">
              <label className="block font-medium">Product Name</label>
              <input
                type="text"
                name="productName"
                value={formData.productName}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </td>
            <td className="p-2">
              <label className="block font-medium">Product Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </td>
          </tr>
          {/* Row 3 */}
          <tr>
            <td className="p-2">
              <label className="block font-medium">Rental Price per Day</label>
              <input
                type="number"
                name="rentalPrice"
                value={formData.rentalPrice}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </td>
            <td className="p-2">
              <label className="block font-medium">Zip Code</label>
              <input
                type="text"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </td>
          </tr>
        </tbody>
      </table>
      {/* Submit Button */}
      <div className="mt-4">
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded"
        >
          Submit Listing
        </button>
      </div>
        </form>
      </div>
    </div>
    </div>
  );
  
  
  
}
