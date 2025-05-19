import pkg from "pg"; // Import the entire pg package
const { Pool } = pkg; // Destructure Pool from the imported package
import dotenv from "dotenv";
dotenv.config();

const pool = new Pool({ // Create an instance of Pool
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD, // Replace with your actual password
    port: Number(process.env.DB_PORT),
});

export default pool; // Export the pool instance as default
