import http from "node:http";

/**
 * @brief Tool for more comfortable write in response HTTP status cod and response 
 */
export const writeResponse = (res: http.ServerResponse, code: number, jsonData: Object | null) => {
	if (jsonData !== null) {
		res.writeHead(code, { 'Content-Type': 'application/json' });
		res.end(JSON.stringify(jsonData));
	} else {
		res.writeHead(code);
		res.end();
	}
};

/**
 * @brief Write in response JSON with massage 
 * and returns HTTP status code 400 
 */
export const badRequest = (res: http.ServerResponse, message: string) => {
	writeResponse( res, 400, { message });
};

/**
 * @brief Write in response JSON with massage 'Endpoint not found' 
 * and returns HTTP status code 404 
 */
export const notFound = (res: http.ServerResponse) => {
	writeResponse( res, 404, { message: 'Not Found' });
};