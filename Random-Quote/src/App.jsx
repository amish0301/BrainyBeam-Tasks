import React, { useState } from "react";
import { FiCopy } from "react-icons/fi";
import { Slide, toast, ToastContainer } from "react-toastify";
import { options } from "./api.credentials";

function App() {

  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [loading, setLoading] = useState(false);
  const [newPost, setNewPost] = useState("");

  // Fetch random quote
  const fetchQuote = async () => {
    const toastId = toast.loading("Fetching Quote")
    setLoading(true);

    try {
      const response = await fetch("https://random-quote-generator2.p.rapidapi.com/randomQuote", options);
      const data = await response.json();

      if (data) {
        toast.success("Fetched Successfully", toastId);
        setQuote(data[0].Quote);
        setAuthor(data[0].Author);
      }
    } catch (error) {
      toast.error('oops, something went wrong!', toastId);
    } finally {
      setLoading(false);
      toast.dismiss(toastId);
    }
  };

  // Copy quote to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(quote).then(() => {
      if (quote !== newPost) setNewPost(quote)
    });
    toast.info("Quote Copied")
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-300 p-5">
        <h2 className="text-2xl font-semibold mb-4 text-black">Random Quote Generator</h2>
        <div className="text-gray-700 bg-white shadow-lg rounded-lg p-5 text-center w-full max-w-md">

          {!quote && <b className="text-left block">"Click Below to get a Quote"</b>}

          {quote && (
            <div className="mt-4 p-4 text-gray-800">
              <p className="text-lg font-semibold italic capitalize">"{quote}"</p>
              <p className="text-right font-light capitalize italic mt-2">- {author}</p>
            </div>
          )}

          {/* Buttons */}
          <div className="flex justify-between mt-4">
            <button
              onClick={fetchQuote}
              disabled={loading}
              className={`bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition ${loading ? 'cursor-not-allowed' : ''}`}
            >
              Get Quote
            </button>
            <button
              onClick={copyToClipboard}
              className={`bg-gray-200 flex text-gray-600 items-center justify-between gap-2 p-2 rounded-lg hover:bg-gray-300 transition ${!quote ? 'cursor-not-allowed' : ''}`}
              disabled={!quote}
            >
              <FiCopy className="text-gray-600" size={20} />
              <span>Copy Quote & Create Post</span>
            </button>
          </div>


          {newPost && (
            <div className="my-5 p-4 border rounded text-gray-700">
              <h2 className="font-bold text-lg">New Post</h2>
              <p className="capitalize my-2 tracking-wide">{newPost}</p>
            </div>
          )}
        </div>
      </div>
      <ToastContainer
        position="bottom-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Slide}
      />
    </>
  )
}

export default App
