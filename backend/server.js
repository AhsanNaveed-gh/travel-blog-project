import express from 'express';
import pool from './Database.js'; // Your database connection
import cors from 'cors';
import multer from 'multer';
import path from 'path';

const app = express();
const port = 5000;

app.use(express.json()); // Enable JSON request body parsing
app.use('/uploads', express.static('uploads'));

// CORS configuration to allow frontend to make requests
app.use(cors());

// Get all posts
app.get('/posts', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM posts');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching posts' });
  }
});

// Get a specific post by ID
app.get('/posts/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM posts WHERE id = $1', [id]);
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ error: 'Post not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching the post' });
  }
});

// Create a new post
app.post('/posts', async (req, res) => {
  const { user_id, title, content } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO posts (user_id, title, content) VALUES ($1, $2, $3) RETURNING *',
      [user_id, title, content]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while creating the post' });
  }
});
//For uploading images with Blogs.
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Directory to save uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});

// Initialize Multer
const upload = multer({ storage });

// Create a route to handle image upload
app.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  res.json({ imageUrl: `/uploads/${req.file.filename}` }); // Return the uploaded image URL
});


// Update an existing post by ID
app.put('/posts/:id', async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  try {
    const result = await pool.query(
      'UPDATE posts SET title = $1, content = $2 WHERE id = $3 RETURNING *',
      [title, content, id]
    );
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ error: 'Post not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while updating the post' });
  }
});

// Delete a post by ID
app.delete('/posts/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM posts WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length > 0) {
      res.json({ message: 'Post deleted' });
    } else {
      res.status(404).json({ error: 'Post not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while deleting the post' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
