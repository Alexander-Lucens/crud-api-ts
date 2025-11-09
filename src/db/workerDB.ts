import { User } from "../models/userModel.js";
import { v4 as uuidv4 } from "uuid";

const queryPrimaryProcess = (msg: object): Promise<any> => {
	return new Promise((resolve) => {
		const requestId = uuidv4();

		process.send!({ ...msg, requestId });
		const listener = (res: any) => {
			if (res.requestId === requestId) {
				process.removeListener('message', listener);
				resolve(res.data);
			}
		};
		process.on('message', listener);
	});
}

export const getUsers = async (): Promise<User[]> => {
    return queryPrimaryProcess({ type: 'db:getUsers' });
};

export const getUserById = async (id: string): Promise<User | undefined> => {
	return queryPrimaryProcess({ type: 'db:getUserById', data: id });
};

export const createUser = async (data: Omit<User, 'id'>): Promise<User> => {
	return queryPrimaryProcess({ type: 'db:createUser', data });
};

export const putUserById = async (id: string, data: Omit<User, 'id'>): Promise<User | undefined> => {
	return queryPrimaryProcess({ type: 'db:putUserById', data: { id, data } });
};

export const patchUserById = async (id: string, data: Partial<User>): Promise<User | undefined> => {
	return queryPrimaryProcess({ type: 'db:patchUserById', data: { id, data } });
};

export const deleteUserById = async (id: string): Promise<true | false> => {
	return queryPrimaryProcess({ type: 'db:deleteUserById', data: id });
};

export const deleteAllUsers = async (): Promise<true | false> => {
	return queryPrimaryProcess({ type: 'db:deleteAllUsers' });
};