import { randomBytes, scryptSync } from "crypto";

// password are hashed with scrypt and stored in the form `{salt}:{hash}`

// algorithm parameters
const SALT_LENGTH = 16;
const KEY_LENGTH = 64;

/**
 * Generate scrypt hash from salted password
 * @param password
 * @returns hashed password with salt in the form `{salt}:{hash}`
 */
export function generatePasswordHash(password: string): string {
  const salt = randomBytes(SALT_LENGTH).toString("hex");
  const hash = scryptSync(password, salt, KEY_LENGTH).toString("hex");
  return `${salt}:${hash}`;
}

/**
 * Check password against hash
 * @param password
 * @param passwordHash in the form `{salt}:{hash}`
 * @returns whether password is correct
 */
export function checkPasswordHash(
  password: string,
  passwordHash: string
): boolean {
  // parse salt and hash
  const [, salt, hash] = /^(\w+):(\w+)$/.exec(passwordHash) ?? [];
  if (!salt || !hash) {
    return false;
  }
  return hash === scryptSync(password, salt, KEY_LENGTH).toString("hex");
}
