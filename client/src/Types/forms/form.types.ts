export interface IFormData {
    email: string,
    password: string
}

export interface IFormRegDataReq {
    first_name: string,
    last_name: string,
    email: string,
    password: string,
}

export interface IFormRegDataRes {
    first_name: string
    last_name: string
    email: string
    password: string
    confirmPassword: string
}