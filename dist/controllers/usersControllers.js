import * as db from "../db/localMemoryDB.js";
import { validate } from "uuid";
import { badRequest, notFound, writeResponse } from "../utils/writeResponse.js";
const isValidUserData = (data) => {
    const { username, age, hobbies } = data;
    return username && typeof username === 'string' &&
        age && typeof age === 'number' &&
        hobbies && Array.isArray(hobbies);
};
/** CREATE ***********************************************************************************************************/
export const createUser = async (req, res, userData) => {
    const user = await db.createUser(userData);
    writeResponse(res, 201, user);
};
export const createUserFromBody = async (req, res) => {
    // @ts-ignore
    const userData = req.body;
    if (!isValidUserData(userData)) {
        badRequest(res, "Request body does not contain required fields");
        return;
    }
    createUser(req, res, userData);
};
/** ******************************************************************************************************************/
/** READ *************************************************************************************************************/
export const getUsers = async (req, res) => {
    const users = await db.getUsers();
    writeResponse(res, 200, users);
};
export const getUserById = async (req, res, id) => {
    if (!validate(id)) {
        badRequest(res, "Invalid userId");
        return;
    }
    const user = await db.getUserById(id);
    user !== undefined ? writeResponse(res, 200, user) : notFound(res);
};
export const getUserByIdFromParams = async (req, res) => {
    // @ts-ignore
    const { id } = req.params;
    getUserById(req, res, id);
};
/** ******************************************************************************************************************/
/** UPDATE ***********************************************************************************************************/
export const putUserById = async (req, res, id, userData) => {
    if (!validate(id)) {
        badRequest(res, "Invalid userId");
        return;
    }
    const user = await db.putUserById(id, userData);
    user !== undefined ? writeResponse(res, 200, user) : notFound(res);
};
export const putUserByIdFromParams = async (req, res) => {
    // @ts-ignore
    const { id } = req.params;
    // @ts-ignore
    const userData = req.body;
    if (!isValidUserData(userData)) {
        badRequest(res, "Request body does not contain required fields");
        return;
    }
    putUserById(req, res, id, userData);
};
export const patchUserById = async (req, res, id, userData) => {
    if (!validate(id)) {
        badRequest(res, "Invalid userId");
        return;
    }
    const user = await db.patchUserById(id, userData);
    user !== undefined ? writeResponse(res, 200, user) : notFound(res);
};
export const patchUserByIdFromParams = async (req, res) => {
    // @ts-ignore
    const { id } = req.params;
    // @ts-ignore
    const userData = req.body;
    patchUserById(req, res, id, userData);
};
/** ******************************************************************************************************************/
/** DELETE ***********************************************************************************************************/
export const deleteAllUsers = async (req, res) => {
    const users = await db.deleteAllUsers();
    writeResponse(res, 204, null);
};
export const deleteUserById = async (req, res, id) => {
    if (!validate(id)) {
        badRequest(res, "Invalid userId");
        return;
    }
    const user = await db.deleteUserById(id);
    user ? writeResponse(res, 204, null) : notFound(res);
};
export const deleteUserByIdFromParams = async (req, res) => {
    // @ts-ignore
    const { id } = req.params;
    deleteUserById(req, res, id);
};
/** ******************************************************************************************************************/
//# sourceMappingURL=usersControllers.js.map