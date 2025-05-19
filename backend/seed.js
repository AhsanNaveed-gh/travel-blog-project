import pool from "./Database.js"; // Ensure this matches your file name

const seedDatabase = async () => {
    try {
        await pool.query(
            "INSERT INTO users (username, password, email) VALUES ($1, $2, $3)",
            ["John Doe", "Goku1234", "ahsanads559@gmail.com"]
        );

        await pool.query(
            "INSERT INTO posts (user_id, title, content) VALUES ($1, $2, $3)",
            [1, "My First Post", "This is the content of it"]
        );

        console.log("Database seeded successfully!");
        
    } catch (error) {
        console.error("Error seeding database:", error);
    } finally {
        pool.end(); // Close the database connection
    }
};

seedDatabase();
