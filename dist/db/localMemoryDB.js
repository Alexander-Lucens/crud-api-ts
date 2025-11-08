import { v4 as uuidv4 } from "uuid";
let users = [];
export const getUsers = async () => {
    return users;
};
export const getUserById = async (id) => {
    return users.find((user) => user.id === id);
};
export const createUser = async (data) => {
    const newUser = { id: uuidv4(), ...data };
    users.push(newUser);
    return newUser;
};
export const putUserById = async (id, data) => {
    let user = users.find((user) => user.id === id);
    if (!user)
        return undefined;
    user.age = data.age;
    user.username = data.username;
    user.hobbies = data.hobbies;
    return user;
};
export const patchUserById = async (id, data) => {
    let user = users.find((user) => user.id === id);
    if (!user)
        return undefined;
    if (data.age !== undefined)
        user.age = data.age;
    if (data.username !== undefined)
        user.username = data.username;
    if (data.hobbies !== undefined)
        user.hobbies = data.hobbies;
    return user;
};
export const deleteUserById = async (id) => {
    let len = users.length;
    users = users.filter((user) => user.id !== id);
    return (len === users.length ? false : true);
};
export const deleteAllUsers = async () => {
    return (users = [], true);
};
//# sourceMappingURL=localMemoryDB.js.map