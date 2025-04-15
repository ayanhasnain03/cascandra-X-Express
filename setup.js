// setup.js
import client from "./cassandra.js";

export async function setupDatabase() {
  await client.execute(`
    CREATE KEYSPACE IF NOT EXISTS mykeyspace
    WITH replication = {'class': 'SimpleStrategy', 'replication_factor': 1};
  `);

  await client.execute(`
    CREATE TABLE IF NOT EXISTS mykeyspace.users (
      id UUID PRIMARY KEY,
      name TEXT,
      email TEXT
    );
  `);

  console.log("✅ Keyspace and table setup complete");
}
