/**
 * @brief Tool for more comfortable write in response HTTP status cod and response
 */
export const writeResponse = (res, code, jsonData) => {
    if (jsonData !== null) {
        res.writeHead(code, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(jsonData));
    }
    else {
        res.writeHead(code);
        res.end();
    }
};
/**
 * @brief Write in response JSON with massage
 * and returns HTTP status code 400
 */
export const badRequest = (res, message) => {
    writeResponse(res, 400, { message });
};
/**
 * @brief Write in response JSON with massage 'Endpoint not found'
 * and returns HTTP status code 404
 */
export const notFound = (res) => {
    writeResponse(res, 404, { message: 'Not Found' });
};
//# sourceMappingURL=writeResponse.js.map