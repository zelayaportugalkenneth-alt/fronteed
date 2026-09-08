import { storageService } from "../services/storageService";
import { getUsers, initializeLocalData } from "../utils/localStorageData";
import type { LoginCredentials, User } from "../types/auth";

const SESSION_KEY = "app_session";

export const authRepository = {
  login(credentials: LoginCredentials): User | null {
    initializeLocalData();

    const foundUser = getUsers().find(
      (user) =>
        user.username === credentials.username &&
        user.password === credentials.password,
    );

    if (!foundUser) {
      return null;
    }

    const sessionUser: User = {
      id: foundUser.id,
      name: foundUser.name,
      username: foundUser.username,
      role: foundUser.role,
    };

    storageService.set<User>(SESSION_KEY, sessionUser);

    return sessionUser;
  },

  logout(): void {
    storageService.remove(SESSION_KEY);
  },

  getCurrentUser(): User | null {
    return storageService.get<User>(SESSION_KEY);
  },

  isAuthenticated(): boolean {
    return this.getCurrentUser() !== null;
  },
};
