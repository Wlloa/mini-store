export interface User {
    _id?: string;
    email: string;
    name: string;
    picture: string | undefined;
    password?: string | undefined;
    googleUser: boolean;
}