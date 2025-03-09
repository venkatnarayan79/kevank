import { Link } from "react-router-dom";

export default function ThankYou() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h2 className="text-3xl font-semibold mb-4">Thank You!</h2>
      <p className="text-lg mb-6">Your listing has been submitted successfully.</p>
      <Link to="/" className="px-4 py-2 bg-blue-500 text-white rounded">
        Go to Home
      </Link>
    </div>
  );
}
