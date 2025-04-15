// cassandra.js
import cassandra from "cassandra-driver";

const client = new cassandra.Client({
  contactPoints: ["127.0.0.1"],
  localDataCenter: "datacenter1",
  keyspace: "mykeyspace",
});

export async function connectCassandra() {
  try {
    await client.connect();
    console.log("✅ Connected to Cassandra");
  } catch (err) {
    console.error("❌ Cassandra connection failed:", err);
  }
}

export default client;
