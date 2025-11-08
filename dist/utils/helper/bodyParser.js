export const bodyParser = (req) => {
    return new Promise((resolve, reject) => {
        let body = '';
        req.on('data', (chunk) => {
            body += String(chunk);
        });
        req.on('end', () => {
            try {
                resolve(JSON.parse(body || '{}'));
            }
            catch (error) {
                reject(error);
            }
        });
        req.on('error', (error) => {
            reject(error);
        });
    });
};
//# sourceMappingURL=bodyParser.js.map