// server.js
import express from "express";
import { v4 as uuidv4 } from "uuid";
import client, { connectCassandra } from "./cassandra.js";
// import { setupDatabase } from "./setup.js";
const app = express();
const PORT = 5000;

app.use(express.json());

app.get("/users", async (req, res) => {
  try {
    const result = await client.execute("SELECT * FROM mykeyspace.users");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});
app.post("/create-user", async (req, res) => {
  const { name, email } = req.body;
  const id = uuidv4();

  try {
    await client.execute(
      "INSERT INTO mykeyspace.users (id, name, email) VALUES (?, ?, ?)",
      [id, name, email],
      { prepare: true }
    );

    res.status(201).json({ message: "User added", id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to insert user" });
  }
});
const startServer = async () => {
  await connectCassandra();
  // await setupDatabase();

  app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
  });
};

startServer();
