import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="text-center">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-gray-900 mb-4">
          Organize Your Life, <br className="hidden md:inline" />
          One Task at a Time
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-8">
          Our platform helps you manage tasks, track progress, and achieve your
          goals with ease.
        </p>
        <Link
          to="/signup"
          className="bg-blue-700 text-white font-semibold text-lg px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300 shadow-lg transform hover:scale-105"
        >
          Get Started for Free
        </Link>
      </div>
    </div>
  );
}

export default Home;
