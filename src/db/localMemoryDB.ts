import { User } from "../models/userModel.ts";
import { v4 as uuidv4 } from "uuid";

let users: User[] = [];

export const getUsers = async (): Promise<User[]> => {
	return users;
};

export const getUserById = async (id: string): Promise<User | undefined> => {
	return users.find((user) => user.id === id);
};

export const createUser = async (data: Omit<User, 'id'>): Promise<User> => {
	const newUser = { id: uuidv4(), ...data };
	users.push(newUser);
	return newUser;
};

export const putUserById = async (id: string, data: Omit<User, 'id'>): Promise<User | undefined> => {
	let user = users.find((user) => user.id === id);
	if (!user)
		return undefined;
	user.age = data.age;
	user.username = data.username;
	user.hobbies = data.hobbies;
	return user;
};

export const patchUserById = async (id: string, data: Omit<User, 'id'>): Promise<User | undefined> => {
	let user = users.find((user) => user.id === id);
	if (!user)
		return undefined;
	if (data.age !== undefined) user.age = data.age;
	if (data.username !== undefined) user.username = data.username;
	if (data.hobbies !== undefined) user.hobbies = data.hobbies;
	return user;
};

export const deleteUserById = async (id: string): Promise<true | false> => {
	let len = users.length;
	users = users.filter((user) => user.id !== id);
	return (len === users.length ? false : true);
};

export const deleteAllUsers = async (): Promise<true | false> => {
	return (users = [], true);
};