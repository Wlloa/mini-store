import {hash, compare} from 'bcrypt';

export async function hashPassword(password: string): Promise<string> {
    const hashedPass = await hash(password, 12);
    return hashedPass;
}

export async function isValidPassword(hashedPass: string, password: string): Promise<boolean> {
    const isValid = await compare(password, hashedPass);
    return isValid;
}