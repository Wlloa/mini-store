export interface User {
    _id?: string;
    email: string;
    name: string;
    picture: string;
    password?: string;
    googleUser: boolean;
}