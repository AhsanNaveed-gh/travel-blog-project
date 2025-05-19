import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from "./HomePage.jsx"; // Component for the homepage
import BlogPost from "./BlogPost.jsx"; // Component for viewing individual blog post
import Fetch from "./Fetch.jsx";
import CreatePost from "./CreatePost.jsx";
import NavBar from "./NavBar.jsx";

function App() {
  return (
    <div className="App">
    <Router>
    <NavBar />
      <Routes>
        {/* Home page route */}
        <Route path="/" element={<HomePage />} />
        
        {/* Blog post route */}
        <Route path="/post/:id" element={<BlogPost />} />

        {/* New route for creating posts */}
        <Route path="/create-post" element={<CreatePost />} />
      </Routes>
      <footer />
    </Router>
    </div>
  );
}

export default App;
