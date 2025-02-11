import { Link } from "react-router";
import { FaFacebook as Facebook, FaTwitter as Twitter, FaInstagram as Instagram, FaGithub as Github } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="container mx-auto px-6 md:px-10">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Logo and Description */}
          <div className="mb-6 md:mb-0">
            <h2 className="text-2xl font-bold text-white">Blog App</h2>
            <p className="text-gray-400 mt-2">
              Discover amazing stories, ideas, and insights from our community.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="mb-6 md:mb-0">
            <ul className="flex space-x-6 text-gray-400 font-medium">
              <li><Link to="/" className="hover:text-white transition">Home</Link></li>
              <li><Link to="/posts" className="hover:text-white transition">Posts</Link></li>
              <li><Link to="/create" className="hover:text-white transition">Create Post</Link></li>
              <li><Link to="/about" className="hover:text-white transition">About</Link></li>
            </ul>
          </div>

          {/* Social Media Icons */}
          <div className="flex space-x-6">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition">
              <Facebook size={24} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition">
              <Twitter size={24} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition">
              <Instagram size={24} />
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition">
              <Github size={24} />
            </a>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-gray-700 my-6" />

        {/* Copyright Section */}
        <p className="text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} Blog App. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
