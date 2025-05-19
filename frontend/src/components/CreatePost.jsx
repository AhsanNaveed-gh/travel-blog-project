import React, { useState } from 'react';

function CreatePost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null); // To store the selected file
  const [imageUrl, setImageUrl] = useState(''); // To store the uploaded image URL

  // Function to handle image upload
  const handleImageUpload = async () => {
    const formData = new FormData();
    formData.append('image', image);

    try {
      const response = await fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.imageUrl) {
        setImageUrl(data.imageUrl); // Update the imageUrl state with the server response
      } else {
        alert('Image upload failed.');
      }
    } catch (err) {
      console.error('Error uploading image:', err);
    }
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const postData = {
      title,
      content,
      image_url: imageUrl, // Include the image URL in the post data
    };

    try {
      const response = await fetch('http://localhost:5000/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      if (response.ok) {
        alert('Post created successfully!');
        setTitle(''); // Clear form fields
        setContent('');
        setImage(null);
        setImageUrl('');
      } else {
        alert('Failed to create post.');
      }
    } catch (err) {
      console.error('Error creating post:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      <input
        type="file"
        onChange={(e) => setImage(e.target.files[0])}
        required
      />
      <button type="button" onClick={handleImageUpload}>
        Upload Image
      </button>
      {imageUrl && <p>Image uploaded: <a href={imageUrl} target="_blank" rel="noopener noreferrer">{imageUrl}</a></p>}
      <button type="submit">Create Post</button>
    </form>
  );
}

export default CreatePost;
