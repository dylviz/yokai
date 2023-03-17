import { promisify } from "util";
import { createClient } from "redis";

const client = createClient({
  url: process.env.REDIS_URL,
});

client.on("error", (error) => {
  console.error(`Redis client error: ${error}`);
});

export async function connect() {
  if (!client.isOpen) {
    await client.connect();
  }
}

// Convert Redis client methods to promises for easier use with async/await
// export const getAsync = promisify(client.get).bind(client);
// export const setAsync = promisify(client.set).bind(client);

export default client;
