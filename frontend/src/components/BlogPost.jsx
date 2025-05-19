import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import blogPost from "./../blogPost.css";

function BlogPosts() {
  const [posts, setPosts] = useState([]); // State for storing posts
  const [error, setError] = useState(null); // State for storing errors

  useEffect(() => {
    fetch('http://localhost:5000/posts') // Adjust this URL if necessary
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        return response.json();
      })
      .then(data => setPosts(data)) // Update posts state
      .catch(err => setError(err.message)); // Update error state if an error occurs
  }, []);

  return (
    <div>
      <h1>Blog Posts</h1>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {posts.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        posts.map(post => (
          <div key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            {post.image_url && <img src= {post.image_url} alt={post.title}style={{ maxWidth: '100%' }} />}
            <small>Posted on: {new Date(post.created_at).toLocaleString()}</small>
          </div>
        ))
      )}
    </div>
  );
}

export default BlogPosts;  