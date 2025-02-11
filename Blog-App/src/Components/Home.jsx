import React from 'react'
import { useNavigate } from 'react-router'
import { FaArrowRight as RightIcon } from "react-icons/fa6";

const Home = () => {
  const navigate = useNavigate();

  return (
    <main
      className="relative min-h-screen flex items-center justify-center text-center bg-cover bg-center"
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1432821596592-e2c18b78144f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmxvZyUyMGJhY2tncm91bmR8ZW58MHx8MHx8fDA%3D)" }}
    >
      {/* Overlay for better readability */}
      <div className="absolute inset-0 bg-opacity-20 bg-[#000000a3]"></div>

      {/* Content Section */}
      <div className="relative z-10 text-white px-6 md:px-12">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome to Blog App</h1>
        <p className="text-lg md:text-xl mb-6">Share your thoughts with the world.</p>
        <button
          onClick={() => navigate('/create')}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition duration-300"
        >
          Create Post <RightIcon className="inline text-lg mb-1 ml-1.5" />
        </button>
      </div>
    </main>
  )
}

export default Home