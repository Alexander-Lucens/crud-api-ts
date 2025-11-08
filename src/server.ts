import requestListener from "./app.js";
import http from 'node:http';
import dotenv from 'dotenv';

dotenv.config({ path: './.env' });
const PORT = Number(process.env.PORT) || 1234;

const server = http.createServer(requestListener);

server.listen(PORT, () => {
	console.log(`Server running at http://localhost:${PORT}`);
});