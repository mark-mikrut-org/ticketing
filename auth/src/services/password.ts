import { scrypt, randomBytes } from 'crypto';
import { promisify } from 'util'

const scryptAsync = promisify(scrypt);

const hashPassword = async (password: string, salt: string): Promise<string> => {
    const buf = (await scryptAsync(password, salt, 64)) as Buffer;
    return buf.toString('hex');
}

export class Password {
    static async toHash(password: string) {
        const salt = randomBytes(8).toString('hex');
        // const buf = (await scryptAsync(password, salt, 64)) as Buffer;
        return `${await hashPassword(password, salt)}.${salt}`;
    }

    static async compare(storedPassword: string, suppliedPassword: string) {
        // note that the storedPassword has the salt in it and on it
        const [hashedPassword, salt] = storedPassword.split('.');
        // const buf = (await scryptAsync(suppliedPassword, salt, 64)) as Buffer;
        return (await hashPassword(suppliedPassword, salt)) === hashedPassword;
    }
}
