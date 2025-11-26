import { authenticateUser, createUser, resetUserPassword, loginAnonymously } from '../utils/storage';

export const authService = {
    login: async (id: string, pass: string) => {
        return await authenticateUser(id, pass);
    },
    signup: async (id: string, pass: string) => {
        return await createUser(id, pass);
    },
    resetPassword: async (id: string) => {
        return await resetUserPassword(id);
    },
    guestLogin: async () => {
        return await loginAnonymously();
    }
};