import os from "node:os";
import cluster from "node:cluster";
import http from "node:http";
import type { Worker } from "node:cluster";
import dotenv from 'dotenv';
import * as db from './db/localMemoryDB.js';
import app from "./app.js";

dotenv.config({ 
    path: './.env',
    quiet: true    
});
const PORT = Number(process.env.PORT) || 4000;

const dbHandlers = new Map<string, Function>([
        ['db:getUsers', db.getUsers],
        ['db:getUserById', db.getUserById],
        ['db:createUser', db.createUser],
        ['db:putUserById', db.putUserById],
        ['db:patchUserById', db.patchUserById],
        ['db:deleteUserById', db.deleteUserById],
        ['db:deleteAllUsers', db.deleteAllUsers],
    ]);

if (cluster.isPrimary) {
	const avalibleParalels = os.cpus().length - 1;
	const workers: { worker: Worker, port: number }[] = [];
	let curIndex = 0;

	for (let i = 0; i < avalibleParalels; i++) {
		const workerPort = PORT + 1 + i;
		const worker = cluster.fork({ WORKER_PORT: workerPort });
		workers.push({ worker, port: workerPort });

		worker.on('message', async (msg: any) => {
			let result;
			try {
				const handler = dbHandlers.get(msg.type);
				if (!handler) {
                    console.error(`Unknown message type: ${msg.type}`);
                    return ;
                }
				if (msg.data === undefined) {
                    result = await handler();
                } else if (Array.isArray(msg.data)) {
                    result = await handler(...msg.data);
                } else if (typeof msg.data === 'object' && msg.data.id && msg.data.data) {
                    result = await handler(msg.data.id, msg.data.data);
                } else {
                    result = await handler(msg.data);
                }
			} catch (error) {
				console.error("DB Error in Primary process.\n", error);
                result = undefined;
			}
			worker.send({ 
				requestId: msg.requestId,
				data: result
			});
		});
	}

	const loadBalancer = http.createServer((req, res) => {
        const target = workers[curIndex];
        curIndex = (curIndex + 1) % workers.length;

        const proxyReq = http.request(
            {
                host: 'localhost',
                port: target.port,
                path: req.url,
                method: req.method,
                headers: req.headers,
            },
            (proxyRes) => {
                res.writeHead(proxyRes.statusCode!, proxyRes.headers);
                proxyRes.pipe(res, { end: true });
            }
        );
        req.pipe(proxyReq, { end: true });
        proxyReq.on('error', () => { res.writeHead(502).end('Proxy error'); });
    });

    loadBalancer.listen(PORT, () => {
        console.log(`Load Balancer running at http://localhost:${PORT}`);
    });

} else {
	const workerPort = Number(process.env.WORKER_PORT);
	app.listen(workerPort, () => {
		console.log(`Worker ${process.pid} running at http://localhost:${workerPort}`);
	});
}
