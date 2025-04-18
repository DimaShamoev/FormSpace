export enum Role {
    ADMIN = 'admin',
    USER = 'user',
  }

export interface IUser {
    id: number,
    email: string,
    role: Role,
    token: string
}

export interface IDataUser {
    id: number
    first_name: string
    last_name: string
    email: string
    password: string
    role: Role
    createdAt: Date
}

export interface IUserData {
    email: string,
    password: string
}

export interface IUserDataRegistration {
    first_name: string
    last_name: string
    email: string
    password: string
    token?: string
}

export interface IResponseUser {
    id: number
    email: string
    password: string
    role: Role
    createdAt: string
    updatedAt: string
}

export interface IResponseUserData {
    token: string
    user: IResponseUser
}

export interface IUserInfo {
    id: number
    first_name: string;
    last_name: string;
    email: string
    role: string
}

export interface ICurrentUser {
    id: number
    email: number
    token: string
}