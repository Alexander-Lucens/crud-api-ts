import http from "node:http";
import dotenv from 'dotenv';
dotenv.config({ path: './.env' });
const PORT = Number(process.env.PORT) || 1234;
const host = 'localhost';
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end("Server Created!");
});
server.listen(PORT, host, () => {
    console.log(`Server running at http://${host}:${PORT}`);
});
//# sourceMappingURL=server.js.map