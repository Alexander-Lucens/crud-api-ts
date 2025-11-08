import http from "node:http";
import * as db from "../db/localMemoryDB.js";
import { validate } from "uuid";
import { User } from "../models/userModel.js";
import { badRequest, notFound, writeResponse } from "../utils/writeResponse.js";

const isValidUserData = (data: any): boolean => {
    const { username, age, hobbies } = data;
    return username && typeof username === 'string' &&
           age && typeof age === 'number' &&
           hobbies && Array.isArray(hobbies);
}

/** CREATE ***********************************************************************************************************/

export const createUser = async (req: http.IncomingMessage, res: http.ServerResponse, userData: Omit<User, "id">) => {
	const user = await db.createUser(userData);
	writeResponse(res, 201, user);
}

export const createUserFromBody = async (req: http.IncomingMessage, res: http.ServerResponse) => {
	// @ts-ignore
	const userData: User = req.body;
	if (!isValidUserData(userData)) {
        badRequest(res, "Request body does not contain required fields");
        return;
    }
	createUser(req, res, userData);
}
/** ******************************************************************************************************************/

/** READ *************************************************************************************************************/

export const getUsers = async (req: http.IncomingMessage, res: http.ServerResponse) => {
	const users = await db.getUsers();
	writeResponse(res, 200, users);
}

export const getUserById = async (req: http.IncomingMessage, res: http.ServerResponse, id: string) => {
	if (!validate(id)) {
		badRequest(res, "Invalid userId");
		return;
	}
	const user = await db.getUserById(id);
	user !== undefined ? writeResponse(res, 200, user) : notFound(res);

}

export const getUserByIdFromParams = async (req: http.IncomingMessage, res: http.ServerResponse) => {
	// @ts-ignore
	const { id } = req.params;
	getUserById(req, res, id);
}
/** ******************************************************************************************************************/

/** UPDATE ***********************************************************************************************************/

export const putUserById = async (req: http.IncomingMessage, res: http.ServerResponse, id: string, userData: Omit<User, "id">) => {
	if (!validate(id)) {
		badRequest(res, "Invalid userId");
		return;
	}
	const user = await db.putUserById(id, userData);
	user !== undefined ? writeResponse(res, 200, user) : notFound(res);
}

export const putUserByIdFromParams = async (req: http.IncomingMessage, res: http.ServerResponse) => {
	// @ts-ignore
	const { id } = req.params;
	// @ts-ignore
	const userData: User = req.body;
	if (!isValidUserData(userData)) {
        badRequest(res, "Request body does not contain required fields");
        return;
    }
	putUserById(req, res, id, userData);
}

export const patchUserById = async (req: http.IncomingMessage, res: http.ServerResponse, id: string, userData: Omit<User, "id">) => {
	if (!validate(id)) {
		badRequest(res, "Invalid userId");
		return;
	}
	const user = await db.patchUserById(id, userData);
	user !== undefined ? writeResponse(res, 200, user) : notFound(res);
}

export const patchUserByIdFromParams = async (req: http.IncomingMessage, res: http.ServerResponse) => {
	// @ts-ignore
	const { id } = req.params;
	// @ts-ignore
	const userData: User = req.body;
	if (!isValidUserData(userData)) {
        badRequest(res, "Request body does not contain required fields");
        return;
    }
	patchUserById(req, res, id, userData);
}

/** ******************************************************************************************************************/

/** DELETE ***********************************************************************************************************/

export const deleteAllUsers = async (req: http.IncomingMessage, res: http.ServerResponse) => {
	const users = await db.deleteAllUsers();
	writeResponse(res, 204, null);
}

export const deleteUserById = async (req: http.IncomingMessage, res: http.ServerResponse, id: string) => {
	if (!validate(id)) {
		badRequest(res, "Invalid userId");
		return;
	}
	const user = await db.deleteUserById(id);
	user ? writeResponse(res, 204, null) : notFound(res);
}

export const deleteUserByIdFromParams = async (req: http.IncomingMessage, res: http.ServerResponse) => {
	// @ts-ignore
	const { id } = req.params;
	deleteUserById(req, res, id);
}
/** ******************************************************************************************************************/
