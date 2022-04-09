import { scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';

// very interesting -> read about later
const scryptAsync = promisify(scrypt);

export class Password {
  static async toHash(password: string) {
    const salt = randomBytes(8).toString('hex');
    // Interface Buffer is used to handle raw binary data
    const buffer = (await scryptAsync(password, salt, 64)) as Buffer;
    return `${buffer.toString('hex')}.${salt}`;
  }

  static async compare(storedPassword: string, suppliedPassword: string) {
    const [hasedpassword, salt] = storedPassword.split('.');
    // convert supplied to hash password
    const buffer = (await scryptAsync(suppliedPassword, salt, 64)) as Buffer;
    return buffer.toString('hex') === hasedpassword;
  }
}
