export type UserRole = "PROFESOR" | "SECRETARIA_INFORMACIONES" | "ADMIN";

export interface User {
  id: string;
  name: string;
  username: string;
  role: UserRole;
}

export interface UserRecord extends User {
  password: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}
