import React, { useEffect, useState } from 'react'
import useFetchQuery from '../hooks/useFetchData';
import { toast } from 'react-toastify';

const Posts = () => {

  // API call to fetch ALL post
  const { response: blogDataRes, error: blogDataErr, isLoading, refetch: fetchBlogData } = useFetchQuery('/post/', 'GET');
  const [blogData, setBlogData] = useState([]);
  const [visiblePosts, setVisiblePosts] = useState(9);

  useEffect(() => {
    if (blogDataRes) {
      setBlogData(blogDataRes.posts);
    }
  }, [blogDataRes, blogDataErr])

  useEffect(() => {
    fetchBlogData(); // Ensure it runs once on mount
  }, []);

  const loadMorePosts = () => {
    setVisiblePosts((prevValue) => prevValue + 6);
  }


  // we can show Loader
  if (isLoading) return <h1 className='flex items-center justify-center'>Loading...</h1>

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center my-6">Blog Posts</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogData.slice(0, visiblePosts).map((post) => (
          <div key={post._id} className="bg-white border max-w-lg shadow-lg rounded-lg p-6">
            {/* Blog Title */}
            <h2 className="text-xl font-semibold mb-2 text-gray-900">{post?.title}</h2>

            <div className='flex justify-between items-center'>
              {/* Category */}
              <div className="text-sm text-gray-600 mb-2">
                <span className="font-medium text-gray-700">Category:</span> {post.category}
              </div>

              <div className="text-sm text-gray-600 mb-2">
                <span className="font-medium text-gray-700">Author:</span> {post.author}
              </div>
            </div>

            <p className="text-gray-700 line-clamp-3 pt-5">
              {post.content.length > 150 ? `${post.content.substring(0, 150)}...` : post.content}
            </p>
          </div>
        ))}
      </div>

      {visiblePosts < blogData.length && (
        <div className="text-center mt-6">
          <button
            onClick={loadMorePosts}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  )
}

export default Posts