import { genSalt, hash } from 'bcryptjs';

/* The StringUtils class provides a static method to hash a string using a salt. */
export class StringUtils {
  static async hashString(string: string): Promise<string> {
    return hash(string, await genSalt());
  }
}
