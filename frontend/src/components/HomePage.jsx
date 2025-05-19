import React,{useState, useEffect} from "react";
import { Link } from "react-router-dom";
import axios from "axios";


function HomePage (){
    const [posts,setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error,setError] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/posts`);
                console.log("Data from server:", response.data); // <-- Log the data
                setPosts(response.data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching posts:", err);
                setError("Error fetching posts");
                setLoading(false);
            }
        };
        fetchPosts();
    }, []);
    

    if(loading) return <p>Hello Welcome</p>;
    if(error) return <p>{error}</p>

    return(
        <div>
            <h1 className="head">Blog Posts</h1>
            {posts.length > 0 ? (
                <ul>
                    {posts.map((post) =>(
                        <li key={post.id}>
                            <Link to={`/post/${post.id}`}>{post.title}</Link>
                        </li>
                    ))}
                </ul>
            ):(
                <p>No posts available</p>
            )
            }
        </div>
    );
}

export default HomePage;